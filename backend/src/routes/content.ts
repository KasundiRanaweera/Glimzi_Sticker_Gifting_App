import { Router } from "express";
import { z } from "zod";
import type { Category, Gift } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../middleware/errors.js";
import { parse } from "../middleware/validate.js";

export const content = Router();

type GiftRow = Gift & { category: Category };
type GiftDto = ReturnType<typeof toGift>;

const toGift = ({ categoryId, category, amounts, loved, ...g }: GiftRow) => ({
  ...g,
  amounts: amounts as number[],
  loved: loved as string[],
  category: { id: category.id, label: category.label },
});

const sorts: Record<"popular" | "name" | "price", (a: GiftDto, b: GiftDto) => number> = {
  popular: (a, b) => a.rank - b.rank,
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.amounts[0] - b.amounts[0] || a.rank - b.rank,
};

const giftQuery = z.object({
  category: z.string().max(40).optional(),
  q: z.string().trim().max(60).optional(),
  sort: z.enum(["popular", "name", "price"]).default("popular"),
});

content.get("/gifts", async (req, res) => {
  const { category, q, sort } = parse(giftQuery, req.query);
  const rows = await prisma.gift.findMany({
    where: {
      categoryId: category,
      ...(q && { OR: [{ name: { contains: q } }, { tagline: { contains: q } }, { about: { contains: q } }] }),
    },
    include: { category: true },
  });
  // shortcut: sorting in JS is fine for a catalogue of a few dozen shops; move to orderBy + a minAmount column if it grows.
  res.json(rows.map(toGift).sort(sorts[sort]));
});

content.get("/gifts/:id", async (req, res) => {
  const gift = await prisma.gift.findUnique({ where: { id: req.params.id }, include: { category: true } });
  if (!gift) throw new HttpError(404, "NOT_FOUND", "No gift card with that id.");
  const others = await prisma.gift.findMany({ where: { id: { not: gift.id } }, include: { category: true }, orderBy: { rank: "asc" } });
  // Same category first, then the most popular (sort is stable), so every page has three related shops.
  const same = (g: GiftRow) => Number(g.categoryId === gift.categoryId);
  const related = others.sort((a, b) => same(b) - same(a)).slice(0, 3).map(toGift);
  res.json({ ...toGift(gift), related });
});

content.get("/categories", async (_req, res) => {
  const rows = await prisma.category.findMany({ orderBy: { sort: "asc" }, include: { _count: { select: { gifts: true } } } });
  res.json(rows.map((c) => ({ id: c.id, label: c.label, count: c._count.gifts })));
});

content.get("/occasions", async (_req, res) => {
  const rows = await prisma.occasion.findMany({
    orderBy: { sort: "asc" },
    include: { gift: { select: { id: true, name: true, image: true } } },
  });
  res.json(rows.map(({ id, sort, giftId, ...o }) => o));
});

content.get("/plans", async (_req, res) => {
  const rows = await prisma.plan.findMany({ orderBy: { sort: "asc" } });
  res.json(rows.map(({ sort, features, ...p }) => ({ ...p, features: features as string[] })));
});

content.get("/help", async (_req, res) => {
  const rows = await prisma.helpTopic.findMany({
    orderBy: { sort: "asc" },
    include: { articles: { orderBy: { sort: "asc" }, select: { id: true, question: true, answer: true } } },
  });
  res.json(rows.map(({ sort, ...t }) => t));
});

const faqQuery = z.object({ group: z.enum(["home", "billing"]) });

content.get("/faqs", async (req, res) => {
  const { group } = parse(faqQuery, req.query);
  const rows = await prisma.faq.findMany({ where: { group }, orderBy: { sort: "asc" }, select: { id: true, question: true, answer: true } });
  res.json(rows);
});
