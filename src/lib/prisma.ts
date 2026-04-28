import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var prismaConnected: boolean | undefined;
  var prismaConnectPromise: Promise<void> | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });

const createPrismaClient = () =>
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export async function connectDatabase(): Promise<void> {
  if (globalThis.prismaConnected) {
    return;
  }

  if (!globalThis.prismaConnectPromise) {
    globalThis.prismaConnectPromise = prisma
      .$connect()
      .then(() => {
        globalThis.prismaConnected = true;
        console.info("[Database] connected to PostgreSQL");
      })
      .catch((error: unknown) => {
        globalThis.prismaConnectPromise = undefined;
        console.error("[Database] failed to connect to PostgreSQL", error);
        throw error;
      });
  }

  await globalThis.prismaConnectPromise;
}

export default prisma;
