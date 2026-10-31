import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Facilities } from "@/components/Facilities";
import { Counter } from "@/components/Counter";
import { AdmissionsBand } from "@/components/AdmissionsBand";
import { school, udise } from "@/content/school";

export const metadata: Metadata = {
  title: "Campus",
  description: `Atal Tinkering Lab, science and ICT labs, library, playground, solar power and rainwater harvesting at Mount Carmel, ${school.place}.`,
};

const equipment = [
  { value: udise.classrooms, label: "classrooms" },
  { value: udise.blocks, label: "teaching blocks" },
  { value: udise.ict.computers, label: "desktop computers" },
  { value: udise.ict.projectors, label: "projectors" },
];

export default function CampusPage() {
  return (
    <>
      <PageHeader
        section="Campus"
        label="Campus"
        title="A campus built for making, reading and play"
        intro="Three teaching blocks, three labs, a library and open ground, with solar panels on the roof and rainwater returned to the earth."
      />

      <section aria-labelledby="atal-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 id="atal-title" className="t-h2">
              The Atal Tinkering Lab
            </h2>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-muted">
              Atal Tinkering Labs are set up in schools under the Government of India&apos;s Atal Innovation Mission.
              They give students tools for electronics, robotics, sensors and simple fabrication, so they can turn an
              idea into something that works.
            </p>
            <Link href="/campus/atal" className="link-underline mt-6 inline-block font-semibold">
              Inside the tinkering lab
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-5 lg:col-start-8">
            {equipment.map((e) => (
              <div key={e.label} className="border-t-2 border-forest pt-4">
                <dt className="sr-only">{e.label}</dt>
                <dd>
                  <span className="block font-serif text-5xl leading-none text-leaf">
                    <Counter value={e.value} />
                  </span>
                  <span className="mt-2 block text-ink-muted">{e.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="facilities-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="facilities-title" className="t-h2 mb-12 max-w-xl">
            Everything on campus
          </h2>
          <Facilities />
          <p className="mt-8 text-sm text-ink-muted">
            Facilities as recorded in the school&apos;s UDISE+ return.
          </p>
          <Link href="/campus/transport" className="btn btn-forest mt-10">
            School transport
          </Link>
        </div>
      </section>

      <div className="py-24">
        <AdmissionsBand />
      </div>
    </>
  );
}
