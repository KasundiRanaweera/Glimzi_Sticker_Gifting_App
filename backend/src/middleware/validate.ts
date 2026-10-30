import type { ZodType } from "zod";
import { HttpError } from "./errors.js";

// Parse untrusted input or throw a 400 with one message per field, in the API's error shape.
export function parse<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const fields = Object.fromEntries(result.error.issues.map((i) => [i.path.join(".") || "_", i.message]));
  throw new HttpError(400, "VALIDATION_ERROR", "Some fields are not valid.", fields);
}
