import localFont from "next/font/local";

// Self-hosted (SIL OFL) so builds never depend on reaching Google Fonts.
export const youngSerif = localFont({
  src: "../fonts/young-serif-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

export const figtree = localFont({
  src: "../fonts/figtree-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});

export const hindMadurai = localFont({
  src: "../fonts/hind-madurai-tamil-600-normal.woff2",
  weight: "600",
  variable: "--font-hind-madurai",
  display: "swap",
  preload: false,
});
