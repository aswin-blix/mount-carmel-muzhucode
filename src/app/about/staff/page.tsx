import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DraftMark } from "@/components/Draft";
import { Counter } from "@/components/Counter";
import { staffSections } from "@/content/about";
import { school, udise } from "@/content/school";
import { staff } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our teachers",
  description: `${udise.teachers.total} teachers at ${school.name}, ${school.place}, including ${udise.teachers.postgraduates} with postgraduate degrees.`,
};

const figures = [
  { value: udise.teachers.total, label: "teachers" },
  { value: udise.teachers.postgraduates, label: "with postgraduate degrees" },
  { value: udise.teachers.graduates, label: "with graduate degrees" },
  { value: Math.round(udise.students.total / udise.teachers.total), label: "students per teacher, on average" },
];

export default function StaffPage() {
  return (
    <>
      <PageHeader
        section="About"
        crumbs={[{ href: "/about", label: "About" }]}
        title="Our teachers"
        intro={`${udise.teachers.total} teachers, all graduates or postgraduates, for ${udise.students.total} students from LKG to Class 12.`}
      />

      <section aria-labelledby="faculty-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="faculty-title" className="sr-only">
          Faculty in numbers
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="border-t-2 border-forest pt-4">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-serif text-[clamp(2.8rem,5vw,4rem)] leading-none text-leaf">
                  <Counter value={f.value} />
                </span>
                <span className="mt-2 block text-ink-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink-muted">Figures from the school&apos;s UDISE+ record.</p>
      </section>

      <section aria-labelledby="sections-title" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="sections-title" className="t-h2">
            How teaching is organised
            <DraftMark show={staffSections.draft} />
          </h2>
          <dl className="mt-10 grid border-t border-forest/15 md:grid-cols-2">
            {staffSections.items.map((s) => (
              <div key={s.name} className="border-b border-forest/15 py-6 md:pr-10">
                <dt className="t-h3">{s.name}</dt>
                <dd className="mt-2 text-ink-muted">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {staff.members.length > 0 && (
        <section aria-labelledby="list-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <h2 id="list-title" className="t-h2">
            Staff list
            <DraftMark show={staff.draft} />
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <thead className="border-b-2 border-forest text-sm text-ink-muted">
                <tr>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Name
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Role
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Subject
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {staff.members.map((m) => (
                  <tr key={`${m.name}-${m.role}`}>
                    <td className="py-3 pr-6 font-medium">{m.name}</td>
                    <td className="py-3 pr-6">{m.role}</td>
                    <td className="py-3 pr-6 text-ink-muted">{m.subject ?? "—"}</td>
                    <td className="py-3 text-ink-muted">{m.qualification ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
