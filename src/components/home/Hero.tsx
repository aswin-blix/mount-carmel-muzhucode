"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { Palm, Ridge, ridgePaths } from "@/components/art/Landscape";
import { PhoneIcon } from "@/components/icons";
import { school } from "@/content/school";

/**
 * The one big moment on the site: the name "Mount Carmel" set among the
 * foothill ridges. On load the hills rise, the sun comes up and the letters
 * climb out of the land; on scroll the layers drift apart (parallax).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const split = SplitText.create("[data-hero-title] span[data-line]", {
          type: "chars",
          mask: "chars",
          charsClass: "inline-block",
          // The visible lines are aria-hidden; the h1's accessible name comes from the sr-only text.
          aria: "none",
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-sun]", { yPercent: 70, scale: 0.85, duration: 1.8, ease: "power2.out" }, 0)
          .from("[data-ridge]", { yPercent: 18, duration: 1.4, stagger: 0.12 }, 0)
          .from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.35)
          .from("[data-palm]", { scaleY: 0, transformOrigin: "50% 100%", duration: 1, stagger: 0.1, ease: "back.out(1.6)" }, 0.8)
          .from("[data-hero-copy] > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 1.0);

        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-sun]", { yPercent: 60, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-layer='far']", { yPercent: 6, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-layer='peak']", { yPercent: 10, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-title]", { yPercent: 35, ease: "none", scrollTrigger: scrub });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] max-h-[1100px] min-h-[640px] flex-col overflow-hidden bg-[linear-gradient(180deg,#cfe4e3_0%,#e4efe6_45%,#fbe9b7_80%)]"
    >
      {/* The landscape stage fills everything above the copy band */}
      <div className="relative flex-1">
        <div
          data-sun
          aria-hidden="true"
          className="absolute left-[52%] top-[14%] -z-10 aspect-square w-[min(52vw,460px)] rounded-full bg-[radial-gradient(circle_at_50%_45%,#ffd84d_0%,#f2b90c_58%,#f2b90c00_70%)]"
        />

        {/* Back layers sit behind the name */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[82%]">
          <div data-layer="far" data-ridge className="absolute inset-0">
            <Ridge d={ridgePaths.far} fill="var(--sage)" className="absolute inset-0 size-full" />
          </div>
          <div data-layer="peak" data-ridge className="absolute inset-0">
            <Ridge d={ridgePaths.peak} fill="var(--fern)" className="absolute inset-0 size-full" />
          </div>
        </div>

        <h1
          id="hero-title"
          data-hero-title
          className="t-display relative mx-auto w-full max-w-7xl px-4 pt-[max(6rem,14svh)] text-[clamp(5.2rem,19vw,17.5rem)] text-forest sm:px-6 lg:px-10"
        >
          <span data-line aria-hidden="true" className="block">
            Mount
          </span>
          <span data-line aria-hidden="true" className="block pl-[0.5em]">
            Carmel
          </span>
          <span className="sr-only">
            {school.name}, {school.place}
          </span>
        </h1>

        {/* Front layers overlap the bottom of the letters */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] md:h-[66%]">
          <div data-ridge className="absolute inset-0">
            <Ridge d={ridgePaths.near} fill="var(--leaf)" className="absolute inset-0 size-full" />
          </div>
          <div className="absolute bottom-[8%] right-[5vw] flex items-end gap-[2.5vw]">
            <span data-palm className="block w-[clamp(44px,6vw,92px)]">
              <Palm className="w-full" color="var(--forest)" />
            </span>
            <span data-palm className="mb-[1vw] block w-[clamp(34px,4.5vw,68px)]">
              <Palm className="w-full -scale-x-100" color="var(--forest)" />
            </span>
            <span data-palm className="block w-[clamp(50px,7vw,108px)]">
              <Palm className="w-full" color="var(--forest)" />
            </span>
          </div>
          <Ridge d={ridgePaths.front} fill="var(--forest)" className="absolute inset-0 size-full" />
        </div>
      </div>

      {/* Copy rests on the front hill */}
      <div className="relative -mt-px bg-forest text-paper">
        <div
          data-hero-copy
          className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-8 pt-2 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
        >
          <div>
            <p className="font-serif text-xl sm:text-2xl">
              Matriculation Higher Secondary School, {school.place}
            </p>
            <p lang="ta" className="mt-1 font-tamil text-gold-soft">
              {school.tamilName}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admissions" className="btn btn-gold">
              Plan a campus visit
            </Link>
            <a href={school.phoneHref} className="btn btn-ghost text-paper">
              <PhoneIcon className="size-4" />
              Call the office
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
