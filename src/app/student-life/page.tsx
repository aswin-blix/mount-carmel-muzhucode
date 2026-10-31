import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { NewsList } from "@/components/NewsList";
import { studentLife } from "@/content/student-life";
import { school } from "@/content/school";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Student life",
  description: `Clubs, sports, houses and celebrations at ${school.name}, ${school.place}.`,
};

export default function StudentLifePage() {
  const latest = getAllNews().slice(0, 3);
  return (
    <>
      <PageHeader
        section="Student life"
        label="Student life"
        title="Clubs, sport and celebrations"
        intro={studentLife.intro}
        draft={studentLife.draft}
      />

      <section aria-labelledby="clubs-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="clubs-title" className="t-h2">
          Clubs
          <DraftMark show={studentLife.draft} />
        </h2>
        <dl className="mt-10 grid border-t border-forest/15 sm:grid-cols-2 lg:grid-cols-3">
          {studentLife.clubs.map((c) => (
            <div key={c.name} className="border-b border-forest/15 py-6 sm:pr-8">
              <dt className="t-h3">{c.name}</dt>
              <dd className="mt-2 text-ink-muted">{c.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="sports-title" className="bg-forest py-20 text-paper lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <h2 id="sports-title" className="t-h2">
              Sport
              <DraftMark show={studentLife.draft} className="bg-gold-soft" />
            </h2>
            <p className="mt-4 max-w-md text-paper/80">{studentLife.sports.intro}</p>
            <Link href="/campus/playground" className="link-underline mt-6 inline-block font-semibold">
              The playground
            </Link>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-7">
            {studentLife.sports.items.map((s) => (
              <li key={s} className="rounded-full bg-paper/10 px-5 py-2.5 font-serif text-xl ring-1 ring-paper/20">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="events-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="events-title" className="t-h2">
              Through the year
            </h2>
            <dl className="mt-10 space-y-0 border-t border-forest/15">
              {studentLife.events.map((e) => (
                <div key={e.name} className="grid gap-2 border-b border-forest/15 py-5 sm:grid-cols-[14rem_1fr]">
                  <dt className="font-serif text-xl">{e.name}</dt>
                  <dd className="text-ink-muted">{e.body}</dd>
                </div>
              ))}
            </dl>
            <Link href="/academics/calendar" className="link-underline mt-8 inline-block font-semibold">
              See dates in the academic calendar
            </Link>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[28px] bg-gold-soft p-8">
              <h2 className="t-h3">Houses</h2>
              <p className="mt-3 text-ink-muted">{studentLife.houses.intro}</p>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {studentLife.houses.names.map((h) => (
                  <li key={h} className="rounded-2xl bg-paper px-4 py-3 font-medium">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="latest-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="latest-title" className="t-h2">
              Latest from school
            </h2>
            <div className="flex gap-3">
              <Link href="/news" className="btn btn-forest">
                All news
              </Link>
              <Link href="/gallery" className="btn btn-ghost">
                Gallery
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <NewsList posts={latest} />
          </div>
        </div>
      </section>
    </>
  );
}
