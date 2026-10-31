import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Faq } from "@/components/Faq";
import { faqs, school } from "@/content/school";

export const metadata: Metadata = {
  title: "Questions parents ask",
  description: `Answers about board, medium, admissions, timings, transport and certificates at ${school.name}, ${school.place}.`,
};

export default function FaqsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => !f.draft)
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        section="Admissions"
        crumbs={[{ href: "/admissions", label: "Admissions" }]}
        title="Questions parents ask"
        intro={`Can't find your answer here? Call the school office on ${school.phone}.`}
      />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Faq items={faqs} headingLevel="h2" />
        <a href={school.phoneHref} className="btn btn-forest mt-12">
          Call {school.phone}
        </a>
      </section>
    </>
  );
}
