"use client";

import { useRef } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";
import type { Milestone } from "@/content/school";

/**
 * The school's recognition milestones as a path that climbs uphill. On wide
 * screens the section pins and the track scrolls sideways; on small screens
 * (or with reduced motion) it is a plain vertical list.
 */
export function Timeline({ items, heading }: { items: Milestone[]; heading: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${FULL_MOTION}`, () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.from("[data-path]", {
          strokeDashoffset: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative bg-paper py-20 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden lg:motion-safe:py-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="journey-title" className="t-h2 max-w-xl">
          {heading}
        </h2>
      </div>

      <div ref={track} className="relative mt-12 lg:mt-16 lg:motion-safe:w-max">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-10 hidden h-28 w-full lg:motion-safe:block"
          viewBox="0 0 2000 100"
          preserveAspectRatio="none"
        >
          <path
            data-path
            d="M0 90 C 300 90 400 70 700 60 S 1200 30 1500 20 S 1900 10 2000 8"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol
          className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10 lg:motion-safe:flex lg:motion-safe:max-w-none lg:motion-safe:gap-0 lg:motion-safe:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {items.map((m, i) => (
            <li
              key={m.year}
              className="relative border-l-2 border-gold pl-6 lg:motion-safe:w-[34rem] lg:motion-safe:shrink-0 lg:motion-safe:border-l-0 lg:motion-safe:pl-0 lg:motion-safe:pr-16"
              style={{ ["--lift" as string]: `${i * -2.2}rem` }}
            >
              <div className="lg:motion-safe:translate-y-[var(--lift)]">
                <p className="font-serif text-[clamp(4rem,9vw,8.5rem)] leading-none text-leaf">{m.year}</p>
                <h3 className="t-h3 mt-3">{m.title}</h3>
                <p className="mt-2 max-w-sm text-ink-muted">{m.body}</p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="hidden lg:motion-safe:block lg:motion-safe:w-[20vw] lg:motion-safe:shrink-0" />
        </ol>
      </div>
    </section>
  );
}
