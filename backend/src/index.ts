import { createApp } from "./app.js";

// Node's built-in .env loader; a missing file is fine (production sets real env vars).
try {
  process.loadEnvFile();
} catch {}

const port = Number(process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`Glimzi API listening on http://localhost:${port}`);
});
