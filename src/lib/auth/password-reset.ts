import { createHash, randomBytes } from "node:crypto";

import prisma from "@/lib/prisma";
import { sendEmailWithResend } from "@/lib/email/resend";

const DEFAULT_TOKEN_TTL_MINUTES = 60;

function getResetTokenTtlMinutes(): number {
  const rawValue = process.env.PASSWORD_RESET_TOKEN_TTL_MINUTES;
  if (!rawValue) return DEFAULT_TOKEN_TTL_MINUTES;

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed < 5 || parsed > 1440) {
    return DEFAULT_TOKEN_TTL_MINUTES;
  }

  return Math.floor(parsed);
}

function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

function buildAppBaseUrl(request: Request): string {
  const configured = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

function buildPasswordResetEmail(input: {
  fullName: string;
  resetLink: string;
  expiresInMinutes: number;
}) {
  const subject = "Reset your AgriAce account password";
  const text = [
    `Hello ${input.fullName},`,
    "",
    "We received a request to reset your password.",
    `Use this link to set a new password: ${input.resetLink}`,
    "",
    `This link expires in ${input.expiresInMinutes} minutes and can be used only once.`,
    "If you did not request this, you can safely ignore this email.",
  ].join("\n");

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
    <p>Hello ${input.fullName},</p>
    <p>We received a request to reset your password.</p>
    <p>
      <a href="${input.resetLink}" style="display:inline-block;padding:12px 20px;border-radius:9999px;background:#2f5d31;color:#ffffff;text-decoration:none;font-weight:600">
        Reset Password
      </a>
    </p>
    <p>If the button does not work, use this link:</p>
    <p><a href="${input.resetLink}">${input.resetLink}</a></p>
    <p>This link expires in ${input.expiresInMinutes} minutes and can be used only once.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
  </div>
  `;

  return { subject, text, html };
}

function sanitizeEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  if (local.length < 3) return `***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function sendPasswordResetEmailForUser(email: string, request: Request): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, fullName: true, email: true, isActive: true, passwordHash: true },
  });

  if (!user || !user.isActive || !user.passwordHash) {
    console.info("[Auth] password-reset.request.accepted", {
      email: sanitizeEmail(normalizedEmail),
      reason: "USER_NOT_ELIGIBLE_OR_NOT_FOUND",
    });
    return;
  }

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresInMinutes = getResetTokenTtlMinutes();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  await prisma.passwordResetToken.deleteMany({
    where: { userId: user.id },
  });

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  const baseUrl = buildAppBaseUrl(request);
  const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(rawToken)}`;
  const message = buildPasswordResetEmail({
    fullName: user.fullName,
    resetLink,
    expiresInMinutes,
  });

  const sent = await sendEmailWithResend({
    to: user.email,
    subject: message.subject,
    text: message.text,
    html: message.html,
    tags: [
      { name: "type", value: "password_reset" },
      { name: "user_id", value: user.id },
    ],
  });

  if (!sent.id) {
    console.error("[Auth] password-reset.email.failed", {
      userId: user.id,
      email: sanitizeEmail(user.email),
    });
    return;
  }

  console.info("[Auth] password-reset.email.sent", {
    userId: user.id,
    email: sanitizeEmail(user.email),
    messageId: sent.id,
    expiresAt: expiresAt.toISOString(),
  });
}

export async function resetPasswordUsingToken(input: {
  token: string;
  passwordHash: string;
}): Promise<"success" | "invalid_or_expired"> {
  const tokenHash = hashToken(input.token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
      usedAt: true,
    },
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt <= new Date()) {
    return "invalid_or_expired";
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: input.passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
    prisma.passwordResetToken.deleteMany({
      where: {
        userId: resetToken.userId,
        id: { not: resetToken.id },
      },
    }),
  ]);

  console.info("[Auth] password-reset.completed", {
    userId: resetToken.userId,
    tokenId: resetToken.id,
  });

  return "success";
}
