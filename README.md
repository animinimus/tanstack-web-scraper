# Recall

**Recall** is a personal web content library. Sign in, import pages by URL, and Firecrawl scrapes each link into markdown with metadata stored in PostgreSQL. Browse saved items in a dashboard with search and status filters.

Built with TanStack Start (full-stack React), Prisma, better-auth, and the Firecrawl API.

## Features

- **Email and password auth** — Sign up and sign in via [better-auth](https://www.better-auth.com/) with sessions persisted in PostgreSQL (`/login`, `/signup`).
- **Single URL import** — Paste a URL; the app creates a `SavedItem`, scrapes via Firecrawl, and stores title, markdown content, author, publish date, and Open Graph image.
- **Bulk import** — Map a site (with optional search) to discover links, select URLs, and scrape them in batch (up to 25 links per map request).
- **Saved library** — List items at `/dashboard/items` with text search, status filter (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`), and copy-to-clipboard for URLs.
- **Dashboard shell** — Sidebar navigation (Items, Import, Discover placeholder), theme toggle (light/dark), and route protection for `/dashboard/*`.

Schema fields for AI-generated `summary` and `tags` exist on `SavedItem`, but the current scrape flow does not populate them.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (file-based routes) |
| UI | React 19, Tailwind CSS 4, shadcn/ui-style components |
| Auth | [better-auth](https://www.better-auth.com/) (Prisma adapter, TanStack Start cookies) |
| Database | PostgreSQL via [Prisma](https://www.prisma.io/) 7 (`@prisma/adapter-pg`) |
| Scraping | [@mendable/firecrawl-js](https://github.com/mendableai/firecrawl) |
| Validation | Zod |
| Server | Nitro (Vite plugin) |

## Architecture

```
Browser (React)
    │
    ├─ File routes (src/routes) — pages + layouts
    ├─ Server functions (src/data) — auth-gated Prisma + Firecrawl calls
    └─ /api/auth/* — better-auth handler

Request middleware (src/start.ts, src/middleware/auth.ts)
    └─ Redirects unauthenticated users away from /dashboard/*

PostgreSQL
    ├─ better-auth tables (User, Session, Account, Verification)
    └─ SavedItem — per-user scraped content and status
```

**Key paths**

- `src/lib/auth.ts` — better-auth server config
- `src/data/items.ts` — `scrapeUrlFn`, `mapUrlFn`, `bulkScrapeUrlsFn`, `getItemsFn`
- `src/lib/firecrawl.ts` — Firecrawl client
- `prisma/schema.prisma` — data models

## Local setup

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- PostgreSQL database
- [Firecrawl](https://www.firecrawl.dev/) API key

### Install

```bash
pnpm install
```

### Environment

Copy the example file and fill in values:

```bash
cp .env.example .env.local
```

Database scripts load `.env.local` via `dotenv-cli`. See `.env.example` for every variable the app reads.

### Database

Generate the Prisma client and sync the schema:

```bash
pnpm db:generate
pnpm db:push
```

Optional: open Prisma Studio with `pnpm db:studio`.

### Run

Development (port 3000):

```bash
pnpm dev
```

Production build and preview:

```bash
pnpm build
pnpm preview
```

### Other scripts

```bash
pnpm lint      # ESLint
pnpm format    # Prettier (check)
pnpm check     # Prettier write + ESLint fix
```

There is no application test suite in the repository yet (`pnpm test` runs Vitest but no tests are defined).

## Roadmap and limitations

- **`/dashboard/discover`** — Placeholder route only; not implemented.
- **Summaries and tags** — Prisma fields exist; scraping does not fill them yet.
- **Bulk scrape** — Runs sequentially; no job queue or progress UI beyond item status.
- **Email verification** — Disabled in better-auth config.
- **Auth client `baseURL`** — Hard-coded to `http://localhost:3000` in `src/lib/auth-client.ts`; adjust for non-local deployments.

## License

See repository defaults; application code is a personal portfolio project.