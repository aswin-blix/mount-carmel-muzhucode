import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { fees } from "@/lib/data";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Fee structure",
  description: `What school fees cover and when they are due at ${school.name}, ${school.place}.`,
};

export default function FeesPage() {
  return (
    <>
      <PageHeader
        section="Admissions"
        crumbs={[{ href: "/admissions", label: "Admissions" }]}
        title="Fee structure"
        intro={fees.intro}
        draft={fees.draft}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2">
              Fees for {fees.academicYear}
              <DraftMark show={fees.draft} />
            </h2>
            <table className="mt-8 w-full text-left">
              <thead className="border-b-2 border-forest text-sm text-ink-muted">
                <tr>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Classes
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    Annual fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/15">
                {fees.byClass.map((row) => (
                  <tr key={row.classes}>
                    <th scope="row" className="py-4 pr-6 font-serif text-xl font-normal">
                      {row.classes}
                    </th>
                    <td className="py-4">
                      {row.amount ?? (
                        <a href={school.phoneHref} className="link-underline text-ink-muted">
                          Ask the office
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="t-h2 mt-16">What fees cover</h2>
            <dl className="mt-6 divide-y divide-forest/15 border-y border-forest/15">
              {fees.components.map((c) => (
                <div key={c.name} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr]">
                  <dt className="font-semibold">{c.name}</dt>
                  <dd className="text-ink-muted">{c.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
            <div className="rounded-[28px] bg-paper p-8">
              <h2 className="t-h3">When to pay</h2>
              <ol className="mt-5 space-y-4">
                {fees.schedule.map((s) => (
                  <li key={s.instalment} className="flex items-baseline justify-between gap-4 border-b border-forest/10 pb-3">
                    <span className="font-medium">{s.instalment}</span>
                    <span className="text-ink-muted">{s.due}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[28px] bg-gold-soft p-8">
              <h2 className="t-h3">Good to know</h2>
              <ul className="mt-4 space-y-3">
                {fees.notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-carmel" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
