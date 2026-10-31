import type { Metadata, Viewport } from "next";
import "./globals.css";
import { figtree, hindMadurai, youngSerif } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import { school } from "@/content/school";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolJsonLd } from "@/components/SchoolJsonLd";

const description = `${school.name}, ${school.place}, ${school.district}. An English-medium, co-educational Tamil Nadu State Board school from LKG to Class 12, since ${school.founded}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${school.shortName} Matriculation Higher Secondary School, ${school.place}`,
    template: `%s | ${school.shortName} ${school.place}`,
  },
  description,
  keywords: [
    "Mount Carmel Matriculation School",
    "Mount Carmel Muzhucode",
    "Matriculation school Kanyakumari",
    "English medium school Arumanai",
    "Uthramcode school",
    "school admission Kanyakumari",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${school.shortName} ${school.place}`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#123b2c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${youngSerif.variable} ${figtree.variable} ${hindMadurai.variable} antialiased`}
    >
      <body className="min-h-svh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold"
        >
          Skip to content
        </a>
        <SchoolJsonLd />
        <SmoothScroll />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
