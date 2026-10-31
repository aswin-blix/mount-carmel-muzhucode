/**
 * Public URL of the site, without a trailing slash. Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL (set this to the real domain in production)
 *  2. VERCEL_PROJECT_PRODUCTION_URL (set automatically by Vercel; host only)
 *  3. http://localhost:3000
 */
export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl(process.env);

if (process.env.NODE_ENV === "production" && siteUrl.startsWith("http://localhost") && !process.env.CI) {
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set: canonical URLs, sitemap and Open Graph tags will point to localhost.",
  );
}
