import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { mission, values, vision } from "@/content/about";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Vision and mission",
  description: `The vision, mission and values of ${school.name}, ${school.place}.`,
};

export default function VisionMissionPage() {
  return (
    <>
      <PageHeader
        section="About"
        crumbs={[{ href: "/about", label: "About" }]}
        title="Vision and mission"
        intro="What we hope every Mount Carmel student will become, and how we work towards it each day."
      />

      <section aria-labelledby="vision-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="vision-title" className="font-serif text-2xl text-leaf">
          Our vision
          <DraftMark show={vision.draft} />
        </h2>
        <p className="t-h2 mt-6 max-w-4xl text-balance">{vision.statement}</p>
      </section>

      <section aria-labelledby="mission-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="mission-title" className="t-h2">
            Our mission
            <DraftMark show={mission.draft} />
          </h2>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {mission.points.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4">
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-sage">
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="mt-2 text-ink-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="values-title" className="t-h2">
          Our values
          <DraftMark show={values.draft} />
        </h2>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-forest/15 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((v) => (
            <div key={v.name} className="bg-mist p-8">
              <dt className="font-serif text-3xl text-forest">{v.name}</dt>
              <dd className="mt-3 text-ink-muted">{v.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
