import { cacheLife } from "next/cache";

// Public because Day 6 forms post to the API from the browser too.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Response shapes of the Glimzi API (backend/src/routes/content.ts).
export type Category = { id: string; label: string; count: number };

export type Gift = {
  id: string;
  name: string;
  short: string;
  image: string;
  alt: string;
  amounts: number[];
  tagline: string;
  location: string;
  about: string;
  loved: string[];
  rank: number;
  category: { id: string; label: string };
};

export type GiftDetail = Gift & { related: Gift[] };

export type Occasion = {
  label: string;
  recipient: string;
  schedule: string;
  image: string | null;
  title: string;
  message: string;
  amount: number;
  gift: { id: string; name: string; image: string };
};

export type Faq = { id: number; question: string; answer: string };

// Content changes rarely, so pages are prerendered and refreshed at most hourly.
async function get<T>(path: string): Promise<T> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${API_URL}/api${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const getGifts = () => get<Gift[]>("/gifts");
export const getCategories = () => get<Category[]>("/categories");
export const getOccasions = () => get<Occasion[]>("/occasions");
export const getFaqs = (group: "home" | "billing") => get<Faq[]>(`/faqs?group=${group}`);

export async function getGift(id: string): Promise<GiftDetail | null> {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${API_URL}/api/gifts/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /gifts/${id} failed with ${res.status}`);
  return res.json();
}
