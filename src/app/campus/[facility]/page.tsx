import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FacilityIcon } from "@/components/icons";
import { facilityDetails } from "@/content/campus";
import { facilities, school } from "@/content/school";

export function generateStaticParams() {
  return facilities.map((f) => ({ facility: f.id }));
}

function find(id: string) {
  const facility = facilities.find((f) => f.id === id);
  const detail = facilityDetails[id];
  return facility && detail ? { facility, detail } : null;
}

export async function generateMetadata({ params }: PageProps<"/campus/[facility]">): Promise<Metadata> {
  const found = find((await params).facility);
  if (!found) return {};
  return {
    title: found.facility.name,
    description: `${found.facility.name} at ${school.name}, ${school.place}. ${found.facility.body}`,
  };
}

export default async function FacilityPage({ params }: PageProps<"/campus/[facility]">) {
  const { facility: id } = await params;
  const found = find(id);
  if (!found) notFound();
  const { facility, detail } = found;
  const others = facilities.filter((f) => f.id !== id).slice(0, 6);

  return (
    <>
      <PageHeader
        section="Campus"
        crumbs={[{ href: "/campus", label: "Campus" }]}
        title={facility.name}
        intro={detail.intro}
        draft={detail.draft}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="prose-measure space-y-5 text-lg leading-relaxed text-ink-muted">
              {detail.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[28px] bg-paper p-8">
              <span className="grid size-16 place-items-center rounded-full bg-gold-soft text-forest">
                <FacilityIcon name={facility.icon} className="size-8" />
              </span>
              <h2 className="t-h3 mt-6">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {detail.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="more-title" className="t-h3">
            More on campus
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((f) => (
              <li key={f.id}>
                <Link
                  href={`/campus/${f.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-4 py-2 hover:bg-mist"
                >
                  <FacilityIcon name={f.icon} className="size-4" />
                  {f.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/campus" className="inline-flex rounded-full bg-forest px-4 py-2 text-paper hover:bg-leaf">
                All facilities
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
