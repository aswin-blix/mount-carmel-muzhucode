import type { MetadataRoute } from "next";
import { allStaticRoutes } from "@/content/navigation";
import { getAllNews } from "@/lib/news";
import { siteUrl } from "@/lib/site";

const PRIORITY: Record<string, number> = { "/": 1, "/admissions": 0.9 };

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = allStaticRoutes().map((href) => ({
    url: `${siteUrl}${href === "/" ? "" : href}`,
    changeFrequency: "monthly",
    priority: PRIORITY[href] ?? (href.split("/").length > 2 ? 0.6 : 0.7),
  }));
  // Draft posts are visible on the site (with a Draft label) but not offered to search engines.
  const news: MetadataRoute.Sitemap = getAllNews()
    .filter((p) => !p.draft)
    .map((p) => ({
    url: `${siteUrl}/news/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...news];
}
