"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "@/lib/gsap";
import { getLenis, registerLenis } from "@/lib/scroll-lock";

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger animations
 * stay in sync. Disabled entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, anchors: { offset: -88 } });
    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      registerLenis(null);
    };
  }, []);

  // After a navigation Next.js has already scrolled (to the top or to a #hash).
  // Re-sync Lenis to that position instead of overriding it, then re-measure
  // scroll-driven animations for the new page.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
