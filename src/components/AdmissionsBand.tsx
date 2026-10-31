import Link from "next/link";
import { school } from "@/content/school";
import { Palm } from "@/components/art/Landscape";

export function AdmissionsBand() {
  return (
    <section aria-labelledby="admissions-band" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[32px] bg-carmel px-6 py-14 text-paper sm:px-12 lg:py-20">
        <Palm className="absolute -bottom-6 right-6 w-28 opacity-25 sm:w-40" color="var(--gold-soft)" />
        <h2 id="admissions-band" className="t-h2 max-w-2xl">
          Admissions are handled by the school office. Come and see the campus first.
        </h2>
        <p className="mt-4 max-w-xl text-paper/80">
          Call to check seats for LKG to Class 12, then visit to meet the principal and look around.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/admissions" className="btn btn-gold">
            How to apply
          </Link>
          <a href={school.phoneHref} className="btn btn-ghost text-paper">
            Call {school.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
