"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Photo grid with album filter and a keyboard-accessible lightbox
 * (Escape closes, arrow keys move, Tab is kept inside, and focus returns to
 * the photo last viewed).
 */
export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const albums = [...new Set(photos.map((p) => p.album))];
  const [album, setAlbum] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const shown = album ? photos.filter((p) => p.album === album) : photos;

  const isOpen = open !== null;
  // Index of the photo on screen, kept so focus can return to it on close.
  const lastShown = useRef<number | null>(null);
  useEffect(() => {
    if (open !== null) lastShown.current = open;
  }, [open]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  );

  // Runs only when the lightbox opens or closes, not on every step, so focus
  // stays on Previous/Next while browsing.
  useEffect(() => {
    if (!isOpen) {
      if (lastShown.current !== null) triggers.current[lastShown.current]?.focus();
      lastShown.current = null;
      return;
    }
    closeRef.current?.focus();
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  // Keyboard: Escape closes, arrows step, Tab stays inside the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  if (photos.length === 0) {
    return <p className="text-lg text-ink-muted">Photographs from campus will be posted here soon.</p>;
  }

  const current = open === null ? null : shown[open];

  return (
    <>
      {albums.length > 1 && (
        <div role="group" aria-label="Filter by album" className="mb-8 flex flex-wrap gap-2">
          {[null, ...albums].map((a) => (
            <button
              key={a ?? "all"}
              type="button"
              aria-pressed={album === a}
              onClick={() => setAlbum(a)}
              className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-forest/20 aria-pressed:bg-forest aria-pressed:text-paper"
            >
              {a ?? "All photos"}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shown.map((p, i) => (
          <li key={p.src} className="mb-5 break-inside-avoid">
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-[20px]"
                aria-label={`View photo: ${p.title}`}
              >
                <motion.span layoutId={reduce ? undefined : `photo-${p.src}`} className="block">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </motion.span>
              </button>
              <figcaption className="mt-2 text-sm">
                <span className="font-semibold">{p.title}</span>
                <span className="text-ink-muted"> {p.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            data-lenis-prevent
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[60] flex flex-col bg-forest/95 p-4 text-paper sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-paper/70">
                {open + 1} of {shown.length}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="btn btn-ghost text-paper">
                Close
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
              <motion.div layoutId={reduce ? undefined : `photo-${current.src}`} className="max-h-full">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  className="max-h-[70svh] w-auto rounded-[20px]"
                />
              </motion.div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-2xl">
                <span className="font-serif text-xl">{current.title}</span>
                <span className="block text-paper/75">{current.caption}</span>
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="btn btn-ghost text-paper">
                  Previous
                </button>
                <button type="button" onClick={() => step(1)} className="btn btn-gold">
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
