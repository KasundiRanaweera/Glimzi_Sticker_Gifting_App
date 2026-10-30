// Runs against the seeded dev database: `npm run db:seed` first.
import "../src/env.js";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, test } from "node:test";
import { createApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

let server: Server;
let base = "";

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://localhost:${(server.address() as AddressInfo).port}/api`;
});

after(async () => {
  server.close();
  await prisma.$disconnect();
});

const get = async (path: string) => {
  const res = await fetch(base + path);
  return { status: res.status, body: await res.json() };
};

test("gifts default to most popular first", async () => {
  const { status, body } = await get("/gifts");
  assert.equal(status, 200);
  assert.ok(body.length >= 4);
  assert.deepEqual(body.map((g: { rank: number }) => g.rank), [...body.map((g: { rank: number }) => g.rank)].sort((a, b) => a - b));
});

test("gifts filter by category", async () => {
  const { body } = await get("/gifts?category=food");
  assert.ok(body.length > 0);
  assert.ok(body.every((g: { category: { id: string } }) => g.category.id === "food"));
});

test("gift search ignores case", async () => {
  const { body } = await get("/gifts?q=RAMEN");
  assert.ok(body.some((g: { id: string }) => g.id === "noodle-nook"));
});

test("gifts sort by lowest amount", async () => {
  const { body } = await get("/gifts?sort=price");
  const firsts = body.map((g: { amounts: number[] }) => g.amounts[0]);
  assert.deepEqual(firsts, [...firsts].sort((a, b) => a - b));
});

test("bad sort is a 400 with a field message", async () => {
  const { status, body } = await get("/gifts?sort=random");
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.fields.sort);
});

test("gift detail lists three related shops, same category first", async () => {
  const { status, body } = await get("/gifts/morning-crane");
  assert.equal(status, 200);
  assert.equal(body.related.length, 3);
  assert.ok(!body.related.some((g: { id: string }) => g.id === "morning-crane"));
  assert.equal(body.related[0].category.id, body.category.id);
});

test("unknown gift is a 404", async () => {
  const { status, body } = await get("/gifts/nope");
  assert.equal(status, 404);
  assert.equal(body.error.code, "NOT_FOUND");
});

test("categories carry gift counts", async () => {
  const { body } = await get("/categories");
  const total = body.reduce((n: number, c: { count: number }) => n + c.count, 0);
  assert.equal(total, (await get("/gifts")).body.length);
});

test("faqs need a known group", async () => {
  assert.equal((await get("/faqs?group=home")).status, 200);
  assert.equal((await get("/faqs")).status, 400);
});
