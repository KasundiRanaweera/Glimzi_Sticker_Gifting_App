import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/errors.js";
import { content } from "./routes/content.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: Math.round(process.uptime()) });
  });

  app.use("/api", content);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
