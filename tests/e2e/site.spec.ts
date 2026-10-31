import { expect, test, type Page } from "@playwright/test";
import { allStaticRoutes } from "../../src/content/navigation";
import { getAllNews } from "../../src/lib/news";

const routes = [...allStaticRoutes(), "/news", ...getAllNews().map((p) => `/news/${p.slug}`)];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // The map iframe may be blocked in offline/sandboxed runs; ignore third-party noise.
    if (m.type() === "error" && !/google|maps|ERR_/.test(m.text())) errors.push(m.text());
  });
  return errors;
}

const headings: Record<string, RegExp> = {
  "/": /Mount\s*Carmel/,
  "/about": /village school that grew/,
  "/academics": /Fourteen years of learning/,
  "/campus": /campus built for making/,
  "/admissions": /Joining Mount Carmel/,
  "/contact": /Find us in Muzhucode/,
  "/academics/secondary": /Secondary/,
  "/campus/atal": /Atal Tinkering Lab/,
  "/admissions/fees": /Fee structure/,
};

test.describe("every page", () => {
  test.describe.configure({ mode: "parallel" });
  for (const path of [...new Set(routes)]) {
    test(`${path} renders one h1, the phone link and no console errors`, async ({ page }) => {
      const errors = trackErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      if (headings[path]) await expect(page.getByRole("heading", { level: 1 })).toHaveText(headings[path]);
      await expect(page.locator('a[href="tel:+914651287977"]').first()).toBeAttached();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "page should not scroll sideways").toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }
});

test("internal links on every page resolve", async ({ page, request, isMobile }) => {
  test.skip(isMobile, "links are the same on mobile");
  test.setTimeout(120_000);
  const found = new Set<string>();
  for (const path of new Set(routes)) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!));
    for (const h of hrefs) found.add(h.split("#")[0] || "/");
  }
  const broken: string[] = [];
  for (const href of found) {
    const res = await request.get(href);
    if (res.status() !== 200) broken.push(`${href} -> ${res.status()}`);
  }
  expect(broken).toEqual([]);
  expect(found.size).toBeGreaterThan(30);
});

test("unknown routes return 404 with the not-found page", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/isn.t here/);
});

test("unknown stage, facility and news slugs show the not-found page and are not indexed", async ({ page }) => {
  // These routes stream from a prerendered shell, so Next.js keeps the 200 status but
  // renders the not-found UI and adds a noindex robots tag.
  for (const path of ["/campus/no-such-facility", "/academics/no-such-stage", "/news/no-such-post"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 }), path).toHaveText(/isn.t here/);
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first(), path).toBeAttached();
  }
});

test("desktop dropdowns open on click and hover, close with Escape, and navigate", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const about = nav.getByRole("button", { name: "About" });
  await about.click();
  await expect(about).toHaveAttribute("aria-expanded", "true");
  await expect(nav.getByRole("link", { name: /Vision and mission/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(about).toHaveAttribute("aria-expanded", "false");
  await expect(about).toBeFocused();
  // Keyboard toggles open and closed.
  await page.keyboard.press("Enter");
  await expect(about).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Enter");
  await expect(about).toHaveAttribute("aria-expanded", "false");
  // A mouse click after hovering keeps the menu open.
  await nav.getByRole("button", { name: "Campus" }).hover();
  await page.waitForTimeout(300);
  await nav.getByRole("button", { name: "Campus" }).click();
  await expect(nav.getByRole("button", { name: "Campus" })).toHaveAttribute("aria-expanded", "true");
  await page.mouse.move(700, 600);
  await expect(nav.getByRole("button", { name: "Campus" })).toHaveAttribute("aria-expanded", "false");

  await nav.getByRole("button", { name: "Academics" }).hover();
  await nav.getByRole("link", { name: /Higher secondary/ }).click();
  await expect(page).toHaveURL(/\/academics\/higher-secondary$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Higher secondary/);

  await nav.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("section navigation marks the current page", async ({ page }) => {
  await page.goto("/about/management");
  const section = page.getByRole("navigation", { name: "About pages" });
  await expect(section.getByRole("link", { name: "Management" })).toHaveAttribute("aria-current", "page");
  await section.getByRole("link", { name: "Our teachers" }).click();
  await expect(page).toHaveURL(/\/about\/staff$/);
});

test("mobile menu opens, expands a section, closes with Escape and after navigating", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  // The panel must cover the screen below the header (a backdrop-filter ancestor would collapse it).
  const box = await menu.boundingBox();
  expect(box!.height).toBeGreaterThan(page.viewportSize()!.height * 0.8);
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();

  await toggle.click();
  const campus = menu.getByRole("button", { name: "Campus" });
  await campus.click();
  await expect(campus).toHaveAttribute("aria-expanded", "true");
  await menu.getByRole("link", { name: "Transport" }).click();
  await expect(page).toHaveURL(/\/campus\/transport$/);
  await expect(menu).toBeHidden();
});

test("gallery lightbox: arrows step, Next keeps focus, Tab stays inside, focus returns to the last photo", async ({
  page,
}) => {
  await page.goto("/gallery");
  const photos = page.getByRole("button", { name: /^View photo: / });
  const first = photos.first();
  const firstName = (await first.getAttribute("aria-label"))!.replace(/^View photo: /, "");
  await first.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(firstName);
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expect(dialog.getByText(/^1 of \d+$/)).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(/^2 of \d+$/)).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText(/^(\d+) of \1$/)).toBeVisible();
  await page.keyboard.press("ArrowRight"); // back to 1

  // Activating Next with the keyboard keeps focus on Next.
  const next = dialog.getByRole("button", { name: "Next" });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(dialog.getByText(/^2 of \d+$/)).toBeVisible();
  await expect(next).toBeFocused();

  // Tab wraps inside the dialog.
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(next).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(photos.nth(1)).toBeFocused();
});

test("hash links land on their target", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("link", { name: "Send an admission enquiry" }).click();
  await expect(page).toHaveURL(/\/admissions#enquire$/);
  await expect(page.getByRole("heading", { name: "Send an enquiry", exact: true })).toBeInViewport();

  await page.goto("/");
  await page.goto("/admissions#enquire");
  await expect(page.getByRole("heading", { name: "Send an enquiry", exact: true })).toBeInViewport();
});

test("mobile menu returns focus on Escape and closes for a link to the current page", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/admissions");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();

  await toggle.click();
  const menu = page.locator("#mobile-menu");
  await menu.getByRole("button", { name: "Admissions" }).click();
  await menu.getByRole("link", { name: "How to apply" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/\/admissions$/);
});

test("the page behind the mobile menu cannot be tabbed into", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("main")).toHaveJSProperty("inert", true);
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).toHaveJSProperty("inert", false);
});

