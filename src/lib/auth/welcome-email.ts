import { sendEmailWithResend } from "@/lib/email/resend";

function buildAppBaseUrl(request: Request): string {
  const configured = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

function buildWelcomeEmail(input: { fullName: string; signInLink: string }) {
  const subject = "Welcome to AgriAce Fertilizers";
  const text = [
    `Hello ${input.fullName},`,
    "",
    "Welcome to AgriAce Fertilizers. Your account has been created successfully.",
    `Sign in to your account: ${input.signInLink}`,
    "",
    "If you did not create this account, please contact our support team.",
  ].join("\n");

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
    <p>Hello ${input.fullName},</p>
    <p>Welcome to AgriAce Fertilizers. Your account has been created successfully.</p>
    <p>
      <a href="${input.signInLink}" style="display:inline-block;padding:12px 20px;border-radius:9999px;background:#2f5d31;color:#ffffff;text-decoration:none;font-weight:600">
        Sign In
      </a>
    </p>
    <p>If the button does not work, use this link:</p>
    <p><a href="${input.signInLink}">${input.signInLink}</a></p>
    <p>If you did not create this account, please contact our support team.</p>
  </div>
  `;

  return { subject, text, html };
}

export async function sendWelcomeEmailForUser(
  input: {
    userId: string;
    fullName: string;
    email: string;
  },
  request: Request
): Promise<void> {
  const baseUrl = buildAppBaseUrl(request);
  const signInLink = `${baseUrl}/get-started`;
  const message = buildWelcomeEmail({
    fullName: input.fullName,
    signInLink,
  });

  const sent = await sendEmailWithResend({
    to: input.email,
    subject: message.subject,
    text: message.text,
    html: message.html,
    tags: [
      { name: "type", value: "welcome_email" },
      { name: "user_id", value: input.userId },
    ],
  });

  if (!sent.id) {
    console.error("[Auth] welcome-email.failed", {
      userId: input.userId,
    });
    return;
  }

  console.info("[Auth] welcome-email.sent", {
    userId: input.userId,
    messageId: sent.id,
  });
}
