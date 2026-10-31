import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TcLookup } from "@/components/TcLookup";
import { DraftMark } from "@/components/Draft";
import { tcIssued } from "@/lib/data";
import { school, tcRequest } from "@/content/school";

export const metadata: Metadata = {
  title: "Transfer certificates",
  description: `Transfer certificates issued by ${school.name}, ${school.place}, and how to request one.`,
  // The list contains students' names, so keep it out of search engines.
  robots: { index: false, follow: true },
};


export default function TcIssuedPage() {
  const list = tcIssued.certificates;
  return (
    <>
      <PageHeader
        section="Admissions"
        crumbs={[{ href: "/admissions", label: "Admissions" }]}
        title="Transfer certificates"
        intro="How to request a transfer certificate, and a list of certificates issued so that other schools can check them."
      />

      <section aria-labelledby="request-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="request-title" className="t-h2">
              Requesting a TC
              <DraftMark show={tcRequest.draft} />
            </h2>
            <ol className="mt-8 space-y-6">
              {tcRequest.steps.map((s, i) => (
                <li key={s} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-forest font-serif text-gold">
                    {i + 1}
                  </span>
                  <p className="pt-1.5">{s}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="t-h2">Certificates issued</h2>
            <div className="mt-8">
              {list.length > 0 ? (
                <TcLookup certificates={list} />
              ) : (
                <p className="rounded-2xl bg-paper p-6 text-lg text-ink-muted ring-1 ring-forest/10">
                  The list of issued certificates has not been published yet. To verify a Mount Carmel transfer
                  certificate, call the school office on{" "}
                  <a href={school.phoneHref} className="link-underline font-semibold text-forest">
                    {school.phone}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
