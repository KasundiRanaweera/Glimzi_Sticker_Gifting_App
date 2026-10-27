# Project Brief — Glimzi (Sticker Gifting App: Landing Site + API)

> Repository: https://github.com/KasundiRanaweera/Glimzi_Sticker_Gifting_App
> Author: Kasundi Ranaweera

## 1. Overview

Glimzi is a fictional consumer app for sending digital greeting cards decorated with stickers, small gift cards from local shops, and cash gifts. This project is **Glimzi's multi-page marketing website and the API behind it**, built as two separate apps:

- **frontend/** — a Next.js site that convinces people to download the app
- **backend/** — an Express + TypeScript REST API that serves the site's content (gift cards, plans, help articles, FAQs) and stores form submissions

It is a portfolio piece that shows:

- Turning a detailed design system into a faithful, production-quality UI
- A typed, component-based Next.js App Router frontend
- A clean, validated REST API with a database, seed data and tests
- Real interactivity (filters, search, sort, basket, card editor, pricing toggle, validated forms)
- Accessibility, responsive layout from 390 px to 1440 px, and a considered motion system

## 2. Goals and success criteria

| Goal | How we know it is done |
| --- | --- |
| Faithful visual system | Tokens, type scale, bands, stickers match the style guide; no purple/violet/indigo; hero headline never above 96 px / 600 |
| Every link works | Each nav item, card, CTA and footer link reaches a populated page or section; designed 404 |
| Real interactions | Filters change results with empty state; sort reorders; basket add/remove/qty/total/empty; forms validate inline |
| Working API | Content endpoints return seeded data; form endpoints validate input, store it, and return clear errors |
| Honest forms | Forms save to the database and say so; they never claim an email or SMS was sent |
| Accessible | Keyboard-only walkthrough passes; focus visible; Esc closes sheets; `prefers-reduced-motion` respected; Lighthouse a11y ≥ 95 |
| Responsive | No horizontal overflow at 1440 / 1024 / 768 / 390 px |
| Ships clean | Frontend `lint` + `build` pass; backend `build` + `test` pass; both deployed and linked in README |

Out of scope: real payments, user accounts, sending email or SMS, an admin dashboard. The basket lives in the browser.

## 3. Audience

- **Site visitors:** people aged 20–45 who want to send a thoughtful but low-effort gift (birthdays, thank-yous, housewarmings).
- **Portfolio reviewers:** recruiters and engineers looking at code quality, API design, UI fidelity and attention to detail.

## 4. Tech stack

### Frontend (`frontend/`)

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | Real routes, static generation, industry standard |
| Styling | Global CSS design tokens + Tailwind CSS v4 | Tokens keep the visual system exact; Tailwind powers the UI kit |
| UI controls | ReUI / shadcn (Radix-based) | Accessible buttons, toggle groups, tabs, accordion, select, sheet |
| Fonts | Bricolage Grotesque, Figtree, Caveat via `next/font/google` | Display / body / handwritten roles |
| Images | Local WebP files via `next/image` | Fixed sizes, lazy loading, no hotlinks |
| Motion | CSS transitions + IntersectionObserver reveal | Light, respects reduced motion |
| State | React state + one basket context | No extra libraries needed |
| Hosting | Vercel | Free preview URL |

### Backend (`backend/`)

| Layer | Choice | Why |
| --- | --- | --- |
| Runtime | Node.js + Express + TypeScript | Same language as the frontend, simple REST |
| Database | SQLite via Prisma ORM | Zero setup locally; Prisma can switch to Postgres for production with a one-line change |
| Validation | Zod | One schema validates requests and types them |
| Security | `helmet`, CORS limited to the frontend origin, basic rate limit on form endpoints | Sensible defaults for a public API |
| Tests | Vitest + Supertest | Endpoint tests in CI style |
| Hosting | Render (free web service) | Simple Node deploys |

## 5. API design

Base URL: `/api`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Uptime check |
| GET | `/gifts?category=&q=&sort=` | Gift card catalogue with filter, search, sort |
| GET | `/gifts/:id` | One gift card with related items |
| GET | `/categories` | Categories with item counts |
| GET | `/occasions` | Occasion list for the hero switcher and marquee |
| GET | `/plans` | Pricing plans (monthly and yearly prices) |
| GET | `/help` | Help topics with articles |
| GET | `/faqs` | Home and billing FAQs |
| POST | `/contact` | Help center contact form |
| POST | `/shop-suggestions` | "Suggest a shop" form |
| POST | `/newsletter` | Newsletter sign-up (unique email) |
| POST | `/download-link` | "Text me a link" request (stored only; no SMS is sent) |

Errors use one shape: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "Enter a valid email" } } }`.

**Database tables:** `Gift`, `Category`, `Occasion`, `Plan`, `HelpTopic`, `HelpArticle`, `Faq`, `ContactMessage`, `ShopSuggestion`, `NewsletterSubscriber`, `DownloadLinkRequest`.

## 6. Design system (summary)

- **Colours:** cream `#f6eedf` background, ink `#15130f` text, coral `#ff6a4d` and sun `#ffc83a` accents, sage as the only supporting colour. Text on coral or sun is always ink.
- **Type:** Bricolage Grotesque for display (hero 96 px / 600 max), Figtree for body at 17 px, Caveat only for handwritten notes and card messages.
- **Signature elements:** split phone hero on a butter band, occasions marquee, five-tile bento mosaic, three full-bleed product bands (coral card editor, sun gift cards, ink Cash), die-cut SVG stickers, gift card objects, thank-you notes wall, ink footer with a giant wordmark.
- **Radius:** pills for buttons and chips, 28 px cards, 40 px bands. Warm brown shadows, never pure black.

## 7. Site map

| Route | Page | Contents | Data from API |
| --- | --- | --- | --- |
| `/` | Home | Hero, marquee, bento, 3 product bands, how-it-works summary, notes wall, FAQ, CTA | occasions, gifts, faqs |
| `/features` | Features | Every capability with a working mini UI | — |
| `/how-it-works` | How it works | Step tabs, both sides of a gift, timeline | — |
| `/gift-cards` | Gift cards | Search, category chips with counts, sort, empty state, suggest-a-shop form | gifts, categories, POST shop-suggestions |
| `/gift-cards/[id]` | Gift card detail | Artwork, amounts, delivery timing, add to basket, specs, 3 related, back link | gifts/:id |
| `/pricing` | Pricing | Monthly/yearly toggle, 3 plans, comparison table, billing FAQ | plans, faqs |
| `/help` | Help center | Search, 4 topics, 12+ answers, contact form | help, POST contact |
| `/about` | About | Story, values, milestones, open roles, press contact | — |
| `/download` | Download | Store buttons, text-me-a-link form, QR code, requirements, what's new | POST download-link |
| `/legal` | Terms & privacy | Plain-language summary, table of contents, sections | — |
| `*` | 404 | Designed not-found page with recovery links | — |

The footer newsletter form posts to `/api/newsletter`.

## 8. Folder structure

```
Sticker Gifting App Landing/      ← git repo root
├─ frontend/
│  ├─ app/
│  │  ├─ layout.tsx               # fonts, metadata, header/footer, basket provider
│  │  ├─ page.tsx                 # home
│  │  ├─ globals.css              # tokens + template CSS
│  │  ├─ not-found.tsx
│  │  ├─ features/ how-it-works/ pricing/ help/ about/ download/ legal/
│  │  └─ gift-cards/page.tsx, gift-cards/[id]/page.tsx
│  ├─ components/
│  │  ├─ ui/                      # ReUI / shadcn controls
│  │  ├─ layout/                  # Header, MobileMenu, Footer
│  │  ├─ art/                     # Sticker, Phone, GiftCard, GreetingCard
│  │  ├─ home/                    # Hero, Marquee, Bento, bands, Notes, Faq, Cta
│  │  └─ shop/                    # Catalogue, Basket, AmountPicker
│  ├─ lib/                        # site.ts (brand config), api.ts (typed fetch), basket-context.tsx, utils.ts
│  ├─ public/images/
│  └─ .env.local.example          # NEXT_PUBLIC_API_URL
├─ backend/
│  ├─ src/
│  │  ├─ index.ts                 # starts the server
│  │  ├─ app.ts                   # express app, middleware, routes
│  │  ├─ routes/                  # gifts.ts, content.ts, forms.ts
│  │  ├─ schemas/                 # zod request schemas
│  │  ├─ middleware/              # error handler, rate limit
│  │  └─ lib/prisma.ts
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.ts                  # gifts, categories, plans, help, faqs
│  ├─ tests/                      # supertest endpoint tests
│  └─ .env.example                # DATABASE_URL, PORT, FRONTEND_ORIGIN
├─ PROJECT_BRIEF.md
└─ README.md                      # overview, setup for both apps, screenshots, live links
```

## 9. Content notes (all fictional, flagged in the README)

- The brand, shop names, people, prices, cities and domain are drafted placeholders, not real businesses.
- The `photo-team`, `photo-group` and `photo-open` images are generated stand-ins, not real people.
- The gift card artworks (coffee, florist, arcade, books, bakery, ramen, plants, cinema) are reused as category art for **new** fictional shops.

## 10. Seven-day plan

Each day ends with both apps running and a few small commits in your name.

### Day 1: Setup and layout shell
- Frontend: Next.js + TypeScript + Tailwind + ReUI/shadcn (Radix), design tokens, fonts, images, `lib/site.ts`
- Frontend: Header with nav, mobile menu sheet, ink footer with giant wordmark, a stub for every route, 404 page
- Backend: Express + TypeScript skeleton, `helmet`, CORS, error handler, `GET /api/health`
- Root README and `.env.example` files

### Day 2: Art components and the hero
- Sticker SVG sprite + `<Sticker>`, `<Phone>`, `<GiftCard>`, `<GreetingCard>`
- Home hero exactly to the anatomy (kicker, 2-line headline, CTA pair, note, phone, 2 gift cards, occasion switcher)
- Occasions marquee; five-tile bento mosaic with mini UIs

### Day 3: Database, content API and the home bands
- Backend: Prisma schema, migration, seed data, content endpoints (gifts, categories, occasions, plans, help, faqs)
- Frontend: typed `lib/api.ts`; coral card editor band; sun gift cards band (from the API); ink Cash band
- Home: how-it-works summary, thank-you notes wall, FAQ (from the API), CTA panel

### Day 4: Gift card catalogue, detail pages and basket
- `/gift-cards`: search, category chips with counts, sort, empty state
- `/gift-cards/[id]` with `generateStaticParams` from the API: amounts, delivery, specs, related
- Basket context + Sheet drawer: add/remove/quantity/total/empty state; toasts

### Day 5: Form API, Features, How it works, Pricing
- Backend: form endpoints with Zod validation, rate limiting, consistent error shape
- Frontend: Features page with mini UIs; How it works step tabs and timeline
- Pricing: billing toggle, plans from the API, comparison table, billing FAQ

### Day 6: Help, About, Download, Legal, forms wired up, SEO
- Help: search with empty state, topics, accordion answers, contact form → API with inline errors
- Suggest-a-shop, newsletter and text-me-a-link forms → API
- About, Download, Legal pages; per-page metadata, Open Graph, favicon

### Day 7: Polish, tests, deploy, portfolio
- Motion system and reduced motion; keyboard and screen reader pass; responsive review at 1440/1024/768/390
- Backend endpoint tests (Vitest + Supertest); Lighthouse fixes
- Deploy the backend to Render and the frontend to Vercel; README with screenshots and live links; portfolio write-up

## 11. Git workflow

You run every git command, so every commit is yours. The assistant never commits or pushes.

### One-time setup (already partly done)

The repo root is the main project folder. `git init` is done and the branch is `main`. Check your identity, then connect GitHub:

```bash
git config user.name    # Kasundi Ranaweera
git config user.email   # kasundiranaweera@gmail.com
git remote add origin https://github.com/KasundiRanaweera/Glimzi_Sticker_Gifting_App.git
```

If you created the GitHub repo with a README or license, pull it in once before your first push:

```bash
git pull origin main --allow-unrelated-histories
```

### Daily routine (one branch per day, merged by pull request)

```bash
git switch main
git pull                                 # start from the latest main
git switch -c day-N/short-name           # e.g. day-2/hero-and-art
git status                               # see what changed
git add <files or folders>               # stage one logical change
git commit -m "type(scope): message"
# repeat for each logical change
git push -u origin day-N/short-name      # first push of the branch; afterwards just: git push
```

Then on GitHub: **Compare & pull request** → title `Day N: <summary>` → describe what changed → **Merge pull request** → **Delete branch**. Back locally:

```bash
git switch main
git pull
git branch -d day-N/short-name
```

| Day | Branch |
| --- | --- |
| 1 | `day-1/setup-and-layout` |
| 2 | `day-2/hero-and-art` |
| 3 | `day-3/content-api-and-bands` |
| 4 | `day-4/catalogue-and-basket` |
| 5 | `day-5/forms-api-and-pages` |
| 6 | `day-6/content-pages-and-seo` |
| 7 | `day-7/polish-tests-deploy` |

Types: `feat`, `style`, `fix`, `refactor`, `test`, `docs`, `chore`. Scopes: `frontend`, `backend`, or none for repo-wide changes.

### Planned commits

| Day | Commits |
| --- | --- |
| 1 | `docs: add project brief` · `chore(frontend): scaffold Next.js app with TypeScript and Tailwind` · `chore(frontend): set up shadcn with Radix` · `style(frontend): add design tokens, fonts and base styles` · `feat(frontend): add header, mobile menu and footer` · `feat(frontend): add route stubs and 404 page` · `chore(backend): scaffold Express API with TypeScript` · `docs: add README with setup steps` |
| 2 | `feat(frontend): add sticker sprite and sticker component` · `feat(frontend): add phone, gift card and greeting card components` · `feat(frontend): build home hero` · `feat(frontend): add occasions marquee and bento mosaic` |
| 3 | `feat(backend): add Prisma schema and seed data` · `feat(backend): add content endpoints` · `feat(frontend): add typed API client` · `feat(frontend): add coral, sun and ink product bands` · `feat(frontend): add steps, notes wall, FAQ and CTA to home` |
| 4 | `feat(frontend): add gift card catalogue with search, filters and sort` · `feat(frontend): add gift card detail pages` · `feat(frontend): add basket drawer and toast` |
| 5 | `feat(backend): add validated form endpoints with rate limiting` · `feat(frontend): add features page` · `feat(frontend): add how it works page` · `feat(frontend): add pricing page with billing toggle` |
| 6 | `feat(frontend): add help center with search and contact form` · `feat(frontend): connect forms to API` · `feat(frontend): add about, download and legal pages` · `chore(frontend): add metadata and Open Graph tags` |
| 7 | `style(frontend): add motion system and reduced motion support` · `test(backend): add endpoint tests` · `fix(frontend): accessibility and responsive fixes` · `docs: add screenshots and live links to README` |

## 12. Portfolio presentation

- **Title:** Glimzi — sticker gifting app: marketing site and API
- **One-liner:** An 11-page Next.js marketing site with a hand-crafted sticker design system, backed by a validated Express + Prisma API for the catalogue, content and forms.
- **Show:** live Vercel link, GitHub repo, 3 screenshots (desktop hero, catalogue, mobile), a short GIF of the card editor, the API endpoint table.
- **Talk about:** design-token architecture; frontend/backend separation; Zod validation shared as types; API data driving statically generated detail pages; accessibility decisions (focus traps, reduced motion); and what you would add next (accounts, real checkout, an admin panel).
