import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { gallery } from "@/lib/data";
import { school } from "@/content/school";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photographs of campus life at ${school.name}, ${school.place}.`,
};

export default function GalleryPage() {
  const hasPlaceholders = gallery.photos.some((p) => p.draft);
  return (
    <>
      <PageHeader
        section="Student life"
        crumbs={[{ href: "/student-life", label: "Student life" }]}
        title="Gallery"
        intro="Assemblies, celebrations, sports days and everyday moments at Mount Carmel."
        draft={hasPlaceholders}
      />
      <section aria-label="Photographs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        {hasPlaceholders && (
          <p className="mb-8 max-w-2xl rounded-2xl border border-dashed border-carmel/50 bg-gold-soft/50 px-5 py-4 text-carmel">
            These are illustrations standing in for photographs until the school supplies its own.
          </p>
        )}
        <GalleryGrid photos={gallery.photos} />
      </section>
    </>
  );
}
