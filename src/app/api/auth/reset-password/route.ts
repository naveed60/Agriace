import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { resetPasswordUsingToken } from "@/lib/auth/password-reset";

const resetPasswordSchema = z.object({
  token: z.string().trim().min(1),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const status = await resetPasswordUsingToken({
      token: parsed.data.token,
      passwordHash,
    });

    if (status !== "success") {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Password reset successfully. You can now sign in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Auth] password-reset.submit.failed", { error });
    return NextResponse.json({ error: "Unable to reset password" }, { status: 500 });
  }
}
