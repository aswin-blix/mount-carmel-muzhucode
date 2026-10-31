import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { stageDetails } from "@/content/academics";
import { school, stages } from "@/content/school";

export function generateStaticParams() {
  return stages.map((s) => ({ stage: s.slug }));
}

function find(slug: string) {
  const stage = stages.find((s) => s.slug === slug);
  const detail = stageDetails[slug];
  return stage && detail ? { stage, detail } : null;
}

export async function generateMetadata({ params }: PageProps<"/academics/[stage]">): Promise<Metadata> {
  const found = find((await params).stage);
  if (!found) return {};
  return {
    title: `${found.stage.name} (${found.stage.classes})`,
    description: `${found.stage.name} at ${school.name}, ${school.place}: ${found.stage.classes}, English medium, ${school.board}.`,
  };
}

export default async function StagePage({ params }: PageProps<"/academics/[stage]">) {
  const { stage: slug } = await params;
  const found = find(slug);
  if (!found) notFound();
  const { stage, detail } = found;

  const index = stages.findIndex((s) => s.slug === slug);
  const prev = stages[index - 1];
  const next = stages[index + 1];

  return (
    <>
      <PageHeader
        section="Academics"
        crumbs={[{ href: "/academics", label: "Academics" }]}
        title={stage.name}
        intro={`${stage.classes}. ${detail.ages}.${stage.since ? ` Recognised in ${stage.since}.` : ""}`}
        draft={detail.draft}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-lede">
              {detail.intro}
              <DraftMark show={detail.draft} />
            </p>
            <h2 className="t-h2 mt-16">What children learn</h2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {detail.subjects.map((sub) => (
                <li key={sub} className="flex gap-3 border-b border-forest/15 py-3">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-gold" />
                  {sub}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[28px] bg-paper p-8">
              <h2 className="t-h3">At a glance</h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm text-ink-muted">Classes</dt>
                  <dd className="font-medium">{stage.classes}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-muted">Typical age</dt>
                  <dd className="font-medium">{detail.ages}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-muted">Board</dt>
                  <dd className="font-medium">{school.board}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-muted">Medium</dt>
                  <dd className="font-medium">{school.medium}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-muted">The school day</dt>
                  <dd className="font-medium">{detail.dayShape}</dd>
                </div>
              </dl>
              <Link href="/admissions" className="btn btn-forest mt-8">
                Apply for {stage.classes}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="focus-title" className="t-h2">
            What we focus on
            <DraftMark show={detail.draft} />
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {detail.focus.map((f) => (
              <div key={f.title} className="border-t-2 border-forest pt-5">
                <h3 className="t-h3">{f.title}</h3>
                <p className="mt-3 text-ink-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Other stages" className="mx-auto grid max-w-7xl gap-4 px-4 pt-20 sm:grid-cols-2 sm:px-6 lg:px-10">
        {prev ? (
          <Link href={`/academics/${prev.slug}`} className="rounded-[22px] border border-forest/15 p-6 hover:bg-paper">
            <span className="text-sm text-ink-muted">Previous stage</span>
            <span className="mt-1 block font-serif text-2xl">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/academics/${next.slug}`}
            className="rounded-[22px] border border-forest/15 p-6 text-right hover:bg-paper"
          >
            <span className="text-sm text-ink-muted">Next stage</span>
            <span className="mt-1 block font-serif text-2xl">{next.name}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
