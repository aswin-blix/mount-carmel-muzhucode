import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { curriculum } from "@/content/academics";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Curriculum and assessment",
  description: `Syllabus, assessment and public examinations at ${school.name}, ${school.place}.`,
};

export default function CurriculumPage() {
  return (
    <>
      <PageHeader
        section="Academics"
        crumbs={[{ href: "/academics", label: "Academics" }]}
        title="Curriculum and assessment"
        intro={curriculum.intro}
        draft={curriculum.draft}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <dl className="grid gap-x-16 border-t border-forest/15 md:grid-cols-2">
          {curriculum.sections.map((s) => (
            <div key={s.title} className="border-b border-forest/15 py-8">
              <dt className="t-h3">{s.title}</dt>
              <dd className="prose-measure mt-3 text-lg text-ink-muted">{s.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/academics/calendar" className="btn btn-forest">
            See the academic calendar
          </Link>
          <Link href="/academics" className="btn btn-ghost">
            Stages of school
          </Link>
        </div>
      </section>
    </>
  );
}
