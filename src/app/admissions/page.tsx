import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Faq } from "@/components/Faq";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DraftMark } from "@/components/Draft";
import { admissionSteps, documentsCommonlyAsked, faqs, school } from "@/content/school";

export const metadata: Metadata = {
  title: "Admissions",
  description: `How to apply to Mount Carmel, ${school.place}, for LKG to Class 12. Call ${school.phone} or send an enquiry.`,
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        section="Admissions"
        label="Admissions"
        title="Joining Mount Carmel"
        intro={`Admissions are open to boys and girls from LKG to Class 12, subject to seats. Start by calling the school office on ${school.phone}.`}
      />

      <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="steps-title" className="t-h2 max-w-xl">
          How to apply
          <DraftMark show={admissionSteps.draft} />
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.items.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="grid size-12 place-items-center rounded-full bg-forest font-serif text-xl text-gold"
              >
                {i + 1}
              </span>
              <h3 className="t-h3 mt-5">{step.title}</h3>
              <p className="mt-2 text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="docs-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <h2 id="docs-title" className="t-h2">
              Documents to bring
              <DraftMark show={documentsCommonlyAsked.draft} />
            </h2>
            <p className="mt-4 text-ink-muted">
              Schools usually ask for the documents below. The office will confirm the exact list when you collect the
              application form.
            </p>
            <ul className="mt-8 space-y-3">
              {documentsCommonlyAsked.items.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="t-h2">Questions parents ask</h2>
            <div className="mt-8">
              <Faq items={faqs.slice(0, 5)} />
            </div>
            <Link href="/admissions/faqs" className="link-underline mt-6 inline-block font-semibold">
              All questions
            </Link>
          </div>
        </div>
      </section>

      <section id="enquire" aria-labelledby="enquire-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="enquire-title" className="t-h2">
              Send an enquiry
            </h2>
            <p className="mt-4 text-ink-muted">
              Leave your number and the school office will call you back. For a quicker answer, call{" "}
              <a href={school.phoneHref} className="link-underline font-semibold text-forest">
                {school.phone}
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
