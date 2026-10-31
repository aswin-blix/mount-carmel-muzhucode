# Mount Carmel Matriculation Higher Secondary School, Muzhucode

Website for Mount Carmel Matric Hr. Sec. School, Muzhucode, Kanyakumari District, Tamil Nadu.

- **Picking this up later?** Start with [`docs/HANDOFF.md`](docs/HANDOFF.md): status, decisions, open questions and next steps.
- **Deploying?** See [`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md).

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) | Every page is prerendered static HTML; fast on rural mobile networks |
| Language | TypeScript, React 19 | |
| Styling | Tailwind CSS v4 + a few component classes in `globals.css` | Design tokens live in `:root` |
| Scroll animation | GSAP 3 (ScrollTrigger, SplitText) via `@gsap/react` | Hero reveal and parallax, pinned horizontal timeline |
| UI motion | Framer Motion | Mobile menu, FAQ accordion, nav indicator, form feedback, page fade |
| Smooth scroll | Lenis, driven by the GSAP ticker | Keeps ScrollTrigger in sync |
| Content | Markdown (gray-matter + marked) for news, typed JSON for lists | Editable without touching components |
| Tests | Vitest + Testing Library (unit), Playwright (end-to-end) | |

All motion is switched off for visitors with `prefers-reduced-motion`. Fonts (Young Serif, Figtree, Hind Madurai for Tamil) are self-hosted from `src/fonts/` under the SIL Open Font License, so builds do not need to reach Google Fonts.

## Run it

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm test              # unit tests
npm run build
npm run test:e2e      # needs a build; first run: npx playwright install chromium
npm run check         # all of the above in order
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and Open Graph. On Vercel it falls back to the project's production domain |
| `ENQUIRY_WEBHOOK_URL` | Where admission enquiries are POSTed as JSON. Without it the form tells parents to call the office |

## Pages

The structure follows what established school sites offer (modelled on the menu of mountcarmel.edu.in):

| Section | Pages |
| --- | --- |
| About | Our story, Vision and mission, Principal's message, Management, Our teachers, School information (UDISE+ facts) |
| Academics | Overview, one page per stage (Pre-primary, Primary, Upper primary, Secondary, Higher secondary), Curriculum and assessment, Academic calendar |
| Campus | All facilities, one page per facility (12), Transport |
| Student life | Clubs and activities, News and events (+ one page per article), Gallery |
| Admissions | How to apply (with enquiry form), Fee structure, Questions parents ask, Transfer certificates |
| Contact | Address, phone, map |

## Editing content

| What | Where | Format |
| --- | --- | --- |
| Verified facts (name, phone, address, recognition years, UDISE+ figures, facilities, FAQs) | `src/content/school.ts` | TypeScript |
| Menu structure | `src/content/navigation.ts` | TypeScript |
| About, academics, campus and student-life copy | `src/content/about.ts`, `academics.ts`, `campus.ts`, `student-life.ts` | TypeScript |
| News and events | `src/content/news/YYYY-MM-DD-title.md` | Markdown with front matter |
| Fees, calendar, staff list, gallery, TCs issued, media coverage | `src/content/data/*.json` | JSON |
| Gallery images | `public/gallery/` | JPG/PNG/WebP/SVG |

**Add a news post:** create `src/content/news/2027-01-26-republic-day.md`:

```md
---
title: Republic Day celebration
date: 2027-01-26
category: Events        # Admissions, Academics, Events, Sports, Achievements or Notices
summary: One sentence shown on the news cards.
---

The article in Markdown.
```

The URL becomes `/news/republic-day`. A post missing a title, date, category or summary fails the build with the file name in the error.

**Add photos:** put the image in `public/gallery/` and add an entry to `src/content/data/gallery.json` (`src`, `alt`, `title`, `caption`, `album`, `width`, `height`). Delete the placeholder entries and their SVGs once real photos exist. With more than one album, filter buttons appear automatically.

**Staff list, TCs issued, media coverage:** these lists are empty and their sections stay hidden (or show a "call the office" note) until entries are added to `staff.json`, `tc-issued.json` and `in-media.json`. The shapes are defined in `src/lib/data.ts`, and `npm run typecheck` fails if an entry has the wrong shape.

**Fees:** amounts in `fees.json` are `null`, which shows "Ask the office". Replace `null` with a string such as `"₹18,500"` once the fee committee's approved fees are confirmed.

## Draft content

Most text beyond the verified facts was written for the website and still needs the school's confirmation. Every such block has `draft: true`, which shows a dashed **Draft** label on the page. To publish a block, replace the text with the school's own and set `draft: false` (or remove the line in Markdown).

```bash
npm run drafts   # lists every draft block still waiting for confirmation, by file and line
```

Drafted so far: vision, mission, values, principal's message, management, how teaching is organised, all stage details, curriculum and assessment, every facility description, transport, student life (clubs, sports, events, houses), fee structure, academic calendar, the TC procedure, six of the FAQs, three news posts and nine placeholder gallery illustrations.

## Project layout

```
src/
  app/                 routes: / about academics campus admissions contact, api/enquiry,
                       sitemap, robots, opengraph-image, icon
  components/          page sections; art/ holds the hand-drawn SVG landscape and site mark
  content/             all site text and data (see "Editing content")
  lib/                 news + JSON loaders, enquiry validation, GSAP setup, fonts, formatting
scripts/list-drafts.mjs  `npm run drafts`
tests/unit             Vitest
tests/e2e              Playwright
```

## Where the facts came from

Gathered on 31 October 2026 from public listings, since the school had no working website (the old domain `mountcarmelcmc.edu.in` does not load):

- [icbse.com school profile](https://www.icbse.com/schools/mount-carmel-ma-s-muzhucode-ev5vzl) (UDISE+ data): founded 1994; recognised primary 1994, upper primary 2001, secondary 2002, higher secondary 2022; pre-primary to Class 12; State Board; English medium; co-educational private unaided minority school; 610 students; 30+ teachers; 39 classrooms in 3 blocks; library, playground, ICT lab (21 computers, 3 laptops, 3 projectors), integrated science lab, Atal Tinkering Lab, solar panels, rainwater harvesting, ramps, medical check-ups.
- [schools.org.in listing](https://schools.org.in/kanniyakumari/33300700814/mount-carmel-ma-s-muzhucode.html): UDISE+ code 33300700814.
- Google Maps listing: Tamil name, address (Muzhucode, Uthramcode, Tamil Nadu 629168, plus code 967F+6F3), phone 04651 287 977, coordinates.
- [Facebook page](https://www.facebook.com/p/Mount-Carmel-Matriculation-School-Muzhucode-100071048903818/).

## To confirm with the school before launch

No public source confirmed these. Where the site needs them, it shows marked draft text or asks parents to call the office:

- Official email address (listings show only `mountcarmel.muzhucode@…`)
- Managing body or congregation (the old domain suggests CMC, the Congregation of the Mother of Carmel)
- Official crest, motto and colours (the round hill-and-star mark in `components/art/Mark.tsx` is a placeholder)
- Principal's name, photograph and message (draft message in `about.ts`)
- Management details (draft in `about.ts`)
- Class 11 subject groups, admission dates, fee amounts, transport routes, school hours
- Staff names, transfer certificate records, media coverage
- Campus photographs (the gallery uses placeholder illustrations)
- The admission steps and document list are generic for Tamil Nadu matriculation schools — check them against the office's actual process

## Known behaviour

- Draft news posts appear on the site with a Draft label but carry `noindex`, are left out of `sitemap.xml` and get no NewsArticle structured data until `draft: true` is removed.
- The transfer-certificate page is `noindex` because the list holds students' names. Confirm with the school before publishing names at all; initials are an alternative.
- `/api/enquiry` accepts JSON only, from the site's own origin, up to 8 KB, with a honeypot field and an 8-second webhook timeout. Values starting with `=`, `+`, `-` or `@` are prefixed with `'` so spreadsheets don't run them as formulas. There is no rate limit in the app; add one at the host if spam appears.
- Set `NEXT_PUBLIC_SITE_URL` before `npm run build`. On Vercel the production domain is used automatically; elsewhere the build warns and canonical URLs point to localhost.

- Unknown stage, facility or news URLs (for example `/campus/pool`) show the not-found page with a `noindex` tag but an HTTP 200 status. Those routes stream from a prerendered shell, and Next.js cannot change the status code once streaming has started. Other unknown URLs return a true 404.
