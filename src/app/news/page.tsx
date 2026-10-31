import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NewsList } from "@/components/NewsList";
import { getAllNews } from "@/lib/news";
import { inMedia } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "News and events",
  description: `News, events and notices from ${school.name}, ${school.place}.`,
};

export default function NewsPage() {
  const posts = getAllNews();
  return (
    <>
      <PageHeader
        section="Student life"
        crumbs={[{ href: "/student-life", label: "Student life" }]}
        title="News and events"
        intro="Celebrations, achievements, admissions and notices from Mount Carmel."
      />

      <section aria-label="All news" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <NewsList posts={posts} headingLevel="h2" />
      </section>

      {inMedia.items.length > 0 && (
        <section aria-labelledby="media-title" className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <h2 id="media-title" className="t-h2">
              In the media
            </h2>
            <ul className="mt-10 divide-y divide-forest/15 border-y border-forest/15">
              {inMedia.items.map((m) => (
                <li key={m.url} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="link-underline font-serif text-xl">
                    {m.title}
                  </a>
                  <span className="text-ink-muted">
                    {m.outlet}, <time dateTime={m.date}>{formatDate(m.date)}</time>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
