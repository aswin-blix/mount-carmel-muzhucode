# Deploying to Vercel

The site is almost entirely static (every page is prerendered at build time); the only server code is the `/api/enquiry` route and the not-found fallback for unknown dynamic URLs. That makes it a light, cheap fit for Vercel.

## 0. Before you start

- **Plan:** Vercel's Hobby plan is free but limited to personal, non-commercial use. A website built for a client school is commercial use, so deploy it under a **Pro** team (Bits N Pixs), or under the school's own Vercel account if they will pay for hosting. Check the current [Hobby plan terms](https://vercel.com/docs/plans/hobby) and [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) before choosing.
- **Checks pass locally:** `npm run check`.
- **Node version:** set **22.x** (or 24.x) under Project Settings → Build and Deployment → Node.js Version. Next.js 16 needs 20.9 or newer; 22 matches what the tests use.

## 1. Put the code on GitHub

```powershell
git add -A
git commit -m "Mount Carmel Muzhucode website"
gh repo create bitsnpixs/mount-carmel-muzhucode --private --source . --push
```

The repository name and owner above are examples. `.env.local`, `.next/`, `node_modules/` and test output are already in `.gitignore`.

## 2. Create the Vercel project

1. Vercel dashboard → **Add New → Project** → import the GitHub repository.
2. Framework preset: **Next.js** (auto-detected). Leave the build command (`next build`), output and install command at their defaults.
3. Node.js version: **22.x**.
4. Environment variables (Settings → Environment Variables):

| Name | Production | Preview | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://<final domain>` | leave unset | Without it the site falls back to Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), so canonical links and the sitemap still point at production rather than localhost |
| `ENQUIRY_WEBHOOK_URL` | the Apps Script URL (step 4) | optional, a test sheet | Without it the enquiry form tells parents to phone the office |

Keep **"Automatically expose System Environment Variables"** switched on; `src/lib/site.ts` reads `VERCEL_PROJECT_PRODUCTION_URL`.

5. **Deploy.** Every push to `main` then deploys to production, and every other branch or pull request gets its own preview URL. Vercel does not let search engines index preview deployments.

## 3. Check the first deployment

- Open the home page, a stage page, a facility page, the gallery (open a photo), a news article and `/admissions#enquire`.
- `https://<domain>/sitemap.xml` and `/robots.txt` should show production URLs.
- Share a page link on WhatsApp to see the preview image (from `opengraph-image`).
- Run a Lighthouse check on mobile; most of the page is static HTML, so scores should be high.

## 4. Admission enquiries: Google Sheet + email

The form POSTs validated JSON to `ENQUIRY_WEBHOOK_URL`. A free option the school office can use without a developer is a Google Apps Script web app writing to a Google Sheet and sending an email:

1. Create a Google Sheet in the school's Google account with a tab named `Enquiries` and the header row: `Received, Parent, Phone, Child, Class, Message`.
2. Extensions → **Apps Script**, then paste:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Enquiries")
    .appendRow([d.receivedAt, d.parentName, d.phone, d.childName, d.classApplying, d.message]);
  MailApp.sendEmail(
    "OFFICE_EMAIL_HERE",
    "New admission enquiry: " + d.childName + " (" + d.classApplying + ")",
    d.parentName + " — " + d.phone + "\n\n" + (d.message || "(no message)"),
  );
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app**: execute as *Me*, access *Anyone*. Copy the `/exec` URL into `ENQUIRY_WEBHOOK_URL` on Vercel and redeploy.
4. Send a test enquiry from the live site and confirm both the row and the email arrive. The site already prefixes values starting with `=`, `+`, `-` or `@` so the sheet cannot run them as formulas.

The Apps Script URL is effectively a password. Keep it out of the repository, and replace the deployment if it leaks.

## 5. Domain

1. Confirm with the school which domain to use. They may still hold `mountcarmelcmc.edu.in`; `.edu.in` domains are registered through ERNET India and renewed by the institution.
2. Vercel → Project → **Settings → Domains** → add the domain, then create the DNS records Vercel shows (an A record for the apex, a CNAME for `www`). HTTPS certificates are issued automatically.
3. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` URL and redeploy.
4. Pick one canonical host (with or without `www`) and redirect the other in the Domains settings.

## 6. After launch

- **Google Search Console:** verify the domain and submit `https://<domain>/sitemap.xml`.
- **Google Business Profile:** claim the school's Maps listing (phone 04651 287 977, plus code 967F+6F3) and add the website link.
- **Analytics (optional):** enable Vercel Web Analytics in the dashboard, or add another privacy-friendly tool.
- **Spam:** if enquiry spam appears, add a Vercel WAF rate-limit rule for `/api/enquiry`. The endpoint already accepts only same-origin JSON up to 8 KB, with a honeypot field.
- **Updates:** school content changes are file edits followed by a push; Vercel redeploys within a minute or two. Run `npm run check` before pushing.

## Optional: CI on GitHub

Vercel only runs `next build`. To also run lint, type checks and tests on every pull request, add a GitHub Actions workflow that runs `npm ci`, `npx playwright install --with-deps chromium` and `npm run check` on Node 22.
