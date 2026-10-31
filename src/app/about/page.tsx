import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { milestones, school, udise } from "@/content/school";

export const metadata: Metadata = {
  title: "About",
  description: `The story of ${school.name}, ${school.place}: founded ${school.founded}, recognised up to Class 12 in ${milestones[3].year}.`,
};

const facts = [
  { label: "Founded", value: String(school.founded) },
  { label: "Board", value: school.board },
  { label: "Medium", value: school.medium },
  { label: "Classes", value: "LKG to Class 12" },
  { label: "School type", value: school.type },
  { label: "Location", value: `${school.place}, ${school.district} District, ${school.state}` },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Our story"
        section="About"
        title={`A village school that grew, class by class, since ${school.founded}`}
        intro={`Mount Carmel began in ${school.place} as an English-medium primary school. Over three decades it added middle school, secondary and, in ${milestones[3].year}, higher secondary classes.`}
      />

      <section aria-labelledby="story-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="story-title" className="t-h2">
              Our story
            </h2>
            <div className="prose-measure mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                {school.place} sits in the green, rolling country of Vilavancode taluk, at the southern tip of India,
                where rubber and coconut groves run up towards the Western Ghats. In {school.founded}, Mount Carmel
                opened here as an English-medium primary school.
              </p>
              <p>
                The school has grown one stage at a time. Upper primary classes were recognised in{" "}
                {milestones[1].year}, the secondary school in {milestones[2].year} and higher secondary in{" "}
                {milestones[3].year}. A child can now join in LKG and leave after the Class 12
                board examination without changing schools.
              </p>
              <p>
                Today about {udise.students.total} boys and girls study across three blocks, taught by {udise.teachers.total}{" "}
                teachers. The campus
                has an Atal Tinkering Lab, an integrated science lab, an ICT lab, a library and a playground.
              </p>
            </div>
          </div>

          <aside aria-labelledby="facts-title" className="lg:col-span-4 lg:col-start-9">
            <h2 id="facts-title" className="font-serif text-2xl">
              At a glance
            </h2>
            <dl className="mt-5 divide-y divide-forest/15 border-y border-forest/15">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <dt className="text-ink-muted">{f.label}</dt>
                  <dd className="font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section aria-labelledby="name-title" className="bg-forest py-20 text-paper lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <h2 id="name-title" className="t-h2 lg:col-span-5">
            Why “Mount Carmel”
          </h2>
          <div className="prose-measure space-y-5 text-lg leading-relaxed text-paper/85 lg:col-span-6 lg:col-start-7">
            <p>
              Mount Carmel is a coastal mountain range in the Holy Land. It gave its name to the Carmelites, a family of
              Catholic religious orders known for prayer and, in many of their congregations, for teaching. Schools
              around the world carry the name.
            </p>
            <p>
              Mount Carmel in {school.place} is a recognised minority institution and a co-educational school for boys
              and girls.
            </p>
          </div>
        </div>
      </section>

      <Timeline items={milestones} heading="How the school grew" />

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-10">
        <p className="t-lede max-w-2xl">Want to see it for yourself?</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admissions" className="btn btn-forest">
            Plan a campus visit
          </Link>
          <Link href="/campus" className="btn btn-ghost">
            Explore the campus
          </Link>
        </div>
      </section>
    </>
  );
}
