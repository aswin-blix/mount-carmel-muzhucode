import { school } from "@/content/school";
import { siteUrl } from "@/lib/site";

/** schema.org School data so search engines can show address, phone and map. */
export function SchoolJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    name: school.name,
    alternateName: [school.tamilName, `${school.shortName} Matric School ${school.place}`],
    url: siteUrl,
    telephone: school.phoneIntl,
    foundingDate: String(school.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: school.address.line1,
      addressLocality: school.place,
      addressRegion: school.state,
      postalCode: school.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: school.geo.lat, longitude: school.geo.lng },
    sameAs: [school.facebookUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
