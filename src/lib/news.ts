import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * News and events are Markdown files in src/content/news/.
 * File name: YYYY-MM-DD-some-title.md  ->  URL: /news/some-title
 * Read synchronously at build time, which Cache Components treats as static.
 */
const NEWS_DIR = path.join(process.cwd(), "src/content/news");

export const NEWS_CATEGORIES = ["Admissions", "Academics", "Events", "Sports", "Achievements", "Notices"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsPost = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  summary: string;
  draft: boolean;
  html: string;
};

function toIsoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return null;
}

/** Parses one Markdown file. Throws with the file name if required fields are missing. */
export function parseNewsFile(fileName: string, source: string): NewsPost {
  const { data, content } = matter(source);
  const fail = (msg: string) => {
    throw new Error(`News file ${fileName}: ${msg}`);
  };

  const slug = fileName.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("file name must be YYYY-MM-DD-lowercase-words.md");

  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) fail("missing title");

  const date = toIsoDate(data.date);
  if (!date) fail("date must be YYYY-MM-DD");

  const category = data.category as NewsCategory;
  if (!NEWS_CATEGORIES.includes(category)) fail(`category must be one of ${NEWS_CATEGORIES.join(", ")}`);

  const summary = typeof data.summary === "string" ? data.summary.trim() : "";
  if (!summary) fail("missing summary");

  return {
    slug,
    title,
    date: date!,
    category,
    summary,
    draft: data.draft === true,
    html: marked.parse(content, { async: false }),
  };
}

let cache: NewsPost[] | null = null;

/** All posts, newest first. */
export function getAllNews(): NewsPost[] {
  // Cache in production builds only, so new files show up in `next dev` without a restart.
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = readdirSync(NEWS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) => parseNewsFile(f, readFileSync(path.join(NEWS_DIR, f), "utf8")));
  const seen = new Set<string>();
  for (const p of posts) {
    if (seen.has(p.slug)) throw new Error(`Two news files share the slug "${p.slug}"`);
    seen.add(p.slug);
  }
  cache = posts.sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return getAllNews().find((p) => p.slug === slug);
}
