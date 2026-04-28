import { connectDatabase } from "@/lib/prisma";

export async function registerNodeInstrumentation(): Promise<void> {
  try {
    await connectDatabase();
  } catch {
    // Connection failure is already logged in connectDatabase.
  }
}
