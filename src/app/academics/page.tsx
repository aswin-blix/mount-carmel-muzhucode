import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { stages, school } from "@/content/school";

export const metadata: Metadata = {
  title: "Academics",
  description: `LKG to Class 12 in English medium under the ${school.board} at Mount Carmel, ${school.place}.`,
};

const approach = [
  {
    title: "English from the first day",
    body: "Every subject except Tamil is taught in English, from LKG onwards, so children grow up reading, writing and speaking it with confidence.",
  },
  {
    title: "Tamil Nadu State Board",
    body: "The syllabus follows the Tamil Nadu State Board. Students sit the SSLC examination in Class 10 and the Higher Secondary examination in Class 12.",
  },
  {
    title: "Learning with hands as well as books",
    body: "Practical work happens in the integrated science lab, the ICT lab and the Atal Tinkering Lab, where students build and test their own projects.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        section="Academics"
        label="Academics"
        title="Fourteen years of learning, LKG to Class 12"
        intro={`One English-medium campus under the ${school.board}, so children can stay with the same school from their first classroom to their last board exam.`}
      />

      <section aria-labelledby="approach-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="approach-title" className="t-h2 max-w-xl">
          How we teach
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {approach.map((a) => (
            <div key={a.title} className="border-t-2 border-forest pt-5">
              <h3 className="t-h3">{a.title}</h3>
              <p className="mt-3 text-ink-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="stages-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="stages-title" className="t-h2 max-w-xl">
            Stages of school
          </h2>
          <ol className="mt-12 space-y-0">
            {stages.map((s, i) => (
              <li
                key={s.name}
                className="grid gap-4 border-t border-forest/15 py-10 md:grid-cols-12 md:gap-8"
              >
                <p className="font-serif text-5xl text-sage md:col-span-1" aria-hidden="true">
                  {i + 1}
                </p>
                <div className="md:col-span-4">
                  <h3 className="t-h3">
                    <Link href={`/academics/${s.slug}`} className="hover:underline">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-semibold text-leaf">{s.classes}</p>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="text-lg text-ink-muted">{s.body}</p>
                  {s.since && <p className="mt-3 text-sm text-ink-muted">Recognised in {s.since}</p>}
                  <Link href={`/academics/${s.slug}`} className="link-underline mt-4 inline-block font-semibold">
                    More about {s.name.toLowerCase()}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="grid gap-8 rounded-[28px] bg-gold-soft p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="t-h3">Choosing subjects for Class 11?</h2>
            <p className="mt-2 text-ink-muted">
              Subject groups can change from year to year. Call the office for this year&apos;s groups and seats.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a href={school.phoneHref} className="btn btn-forest">
              Call {school.phone}
            </a>
            <Link href="/admissions" className="btn btn-ghost">
              Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
