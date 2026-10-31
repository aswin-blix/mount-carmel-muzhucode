import Link from "next/link";
import { Ridge, ridgePaths } from "@/components/art/Landscape";
import { DraftMark } from "@/components/Draft";
import { SectionNav } from "@/components/SectionNav";

export type Crumb = { href: string; label: string };

/**
 * Inner-page header: breadcrumb, title and intro over a low ridge line that
 * echoes the home hero.
 */
export function PageHeader({
  title,
  intro,
  crumbs = [],
  draft = false,
  section,
  label,
}: {
  title: string;
  /** Short name for the breadcrumb, if the title is a sentence. */
  label?: string;
  intro: string;
  /** Parent pages, not including the current page or Home. */
  crumbs?: Crumb[];
  draft?: boolean;
  /** Navigation group label; shows its sibling pages under the header. */
  section?: string;
}) {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#d6e8e6_0%,#eaf1ea_100%)] pb-28 pt-32 lg:pb-36 lg:pt-40">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 lg:h-56">
          <Ridge d={ridgePaths.peak} fill="var(--sage)" className="absolute inset-0 size-full opacity-70" />
          <Ridge d={ridgePaths.front} fill="var(--mist)" className="absolute inset-0 size-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {[{ href: "/", label: "Home" }, ...crumbs].map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <Link href={c.href} className="hover:text-forest hover:underline">
                    {c.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="font-medium text-forest">
                {label ?? title}
              </li>
            </ol>
          </nav>
          <h1 className="t-h1 max-w-3xl text-balance">
            {title}
            <DraftMark show={draft} />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">{intro}</p>
        </div>
      </header>
      {section && <SectionNav group={section} />}
    </>
  );
}
