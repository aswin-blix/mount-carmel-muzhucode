/**
 * Hand-drawn landscape pieces: layered foothill ridges of the Western Ghats
 * (the "mount") and coconut palms, as seen around Muzhucode.
 * All decorative, so hidden from assistive technology.
 */

type RidgeProps = { className?: string; fill: string };

const VIEW = "0 0 1600 600";

export const ridgePaths = {
  far: "M0 300 C 200 230 340 190 520 235 S 860 150 1040 205 S 1380 170 1600 235 V600 H0Z",
  peak: "M0 380 C 200 330 360 330 520 350 S 820 300 960 230 S 1100 120 1180 140 S 1330 250 1450 290 S 1560 310 1600 315 V600 H0Z",
  near: "M0 455 C 220 405 420 425 620 440 S 1000 385 1240 420 S 1480 410 1600 425 V600 H0Z",
  front: "M0 520 C 260 478 520 492 780 508 S 1220 470 1600 500 V600 H0Z",
} as const;

export function Ridge({ d, fill, className }: RidgeProps & { d: string }) {
  return (
    <svg
      viewBox={VIEW}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

export function Palm({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 170" aria-hidden="true" focusable="false" className={className}>
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M50 170 C 53 130 45 88 55 42" strokeWidth="5" />
        <g strokeWidth="4.5">
          <path d="M55 42 C 32 32 16 40 4 56" />
          <path d="M55 42 C 36 24 20 21 7 28" />
          <path d="M55 42 C 52 22 46 11 37 4" />
          <path d="M55 42 C 62 17 74 9 89 12" />
          <path d="M55 42 C 77 30 91 36 99 51" />
          <path d="M55 42 C 71 40 83 53 87 68" />
          <path d="M55 42 C 39 45 27 57 21 73" />
        </g>
      </g>
    </svg>
  );
}

/** A thin ridge line used as a section edge (footer, page headers). */
export function RidgeEdge({ className, fill }: RidgeProps) {
  return (
    <svg viewBox="0 0 1600 80" preserveAspectRatio="none" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M0 60 C 200 30 360 34 520 46 S 820 20 960 8 S 1100 4 1180 18 S 1330 44 1450 50 S 1560 52 1600 54 V80 H0Z"
        fill={fill}
      />
    </svg>
  );
}
