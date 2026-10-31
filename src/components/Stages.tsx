import { stages } from "@/content/school";

/**
 * LKG to Class 12 drawn as steps up the hill: each stage sits a little
 * higher than the one before, so the climb from pre-primary to higher
 * secondary reads at a glance.
 */
export function Stages() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[28px] bg-forest/15 md:grid-cols-5 md:items-end md:gap-2 md:overflow-visible md:rounded-none md:bg-transparent">
      {stages.map((s, i) => (
        <li
          key={s.name}
          className="flex flex-col bg-paper p-6 md:rounded-t-[22px] md:pb-8"
          style={{ ["--step" as string]: `${12 + i * 4.5}rem` }}
        >
          <div className="md:min-h-[var(--step)]">
            <p className="text-sm font-semibold text-leaf">{s.classes}</p>
            <h3 className="t-h3 mt-1">{s.name}</h3>
            <p className="mt-3 text-[0.98rem] text-ink-muted">{s.body}</p>
          </div>
          <p className="mt-6 border-t border-forest/10 pt-3 text-sm text-ink-muted">
            {s.since ? `Recognised ${s.since}` : "Part of the school today"}
          </p>
        </li>
      ))}
    </ol>
  );
}
