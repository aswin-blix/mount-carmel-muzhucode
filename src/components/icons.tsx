import type { Facility } from "@/content/school";

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function PhoneIcon({ className }: P) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function PinIcon({ className }: P) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ArrowIcon({ className }: P) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const facilityPaths: Record<Facility["icon"], React.ReactNode> = {
  atal: (
    <>
      <rect x="6" y="7" width="12" height="10" rx="2" />
      <circle cx="10" cy="12" r="1.2" />
      <circle cx="14" cy="12" r="1.2" />
      <path d="M12 7V4M9 4h6M4 11v3M20 11v3M9 20l1-3M15 20l-1-3" />
    </>
  ),
  lab: (
    <>
      <path d="M9 3h6M10 3v6L4.5 18.5A1.8 1.8 0 0 0 6 21h12a1.8 1.8 0 0 0 1.5-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  computer: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  screen: (
    <>
      <path d="M3 5h18M5 5v9h14V5M12 14v3M8 21l4-4 4 4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
    </>
  ),
  field: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M12 5v14" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  class: (
    <>
      <path d="M3 10 12 4l9 6M5 10v10h14V10M9 20v-5h6v5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </>
  ),
  rain: (
    <>
      <path d="M7 15a4.5 4.5 0 1 1 1.2-8.8A5.5 5.5 0 0 1 18.5 8 3.5 3.5 0 0 1 18 15z" />
      <path d="M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5" />
    </>
  ),
  ramp: (
    <>
      <path d="M3 19h18L3 9z" />
      <path d="M3 6l18 9" />
    </>
  ),
  health: (
    <>
      <path d="M12 20s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 8 2.3C20 15.4 12 20 12 20z" />
      <path d="M12 10.5v5M9.5 13h5" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.4 12 3 12 3z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
};

export function FacilityIcon({ name, className }: P & { name: Facility["icon"] }) {
  return (
    <svg {...base} className={className}>
      {facilityPaths[name]}
    </svg>
  );
}
