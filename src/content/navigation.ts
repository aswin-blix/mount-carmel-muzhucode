import { facilities, stages } from "@/content/school";

export type NavLink = { href: string; label: string; description?: string };
export type NavGroup = { label: string; href: string; children: NavLink[] };

/** Site navigation. The header, footer, mobile menu and sitemap.xml are all built from this. */
export const navigation: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { href: "/about", label: "Our story", description: "How the school began and grew" },
      { href: "/about/vision-and-mission", label: "Vision and mission", description: "What we want for every child" },
      { href: "/about/principal", label: "Principal's message", description: "A welcome to parents and students" },
      { href: "/about/management", label: "Management", description: "Who runs the school" },
      { href: "/about/staff", label: "Our teachers", description: "Faculty and leadership" },
      { href: "/about/school-information", label: "School information", description: "Recognition and UDISE+ details" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { href: "/academics", label: "Overview", description: "LKG to Class 12 on one campus" },
      ...stages.map((s) => ({ href: `/academics/${s.slug}`, label: s.name, description: s.classes })),
      { href: "/academics/curriculum", label: "Curriculum and assessment", description: "Syllabus, exams and reports" },
      { href: "/academics/calendar", label: "Academic calendar", description: "Terms, exams and holidays" },
    ],
  },
  {
    label: "Campus",
    href: "/campus",
    children: [
      { href: "/campus", label: "All facilities", description: "Labs, library and grounds" },
      ...facilities
        .filter((f) => f.featured)
        .map((f) => ({ href: `/campus/${f.id}`, label: f.name })),
      { href: "/campus/transport", label: "Transport", description: "School bus routes" },
    ],
  },
  {
    label: "Student life",
    href: "/student-life",
    children: [
      { href: "/student-life", label: "Clubs and activities", description: "Sports, clubs and celebrations" },
      { href: "/news", label: "News and events", description: "What is happening at school" },
      { href: "/gallery", label: "Gallery", description: "Photographs from campus" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { href: "/admissions", label: "How to apply", description: "Steps, documents and enquiry form" },
      { href: "/admissions/fees", label: "Fee structure", description: "What fees cover and when they are due" },
      { href: "/admissions/faqs", label: "Questions parents ask", description: "Board, medium, timings and more" },
      { href: "/admissions/tc-issued", label: "Transfer certificates", description: "TCs issued by the school" },
    ],
  },
  { label: "Contact", href: "/contact", children: [] },
];

/** Every static route on the site (dynamic news articles are added by the sitemap). */
export function allStaticRoutes(): string[] {
  const routes = new Set<string>(["/"]);
  for (const group of navigation) {
    routes.add(group.href);
    for (const child of group.children) routes.add(child.href);
  }
  for (const s of stages) routes.add(`/academics/${s.slug}`);
  for (const f of facilities) routes.add(`/campus/${f.id}`);
  return [...routes];
}
