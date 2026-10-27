# Glimzi — Sticker Gifting App

Marketing website and API for **Glimzi**, a fictional app for sending greeting cards with stickers, gift cards from independent shops and small cash gifts.

> Portfolio project by Kasundi Ranaweera. Glimzi, its shops, people and prices are fictional.

| App | Stack | Folder |
| --- | --- | --- |
| Website | Next.js (App Router), TypeScript, Tailwind CSS v4, Radix UI | [`frontend/`](frontend) |
| API | Node.js, Express 5, TypeScript | [`backend/`](backend) |

See [PROJECT_BRIEF.md](PROJECT_BRIEF.md) for goals, the design system, API design and the 7-day plan.

## Getting started

Requirements: Node.js 22 or newer.

### Backend (http://localhost:4000)

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Check it: http://localhost:4000/api/health

### Frontend (http://localhost:3000)

```bash
cd frontend
npm install
npm run dev
```

## Scripts

| Folder | Command | What it does |
| --- | --- | --- |
| frontend | `npm run dev` | Dev server with hot reload |
| frontend | `npm run build` | Production build |
| frontend | `npm run lint` | ESLint |
| backend | `npm run dev` | API with auto-restart (tsx watch) |
| backend | `npm run build` | Compile TypeScript to `dist/` |
| backend | `npm start` | Run the compiled API |

## API

| Method | Endpoint | Status |
| --- | --- | --- |
| GET | `/api/health` | Done |

Errors always use one shape:

```json
{ "error": { "code": "NOT_FOUND", "message": "No route for GET /api/nope" } }
```

## Progress

- [x] Day 1 — Setup, design tokens, fonts, header, mobile menu, footer, route stubs, 404, API skeleton
- [ ] Day 2 — Art components and the home hero
- [ ] Day 3 — Database, content API, home product bands
- [ ] Day 4 — Gift card catalogue, detail pages, basket
- [ ] Day 5 — Form API, Features, How it works, Pricing
- [ ] Day 6 — Help, About, Download, Legal, forms wired up, SEO
- [ ] Day 7 — Motion, accessibility, tests, deploy

## Credits

Visual system based on the "Sticker Gifting App Landing" design template (Skillry). Fonts: Bricolage Grotesque, Figtree and Caveat (Google Fonts).
