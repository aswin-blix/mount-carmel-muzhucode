/**
 * Website mark: a hill with a single star above it. This is a placeholder
 * for the school's official crest, which should replace it once supplied.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <clipPath id="mc-mark-clip">
          <circle cx="24" cy="24" r="23" />
        </clipPath>
      </defs>
      <g clipPath="url(#mc-mark-clip)">
        <rect width="48" height="48" fill="var(--forest)" />
        <path d="M0 38 C 12 30 18 22 24 18 C 30 22 36 30 48 38 V48 H0Z" fill="var(--fern)" />
        <path d="M0 41 C 14 35 32 34 48 41 V48 H0Z" fill="var(--leaf)" />
      </g>
      <path
        d="M24 6.5 l1.9 3.9 4.3.6 -3.1 3 .7 4.3 -3.8 -2 -3.8 2 .7 -4.3 -3.1 -3 4.3 -.6z"
        fill="var(--gold)"
      />
    </svg>
  );
}
