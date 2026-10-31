# Handover: where the project stands

Last updated: 31 October 2026. Read this first when picking the project up again; `README.md` has the day-to-day commands and the content-editing guide, and `docs/DEPLOY-VERCEL.md` has the deployment plan.

## What this is

A website for **Mount Carmel Matriculation Higher Secondary School, Muzhucode** (Kanyakumari district, Tamil Nadu). The school had no working website; its old domain `mountcarmelcmc.edu.in` does not load. The site was built from public sources (UDISE+ via icbse.com, schools.org.in, Google Maps, the school's Facebook page) and its page structure follows the Mount Carmel Residential School site (mountcarmel.edu.in) as a reference for how much a school site should cover.

## Status

| Area | State |
| --- | --- |
| Pages | About 40 routes built and prerendered as static HTML (see the Pages table in the README) |
| Design | Done: "Mount Carmel" hero set among layered hills (GSAP), Western Ghats palette, Young Serif + Figtree, Tamil name in Hind Madurai |
| Content | Verified facts in `src/content/school.ts`; everything else is draft copy marked on the page. `npm run drafts` lists 49 draft blocks |
| Tests | 70 unit tests (Vitest), 120 end-to-end tests (Playwright, desktop + mobile, 6 device-specific skips) all passing |
| Review | An independent code review was done and its findings fixed (hash links, gallery focus, reduced-motion timeline, menu scroll lock and focus, enquiry API hardening, draft markers) |
| Git | Repo initialised with only the create-next-app commit; all work is uncommitted |
| Deployment | Not deployed. Plan in `docs/DEPLOY-VERCEL.md` |

## Decisions made (and why)

- **Stack:** Next.js 16 App Router (Cache Components on), React 19, TypeScript, Tailwind CSS v4, Framer Motion for UI motion, GSAP (ScrollTrigger, SplitText) for scroll animation, Lenis for smooth scrolling. The client asked for Next/React/TS/Framer/GSAP; Tailwind and Lenis were added.
- **Draft copy, clearly marked:** chosen by the client. Anything not from a public source carries `draft: true` and shows a dashed "Draft" label. Three things were deliberately *not* invented: fee amounts (they're fixed by the Tamil Nadu fee committee, so the page says "Ask the office"), people's names (principal, staff), and photographs (placeholder illustrations instead).
- **Content in the repo:** chosen by the client over a CMS. TypeScript for prose, JSON for lists, Markdown for news. A CMS (Sanity or Decap) can be added later if school staff need to edit without a developer.
- **No affiliation claim:** the old domain hints that the CMC congregation runs the school, but this is unconfirmed, so it is only in the README's open questions, not on the site.
- **Fonts self-hosted** (`src/fonts/`, OFL) so builds never depend on Google Fonts.
- **Soft 404s on dynamic routes:** unknown `/academics/*`, `/campus/*`, `/news/*` URLs show the not-found page with `noindex` but a 200 status. Next.js 16 with Cache Components does not allow `dynamicParams = false`, and the status is fixed once streaming starts. A `proxy.ts` could return true 404s if that ever matters.
- **Privacy:** the transfer-certificate page is `noindex` because it would list students' names; draft news is `noindex` and left out of the sitemap.

## Open questions for the school

These block launch. Each one maps to a content file.

1. Official email address (only `mountcarmel.muzhucode@…` is visible publicly). Add to `school.ts` and show it on Contact.
2. Managing body or congregation, correspondent's name. Update `about.ts` (`management`).
3. Principal's name, photo and message. Update `about.ts` (`principalMessage`) and add the photo.
4. Crest, motto, school colours. Replace `src/components/art/Mark.tsx` and `src/app/icon.svg`.
5. Vision, mission, values. Update `about.ts`.
6. Class 11 subject groups, school hours, admission dates. Update `academics.ts` and the FAQs in `school.ts`.
7. Approved fee amounts per class and instalment dates. Update `src/content/data/fees.json`.
8. Bus routes and stops. Update `campus.ts` (`transport`).
9. Real photographs (campus, events, principal). Put them in `public/gallery/` and update `gallery.json`; delete the placeholder SVGs.
10. Staff list (optional), TC records (confirm they want names public at all), media coverage. Fill in the JSON files in `src/content/data/`.
11. Whether they still own `mountcarmelcmc.edu.in`, or which domain to use.

When an item is confirmed, replace the text and set `draft: false`. `npm run drafts` should eventually print "No draft content left."

## How to continue

```powershell
npm install
copy .env.example .env.local
npm run dev            # http://localhost:3000
npm run check          # lint, typecheck, unit tests, build, Playwright
npm run drafts         # what still needs the school's confirmation
```

Node 22.22+ or 24 is recommended. Next.js itself needs 20.9+, but Vitest and jsdom need 22.22+.

## Next steps, in order

1. **Commit the work:** `git add -A && git commit`, then push to a new GitHub repository.
2. **Deploy a preview to Vercel** following `docs/DEPLOY-VERCEL.md`, and share the preview link with the school. Preview deployments are not indexed by search engines.
3. **Collect answers** to the open questions above. The preview, with its Draft labels, is a good prompt for the school.
4. **Set up enquiry delivery** (Google Apps Script → Google Sheet + email), set `ENQUIRY_WEBHOOK_URL`, and test with a real submission.
5. **Replace drafts and placeholders** as answers arrive; run `npm run check` before each commit.
6. **Go live:** connect the domain, set `NEXT_PUBLIC_SITE_URL`, then submit `sitemap.xml` in Google Search Console and create or claim the Google Business Profile so the listing links to the site.

Later improvements to consider: a GitHub Actions CI workflow running `npm run check`; a CMS if school staff will post news themselves; a Tamil-language version of key pages; real 404s via `proxy.ts`; rate limiting for `/api/enquiry` with a Vercel WAF rule.

## Where things live

| Path | What |
| --- | --- |
| `src/content/school.ts` | Verified facts (UDISE+, recognition years, contact, facilities, FAQs) |
| `src/content/navigation.ts` | Menu tree; header, footer, section tabs and sitemap are built from it |
| `src/content/{about,academics,campus,student-life}.ts` | Draft prose |
| `src/content/data/*.json` | Fees, calendar, staff, gallery, TCs issued, media |
| `src/content/news/*.md` | News posts |
| `src/components/home/Hero.tsx` | The signature hero animation |
| `src/components/SiteHeader.tsx` | Desktop dropdowns and mobile menu |
| `src/lib/news.ts`, `src/lib/data.ts` | Content loaders and types |
| `src/app/api/enquiry/route.ts` | Admission enquiry endpoint (forwards to a webhook) |
| `scripts/list-drafts.mjs` | `npm run drafts` |
| `tests/unit`, `tests/e2e` | Vitest and Playwright suites |