test.describe("timeline without motion on a wide screen", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  test("shows every milestone", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop layout only");
    await page.goto("/");
    const timeline = page.locator("section", { has: page.getByRole("heading", { name: /one step at a time/ }) });
    for (const year of ["1994", "2001", "2002", "2022"]) {
      const el = timeline.getByText(year, { exact: true });
      await el.scrollIntoViewIfNeeded();
      await expect(el).toBeInViewport();
    }
  });
});

test("draft news stays out of search engines; TC list is not indexed", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/news/admissions-open-2027-28");
  await page.goto("/news/admissions-open-2027-28");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1); // site-wide School data only
  await page.goto("/admissions/tc-issued");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
});

test("draft copy is labelled on the page", async ({ page }) => {
  await page.goto("/about/principal");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Draft");
  await page.goto("/about/school-information");
  await expect(page.getByRole("heading", { level: 1 })).not.toContainText("Draft");
});

test("fee table asks parents to call while amounts are unpublished", async ({ page }) => {
  await page.goto("/admissions/fees");
  await expect(page.getByRole("link", { name: "Ask the office" }).first()).toHaveAttribute("href", "tel:+914651287977");
});

test("enquiry form shows field errors for an empty submission", async ({ page }) => {
  await page.goto("/admissions");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Enter the parent or guardian's name.")).toBeVisible();
  await expect(page.getByText(/Enter a 10-digit phone number/)).toBeVisible();
  await expect(page.getByLabel("Phone number")).toHaveAttribute("aria-invalid", "true");
});

test("enquiry form explains what to do when delivery is not configured", async ({ page }) => {
  await page.goto("/admissions");
  await page.getByLabel("Parent or guardian's name").fill("Mary Joseph");
  await page.getByLabel("Phone number").fill("98765 43210");
  await page.getByLabel("Child's name").fill("Anna");
  await page.getByLabel("Applying for").selectOption("Class 3");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  // The test server runs without ENQUIRY_WEBHOOK_URL, so the API answers 503.
  await expect(page.getByText(/call the office on 04651 287 977/)).toBeVisible();
});

test("the enquiry form succeeds when the API accepts it", async ({ page }) => {
  await page.route("**/api/enquiry", (route) => route.fulfill({ json: { ok: true } }));
  await page.goto("/admissions");
  await page.getByLabel("Parent or guardian's name").fill("Mary Joseph");
  await page.getByLabel("Phone number").fill("9876543210");
  await page.getByLabel("Child's name").fill("Anna");
  await page.getByLabel("Applying for").selectOption("LKG");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Enquiry sent. The school office will call you back.")).toBeVisible();
  await expect(page.getByLabel("Child's name")).toHaveValue("");
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("all content is visible immediately", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Matriculation Higher Secondary School, Muzhucode").first()).toBeVisible();
    await expect(page.getByText("610", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one step at a time/ })).toBeVisible();
  });
});

test("SEO files are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/admissions");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /api/");
  const og = await request.get("/opengraph-image");
  expect(og.headers()["content-type"]).toBe("image/png");
});

test("home page carries School structured data", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(json!);
  expect(data["@type"]).toBe("School");
  expect(data.foundingDate).toBe("1994");
});
