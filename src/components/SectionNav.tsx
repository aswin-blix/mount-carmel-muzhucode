"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";

/**
 * Sibling pages of the current section, shown as a horizontal strip under the
 * page header (scrolls sideways on small screens).
 */
export function SectionNav({ group }: { group: string }) {
  const pathname = usePathname();
  const links = navigation.find((g) => g.label === group)?.children ?? [];
  if (links.length < 2) return null;

  return (
    <nav aria-label={`${group} pages`} className="sticky top-[4.5rem] z-30 border-b border-forest/10 bg-mist/90 backdrop-blur-md">
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-10">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-forest text-paper" : "text-ink-muted hover:bg-forest/5 hover:text-forest"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
