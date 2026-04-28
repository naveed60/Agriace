import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { UserRole } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.AUTH_URL;
}

if (!process.env.NEXTAUTH_SECRET && process.env.AUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
}

const isUserRole = (value: unknown): value is (typeof UserRole)[keyof typeof UserRole] => {
  return (
    typeof value === "string" &&
    Object.values(UserRole).includes(value as (typeof UserRole)[keyof typeof UserRole])
  );
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const normalizedEmail = credentials.email.trim().toLowerCase();

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user || !user.passwordHash) return null;
        if (!user.isActive) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = ("role" in user ? user.role : undefined) ?? UserRole.CUSTOMER;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? token.sub ?? "";
        session.user.role = isUserRole(token.role) ? token.role : UserRole.CUSTOMER;
      }
      return session;
    },
  },
  pages: {
    signIn: "/get-started",
  },
};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  authOptions.providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export default NextAuth(authOptions);
