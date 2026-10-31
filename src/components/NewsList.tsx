import Link from "next/link";
import { DraftMark } from "@/components/Draft";
import { formatDate } from "@/lib/format";
import type { NewsPost } from "@/lib/news";

/** Card grid of news posts; used on the home, student life and news pages. */
export function NewsList({ posts, headingLevel = "h3" }: { posts: NewsPost[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  if (posts.length === 0) {
    return <p className="text-ink-muted">No news has been posted yet.</p>;
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.slug}>
          <article className="relative flex h-full flex-col rounded-[24px] bg-mist p-7 ring-1 ring-forest/10 transition-shadow focus-within:ring-2 focus-within:ring-gold hover:shadow-[0_14px_40px_-18px_rgba(18,59,44,0.45)]">
            <p className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-forest px-3 py-1 font-semibold text-paper">{p.category}</span>
              <time dateTime={p.date} className="text-ink-muted">
                {formatDate(p.date)}
              </time>
            </p>
            <H className="t-h3 mt-5">
              <Link href={`/news/${p.slug}`} className="after:absolute after:inset-0 after:rounded-[24px] focus:outline-none">
                {p.title}
              </Link>
            </H>
            <p className="mt-3 flex-1 text-ink-muted">{p.summary}</p>
            <DraftMark show={p.draft} className="!ml-0 mt-5 self-start" />
          </article>
        </li>
      ))}
    </ul>
  );
}
