import Link from "next/link";
import { school } from "@/content/school";
import { navigation } from "@/content/navigation";
import { RidgeEdge } from "@/components/art/Landscape";
import { Mark } from "@/components/art/Mark";

export function SiteFooter() {
  const groups = navigation.filter((g) => g.children.length > 0);
  return (
    <footer className="relative mt-24 bg-forest text-paper">
      <RidgeEdge fill="var(--forest)" className="absolute inset-x-0 -top-[59px] h-[60px] w-full" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Mark className="size-12" />
              <p className="font-serif text-2xl leading-tight">
                {school.shortName}
                <span className="block text-base text-sage">Matriculation Higher Secondary School</span>
              </p>
            </div>
            <p lang="ta" className="mt-5 font-tamil text-lg text-gold-soft">
              {school.tamilName}
            </p>
            <p className="mt-4 max-w-sm text-sage">
              English-medium, co-educational, Tamil Nadu State Board. Serving the families of {school.place} since{" "}
              {school.founded}.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <h2 className="font-serif text-lg text-gold">Visit</h2>
            <address className="mt-3 not-italic leading-relaxed text-paper/85">
              {school.address.line1}
              <br />
              {school.address.line2}
            </address>
            <a href={school.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block">
              Get directions
            </a>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-serif text-lg text-gold">Call</h2>
            <a href={school.phoneHref} className="link-underline mt-3 inline-block text-lg">
              {school.phone}
            </a>
            <a
              href={school.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-paper/85 hover:text-paper"
            >
              Facebook page
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-paper/10 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {groups.map((g) => (
            <div key={g.label}>
              <h2 className="font-serif text-lg text-gold">
                <Link href={g.href} className="hover:underline">
                  {g.label}
                </Link>
              </h2>
              <ul className="mt-3 space-y-1.5 text-[0.95rem]">
                {g.children.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-paper/80 hover:text-paper">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-sage sm:flex-row sm:justify-between sm:px-6 lg:px-10">
          <p>
            {school.name}, {school.place}, {school.district} District, {school.state}.
          </p>
          <p className="flex gap-5">
            <Link href="/contact" className="hover:text-paper">
              Contact
            </Link>
            <Link href="/about/school-information" className="hover:text-paper">
              School information
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
