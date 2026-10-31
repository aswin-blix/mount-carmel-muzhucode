import { describe, expect, it } from "vitest";
import { getAllNews, getNewsPost, parseNewsFile } from "@/lib/news";
import { formatDate } from "@/lib/format";

const valid = `---
title: Sports day
date: 2026-01-20
category: Sports
summary: Track events on the ground.
draft: true
---

Hello **world**.
`;

describe("parseNewsFile", () => {
  it("parses front matter, strips the date from the slug and renders Markdown", () => {
    const post = parseNewsFile("2026-01-20-sports-day.md", valid);
    expect(post).toMatchObject({
      slug: "sports-day",
      title: "Sports day",
      date: "2026-01-20",
      category: "Sports",
      summary: "Track events on the ground.",
      draft: true,
    });
    expect(post.html).toContain("<strong>world</strong>");
  });

  it("treats a missing draft flag as published", () => {
    const post = parseNewsFile("2026-01-20-sports-day.md", valid.replace("draft: true\n", ""));
    expect(post.draft).toBe(false);
  });

  it.each([
    ["title", valid.replace("title: Sports day\n", ""), /missing title/],
    ["summary", valid.replace("summary: Track events on the ground.\n", ""), /missing summary/],
    ["date", valid.replace("date: 2026-01-20", "date: 20/01/2026"), /date must be/],
    ["category", valid.replace("category: Sports", "category: Gossip"), /category must be one of/],
  ])("rejects a bad %s with the file name in the message", (_field, source, message) => {
    expect(() => parseNewsFile("2026-01-20-sports-day.md", source)).toThrow(message);
    expect(() => parseNewsFile("2026-01-20-sports-day.md", source)).toThrow(/2026-01-20-sports-day\.md/);
  });

  it("rejects file names that do not make a clean URL", () => {
    expect(() => parseNewsFile("2026-01-20-Sports Day.md", valid)).toThrow(/file name/);
  });
});

describe("news in the repository", () => {
  const posts = getAllNews();

  it("loads every post, newest first, with unique slugs", () => {
    expect(posts.length).toBeGreaterThan(0);
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  it("finds a post by slug and returns undefined for unknown slugs", () => {
    expect(getNewsPost(posts[0].slug)?.title).toBe(posts[0].title);
    expect(getNewsPost("no-such-post")).toBeUndefined();
  });
});

describe("formatDate", () => {
  it("formats ISO dates as day month year", () => {
    expect(formatDate("2026-10-20")).toBe("20 October 2026");
    expect(formatDate("2027-01-01")).toBe("1 January 2027");
  });
});
