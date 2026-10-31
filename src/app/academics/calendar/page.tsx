import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { calendar, type CalendarEvent } from "@/lib/data";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Academic calendar",
  description: `Terms, examinations, holidays and events for ${calendar.academicYear} at ${school.name}, ${school.place}.`,
};

const KIND: Record<CalendarEvent["kind"], { label: string; dot: string }> = {
  term: { label: "Term", dot: "bg-leaf" },
  exam: { label: "Examination", dot: "bg-carmel" },
  holiday: { label: "Holiday", dot: "bg-gold" },
  event: { label: "Event", dot: "bg-sage" },
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        section="Academics"
        crumbs={[{ href: "/academics", label: "Academics" }]}
        title={`Academic calendar ${calendar.academicYear}`}
        label="Academic calendar"
        intro={calendar.note}
        draft={calendar.draft}
      />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <ul aria-label="Key" className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          {Object.values(KIND).map((k) => (
            <li key={k.label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`size-3 rounded-full ${k.dot}`} />
              {k.label}
            </li>
          ))}
        </ul>
        <ol className="border-t border-forest/15">
          {calendar.months.map((m) => (
            <li key={m.month} className="grid gap-3 border-b border-forest/15 py-6 sm:grid-cols-[12rem_1fr]">
              <h2 className="font-serif text-2xl">{m.month}</h2>
              <ul className="space-y-2">
                {m.events.map((e) => (
                  <li key={e.title} className="flex items-start gap-3">
                    <span aria-hidden="true" className={`mt-2 size-3 shrink-0 rounded-full ${KIND[e.kind].dot}`} />
                    <span>
                      {e.title}
                      {e.kind !== "event" && (
                        <span className="ml-2 text-sm text-ink-muted">{KIND[e.kind].label}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
