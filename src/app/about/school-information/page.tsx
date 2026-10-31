import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { facilities, milestones, school, udise } from "@/content/school";

export const metadata: Metadata = {
  title: "School information",
  description: `Recognition, enrolment, staff and infrastructure details for ${school.name}, ${school.place} (UDISE+ ${school.udiseCode}).`,
};

type Row = [label: string, value: string];

export default function SchoolInformationPage() {
  const general: Row[] = [
    ["Name of the school", school.name],
    ["UDISE+ code", school.udiseCode],
    ["Address", `${school.address.line1}, ${school.address.line2}`],
    ["Phone", school.phone],
    ["Year of establishment", String(school.founded)],
    ["Board", school.board],
    ["Medium of instruction", school.medium],
    ["Classes", "Pre-primary (LKG, UKG) to Class 12"],
    ["Management type", school.type],
    ["Location", `${school.location}, ${school.district} District`],
  ];
  const recognition: Row[] = milestones.map((m) => [m.level, `Recognised ${m.year}`]);
  const people: Row[] = [
    ["Students enrolled", `${udise.students.total} (${udise.students.boys} boys, ${udise.students.girls} girls)`],
    ["Teachers", String(udise.teachers.total)],
    ["Teachers with postgraduate degrees", String(udise.teachers.postgraduates)],
    ["Teachers with graduate degrees", String(udise.teachers.graduates)],
  ];
  const infrastructure: Row[] = [
    ["Teaching blocks", String(udise.blocks)],
    ["Classrooms", String(udise.classrooms)],
    ["Computers", `${udise.ict.computers} desktops, ${udise.ict.laptops} laptops`],
    ["Printers", String(udise.ict.printers)],
    ["Projectors", String(udise.ict.projectors)],
    ["Facilities", facilities.map((f) => f.name).join(", ")],
  ];

  return (
    <>
      <PageHeader
        section="About"
        crumbs={[{ href: "/about", label: "About" }]}
        title="School information"
        intro="Key details about the school, as recorded in its UDISE+ return with the Ministry of Education."
      />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <InfoTable title="General" rows={general} />
        <InfoTable title="Recognition" rows={recognition} />
        <InfoTable title="Students and staff" rows={people} />
        <InfoTable title="Infrastructure" rows={infrastructure} />
        <p className="text-sm text-ink-muted">
          Source: UDISE+ data as published on public school directories, October 2026. The school office can provide
          certified copies of recognition orders on request.
        </p>
      </div>
    </>
  );
}

function InfoTable({ title, rows }: { title: string; rows: Row[] }) {
  const id = `info-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="t-h3">
        {title}
      </h2>
      <table className="mt-4 w-full text-left">
        <tbody className="divide-y divide-forest/15 border-y border-forest/15">
          {rows.map(([label, value]) => (
            <tr key={label} className="align-top">
              <th scope="row" className="w-2/5 py-3.5 pr-6 font-normal text-ink-muted">
                {label}
              </th>
              <td className="py-3.5 font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
