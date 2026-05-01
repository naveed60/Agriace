import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // You may need to use `url` in the `datasource` block in a different way.
    // Below assumes Prisma 7.x
    provider: "postgresql", // Specify the provider
    url: env("STORAGE_DATABASE_URL"), // Make sure this matches the environment variable
  },
});