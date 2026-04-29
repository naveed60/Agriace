import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { sendWelcomeEmailForUser } from "@/lib/auth/welcome-email";

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { fullName, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    try {
      await sendWelcomeEmailForUser(
        {
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        req
      );
    } catch (error) {
      console.error("[Auth] welcome-email.send.unhandled", {
        userId: user.id,
        error,
      });
    }

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to register user", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
