import Link from "next/link";
import { facilities } from "@/content/school";
import { FacilityIcon } from "@/components/icons";

/** Facilities as a ruled list linking to each facility page; `limit` shows the first n (home page). */
export function Facilities({ limit }: { limit?: number }) {
  const items = limit ? facilities.slice(0, limit) : facilities;
  return (
    <ul className="grid border-t border-forest/15 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f.id} className="border-b border-forest/15">
          <Link href={`/campus/${f.id}`} className="group flex h-full gap-4 py-6 sm:pr-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-soft text-forest transition-colors group-hover:bg-gold">
              <FacilityIcon name={f.icon} className="size-6" />
            </span>
            <span>
              <span className="block font-serif text-xl group-hover:underline">{f.name}</span>
              <span className="mt-1 block text-[0.98rem] text-ink-muted">{f.body}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
