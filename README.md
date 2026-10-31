# Glimzi — Sticker Gifting App

Marketing website and API for **Glimzi**, a fictional app for sending greeting cards with stickers, gift cards from independent shops and small cash gifts.

> Portfolio project by Kasundi Ranaweera. Glimzi, its shops, people and prices are fictional.

| App | Stack | Folder |
| --- | --- | --- |
| Website | Next.js (App Router), TypeScript, Tailwind CSS v4, Radix UI | [`frontend/`](frontend) |
| API | Node.js, Express 5, TypeScript, Prisma 7 + SQLite (libSQL), Zod | [`backend/`](backend) |

See [PROJECT_BRIEF.md](PROJECT_BRIEF.md) for goals, the design system, API design and the 7-day plan.

## Getting started

Requirements: Node.js 22 or newer.

### Backend (http://localhost:4000)

```bash
cd backend
npm install            # also generates the Prisma client
cp .env.example .env
npm run db:migrate     # creates prisma/dev.db from the migrations
npm run db:seed        # fills it with the demo shops, plans, help and FAQs
npm run dev
```

Check it: http://localhost:4000/api/health

### Frontend (http://localhost:3000)

The site reads its content from the API, so start the backend first (also for `npm run build`).

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Folder | Command | What it does |
| --- | --- | --- |
| frontend | `npm run dev` | Dev server with hot reload |
| frontend | `npm run build` | Production build |
| frontend | `npm run lint` | ESLint |
| backend | `npm run dev` | API with auto-restart (tsx watch) |
| backend | `npm run build` | Generate the Prisma client and compile TypeScript to `dist/` |
| backend | `npm start` | Run the compiled API |
| backend | `npm run db:migrate` | Apply schema changes and create a migration |
| backend | `npm run db:seed` | Reset and reseed the demo content |
| backend | `npm test` | Endpoint tests (Node's built-in test runner, needs a seeded database) |

## API

| Method | Endpoint | What it returns |
| --- | --- | --- |
| GET | `/api/health` | Uptime check |
| GET | `/api/gifts?category=&q=&sort=` | Gift cards; filter by category, search, sort by `popular`, `name` or `price` |
| GET | `/api/gifts/:id` | One gift card with three related shops |
| GET | `/api/categories` | Categories with shop counts |
| GET | `/api/occasions` | Occasions for the hero switcher |
| GET | `/api/plans` | Pricing plans (prices in cents) |
| GET | `/api/help` | Help topics with their articles |
| GET | `/api/faqs?group=home\|billing` | FAQs for the home or pricing page |

Errors always use one shape:

```json
{ "error": { "code": "NOT_FOUND", "message": "No route for GET /api/nope" } }
```

## Progress

- [x] Day 1 — Setup, design tokens, fonts, header, mobile menu, footer, route stubs, 404, API skeleton
- [x] Day 2 — Art components, home hero with occasion switcher, marquee, bento mosaic, gift card detail routes
- [x] Day 3 — Prisma + SQLite, seeded content API with tests, card editor, gift card and Cash bands, steps, notes, FAQ, CTA
- [ ] Day 4 — Gift card catalogue, detail pages, basket
- [ ] Day 5 — Form API, Features, How it works, Pricing
- [ ] Day 6 — Help, About, Download, Legal, forms wired up, SEO
- [ ] Day 7 — Motion, accessibility, tests, deploy

## Credits

Visual system based on the "Sticker Gifting App Landing" design template (Skillry). Fonts: Bricolage Grotesque, Figtree and Caveat (Google Fonts).
