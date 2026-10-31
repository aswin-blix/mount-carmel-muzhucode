import { school } from "@/content/school";
import { PhoneIcon, PinIcon } from "@/components/icons";

/** Address, phone and an embedded map. The map iframe loads lazily. */
export function Visit({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const { lat, lng } = school.geo;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <H className={headingLevel === "h1" ? "t-h1" : "t-h2"}>Find us in {school.place}</H>
        <p className="mt-4 max-w-md text-ink-muted">
          The campus is in {school.place}, near Uthramcode and Arumanai in Vilavancode taluk. Ask for Mount Carmel
          Matric School.
        </p>
        <dl className="mt-8 space-y-5">
          <div className="flex gap-4">
            <dt className="sr-only">Address</dt>
            <PinIcon className="mt-1 size-5 shrink-0 text-leaf" />
            <dd>
              {school.address.line1}
              <br />
              {school.address.line2}
              <br />
              <span className="text-ink-muted">Plus code {school.address.plusCode}</span>
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="sr-only">Phone</dt>
            <PhoneIcon className="mt-1 size-5 shrink-0 text-leaf" />
            <dd>
              <a href={school.phoneHref} className="link-underline text-lg">
                {school.phone}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={school.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-forest">
            Open in Google Maps
          </a>
          <a href={school.phoneHref} className="btn btn-ghost">
            Call the office
          </a>
        </div>
      </div>
      <div className="overflow-hidden rounded-[28px] bg-sky lg:col-span-7">
        <iframe
          title={`Map showing ${school.shortName} school in ${school.place}`}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          className="aspect-[4/3] w-full border-0 lg:aspect-[16/11]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
