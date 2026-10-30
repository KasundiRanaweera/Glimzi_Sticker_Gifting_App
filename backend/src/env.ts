// Imported first by index.ts: ES modules evaluate imports in order, so .env is loaded before anything reads it.
// A missing file is fine (production sets real env vars).
try {
  process.loadEnvFile();
} catch {}
