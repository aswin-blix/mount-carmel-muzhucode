import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DraftMark } from "@/components/Draft";
import { getAllNews, getNewsPost } from "@/lib/news";
import { formatDate } from "@/lib/format";
import { siteUrl } from "@/lib/site";
import { school } from "@/content/school";

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = getNewsPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", publishedTime: post.date },
    // Draft posts stay out of search results until the school confirms them.
    robots: post.draft ? { index: false, follow: true } : undefined,
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const all = getAllNews();
  const others = all.filter((p) => p.slug !== slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    description: post.summary,
    url: `${siteUrl}/news/${post.slug}`,
    publisher: { "@type": "School", name: school.name },
  };

  return (
    <article className="pt-32 lg:pt-40">
      {!post.draft && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <header className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>{" "}
              /
            </li>
            <li>
              <Link href="/news" className="hover:underline">
                News and events
              </Link>{" "}
              /
            </li>
            <li aria-current="page" className="font-medium text-forest">
              {post.title}
            </li>
          </ol>
        </nav>
        <p className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-forest px-3 py-1 font-semibold text-paper">{post.category}</span>
          <time dateTime={post.date} className="text-ink-muted">
            {formatDate(post.date)}
          </time>
        </p>
        <h1 className="t-h1 mt-6 text-balance">
          {post.title}
          <DraftMark show={post.draft} />
        </h1>
        <p className="mt-6 text-xl text-ink-muted">{post.summary}</p>
      </header>

      <div
        className="prose-article mx-auto mt-12 max-w-3xl px-4 sm:px-6"
        // Markdown from src/content/news, written by the school; not user input.
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {others.length > 0 && (
        <aside aria-labelledby="more-news" className="mx-auto mt-20 max-w-3xl border-t border-forest/15 px-4 pt-10 sm:px-6">
          <h2 id="more-news" className="t-h3">
            More news
          </h2>
          <ul className="mt-4 space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/news/${p.slug}`} className="link-underline text-lg">
                  {p.title}
                </Link>
                <span className="ml-2 text-sm text-ink-muted">{formatDate(p.date)}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
