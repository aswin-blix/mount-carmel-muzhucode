import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { management } from "@/content/about";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Management",
  description: `How ${school.name}, ${school.place}, is managed and run.`,
};

export default function ManagementPage() {
  return (
    <>
      <PageHeader
        section="About"
        crumbs={[{ href: "/about", label: "About" }]}
        title="Management"
        intro={management.intro}
        draft={management.draft}
      />

      <section aria-labelledby="mgmt-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="mgmt-title" className="t-h2">
              The managing body
            </h2>
            <div className="prose-measure mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              {management.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="t-h3">
              Who does what
              <DraftMark show={management.draft} />
            </h2>
            <dl className="mt-6 divide-y divide-forest/15 border-y border-forest/15">
              {management.roles.map((r) => (
                <div key={r.role} className="py-4">
                  <dt className="font-serif text-xl">{r.role}</dt>
                  <dd className="mt-1 text-ink-muted">{r.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
