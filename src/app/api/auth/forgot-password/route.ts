import { NextResponse } from "next/server";
import { z } from "zod";

import { sendPasswordResetEmailForUser } from "@/lib/auth/password-reset";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
});

const GENERIC_RESPONSE = {
  message: "If an account exists for this email, a password reset link has been sent.",
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    await sendPasswordResetEmailForUser(parsed.data.email, request);
    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (error) {
    console.error("[Auth] password-reset.request.failed", { error });
    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  }
}
