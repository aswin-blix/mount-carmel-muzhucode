"use client";

import type Lenis from "lenis";

/**
 * Shared handle on the Lenis instance so overlays (mobile menu, lightbox) can
 * pause smooth scrolling. Setting `overflow: hidden` alone does not stop Lenis,
 * which drives the window scroll from wheel events itself.
 */
let lenis: Lenis | null = null;
let locks = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.style.overflow = "";
    lenis?.start();
  }
}
