<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Status, decisions, open questions and next steps: `docs/HANDOFF.md`. Deployment: `docs/DEPLOY-VERCEL.md`. Keep both current when things change.

- Verified facts live in `src/content/school.ts`; drafted copy lives in the other `src/content/*` files, JSON lists in `src/content/data/`, news in `src/content/news/*.md`. Anything not from a public source or the school must carry `draft: true` so the page shows a Draft marker; `npm run drafts` lists them.
- Navigation (header, footer, section tabs, sitemap) is generated from `src/content/navigation.ts`; add new pages there.
- Dynamic routes (`/academics/[stage]`, `/campus/[facility]`, `/news/[slug]`) use `generateStaticParams`; `dynamicParams` is not allowed with Cache Components, so unknown slugs call `notFound()` (soft 404, see README).
- Pages are fully static (Cache Components). Avoid request-time values such as `new Date()` in render paths.
- GSAP plugins are registered once in `src/lib/gsap.ts`; wrap scroll animations in `gsap.matchMedia()` with `FULL_MOTION` so reduced-motion visitors get static content.
- Custom CSS classes go inside `@layer components` in `globals.css`, otherwise they override Tailwind utilities.
- Fonts are self-hosted in `src/fonts/` (OFL); the build must not depend on Google Fonts.
- Before committing: `npm run check` (lint, typecheck, unit tests, build, Playwright).
