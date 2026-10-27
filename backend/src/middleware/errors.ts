import type { ErrorRequestHandler, RequestHandler } from "express";

// Every error leaves the API in one shape: { error: { code, message, fields? } }.
export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

export const notFound: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, "NOT_FOUND", `No route for ${req.method} ${req.path}`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message, fields: err.fields } });
    return;
  }
  // Malformed JSON bodies come from express.json() as a 400 with type entity.parse.failed.
  if (err?.type === "entity.parse.failed" || err?.type === "entity.too.large") {
    res.status(err.status ?? 400).json({ error: { code: "BAD_REQUEST", message: "Request body is not valid JSON or is too large." } });
    return;
  }
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "Something went wrong on our side." } });
};
