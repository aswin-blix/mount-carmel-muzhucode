import type { Metadata } from "next";
import Link from "next/link";
import { Visit } from "@/components/Visit";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Contact",
  description: `Address, phone number and map for Mount Carmel Matriculation School, ${school.place}. Call ${school.phone}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pt-40">
        <Visit headingLevel="h1" />
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 rounded-[28px] bg-paper p-8 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="t-h3">Asking about admission?</h2>
            <p className="mt-2 text-ink-muted">Send your details and the office will call you back.</p>
            <Link href="/admissions#enquire" className="link-underline mt-4 inline-block font-semibold">
              Send an admission enquiry
            </Link>
          </div>
          <div>
            <h2 className="t-h3">Follow the school</h2>
            <p className="mt-2 text-ink-muted">The school&apos;s page on Facebook.</p>
            <a
              href={school.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-block font-semibold"
            >
              Mount Carmel on Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
