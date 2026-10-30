import { defineConfig } from "prisma/config";

// Prisma 7 does not read .env itself; Node's built-in loader does (a missing file is fine in production).
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
