import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { principalMessage } from "@/content/about";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Principal's message",
  description: `A welcome from the principal of ${school.name}, ${school.place}.`,
};

export default function PrincipalPage() {
  const m = principalMessage;
  return (
    <>
      <PageHeader
        section="About"
        crumbs={[{ href: "/about", label: "About" }]}
        title="Principal's message"
        intro="A welcome to parents, students and visitors."
        draft={m.draft}
      />

      <article className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="grid aspect-[4/5] max-w-xs place-items-center rounded-[28px] bg-[linear-gradient(180deg,#d6e8e6,#9dc3a8)] text-forest/60">
              <svg viewBox="0 0 120 150" className="w-1/2" aria-hidden="true">
                <circle cx="60" cy="50" r="30" fill="currentColor" />
                <path d="M10 150 C 10 105 35 88 60 88 S 110 105 110 150Z" fill="currentColor" />
              </svg>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">The principal&apos;s photograph will appear here.</p>
          </aside>
          <div className="prose-measure text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-2xl">{m.greeting}</p>
            <div className="mt-6 space-y-5 text-ink-muted">
              {m.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-8">{m.signOff}</p>
            <p className="mt-2 font-serif text-2xl">{m.name || m.title}</p>
            {m.name && <p className="text-ink-muted">{m.title}</p>}
            <p className="text-ink-muted">
              {school.name}, {school.place}
            </p>
            <Link href="/admissions" className="btn btn-forest mt-10">
              Plan a campus visit
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
