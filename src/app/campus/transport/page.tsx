import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { PinIcon } from "@/components/icons";
import { transport } from "@/content/campus";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Transport",
  description: `School bus service for ${school.name}, ${school.place}, and nearby villages.`,
};

export default function TransportPage() {
  return (
    <>
      <PageHeader
        section="Campus"
        crumbs={[{ href: "/campus", label: "Campus" }]}
        title="Transport"
        intro={transport.intro}
        draft={transport.draft}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-h2">
              Areas served
              <DraftMark show={transport.draft} />
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {transport.areas.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-medium ring-1 ring-forest/10"
                >
                  <PinIcon className="size-4 text-leaf" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-ink-muted">{transport.note}</p>
            <a href={school.phoneHref} className="btn btn-forest mt-6">
              Ask about bus routes
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="t-h2">Travelling safely</h2>
            <ul className="mt-8 space-y-4">
              {transport.rules.map((r) => (
                <li key={r} className="flex gap-4 border-b border-forest/15 pb-4 text-lg">
                  <span aria-hidden="true" className="mt-2.5 size-2.5 shrink-0 rounded-full bg-gold" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
