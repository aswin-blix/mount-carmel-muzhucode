/**
 * Single source of truth for every fact shown on the site.
 *
 * Facts below were gathered on 31 Oct 2026 from public listings:
 *  - icbse.com school profile (UDISE+ data): founding year, recognition years,
 *    classes, board, medium, enrolment, teachers, classrooms, facilities.
 *  - Google Maps listing: Tamil name, address, plus code, phone, coordinates.
 *  - Facebook page "Mount Carmel Matriculation School Muzhucode".
 *
 * Only add facts from a public source or supplied by the school. Details still
 * to be confirmed are listed in the README.
 */

export const school = {
  name: "Mount Carmel Matriculation Higher Secondary School",
  shortName: "Mount Carmel",
  tamilName: "மவுண்ட் கார்மல் மெட்ரிக் பள்ளி",
  place: "Muzhucode",
  district: "Kanyakumari",
  state: "Tamil Nadu",
  founded: 1994,
  board: "Tamil Nadu State Board (Matriculation)",
  medium: "English",
  type: "Co-educational, private unaided minority school",
  /** UDISE+ code (from the schools.org.in listing URL). */
  udiseCode: "33300700814",
  location: "Rural",
  phone: "04651 287 977",
  phoneHref: "tel:+914651287977",
  phoneIntl: "+91 4651 287977",
  address: {
    line1: "Muzhucode, Uthramcode",
    line2: "Kanyakumari District, Tamil Nadu 629168",
    postalCode: "629168",
    plusCode: "967F+6F3",
  },
  geo: { lat: 8.3630218, lng: 77.2236664 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mount+Carmel+Matriculation+School+Muzhucode",
  facebookUrl:
    "https://www.facebook.com/p/Mount-Carmel-Matriculation-School-Muzhucode-100071048903818/",
} as const;

export type Milestone = { year: number; level: string; title: string; body: string };

/** Recognition years from UDISE+ via icbse.com. */
export const milestones: Milestone[] = [
  {
    year: 1994,
    level: "Primary (Classes 1–5)",
    title: "The first classrooms open",
    body: "Mount Carmel begins in Muzhucode as an English-medium primary school, recognised the same year.",
  },
  {
    year: 2001,
    level: "Upper primary (Classes 6–8)",
    title: "Upper primary",
    body: "Classes 6 to 8 are recognised, so children can continue at Mount Carmel through middle school.",
  },
  {
    year: 2002,
    level: "Secondary (Classes 9–10)",
    title: "Secondary school",
    body: "Recognition for Classes 9 and 10. Students now sit their board examinations from Mount Carmel.",
  },
  {
    year: 2022,
    level: "Higher secondary (Classes 11–12)",
    title: "Higher secondary",
    body: "Classes 11 and 12 are recognised, completing a single campus from pre-primary to Class 12.",
  },
];

/** Figures from the school's UDISE+ record (via icbse.com). */
export const udise = {
  students: { total: 610, boys: 322, girls: 288 },
  teachers: { total: 31, graduates: 18, postgraduates: 13 },
  classrooms: 39,
  blocks: 3,
  ict: { computers: 21, laptops: 3, printers: 4, projectors: 3 },
} as const;

export const stats = [
  { value: udise.students.total, suffix: "", label: "students enrolled" },
  { value: udise.classrooms, suffix: "", label: `classrooms across ${udise.blocks} blocks` },
  { value: udise.teachers.total, suffix: "", label: `teachers, ${udise.teachers.postgraduates} with postgraduate degrees` },
  { value: udise.ict.computers, suffix: "", label: "computers in the ICT lab" },
];

export type Stage = {
  slug: string;
  name: string;
  classes: string;
  /** Year of recognition, or null if no source gives one. */
  since: number | null;
  body: string;
};

export const stages: Stage[] = [
  {
    slug: "pre-primary",
    name: "Pre-primary",
    classes: "LKG and UKG",
    since: null,
    body: "First steps in English, numbers and stories, learned through play.",
  },
  {
    slug: "primary",
    name: "Primary",
    classes: "Classes 1 to 5",
    since: 1994,
    body: "Reading, writing and arithmetic in English, alongside Tamil and environmental science.",
  },
  {
    slug: "upper-primary",
    name: "Upper primary",
    classes: "Classes 6 to 8",
    since: 2001,
    body: "Science, mathematics and social science, with time in the science and computer labs.",
  },
  {
    slug: "secondary",
    name: "Secondary",
    classes: "Classes 9 and 10",
    since: 2002,
    body: "Preparation for the Tamil Nadu SSLC board examination at the end of Class 10.",
  },
  {
    slug: "higher-secondary",
    name: "Higher secondary",
    classes: "Classes 11 and 12",
    since: 2022,
    body: "Board-examination years under the Tamil Nadu State Board. Ask the office which subject groups are offered this year.",
  },
];

export type Facility = {
  id: string;
  name: string;
  body: string;
  icon: "lab" | "atal" | "computer" | "book" | "field" | "sun" | "rain" | "ramp" | "health" | "water" | "class" | "screen";
  /** Listed in the Campus menu. */
  featured?: boolean;
};

/** Every item here is listed in the school's UDISE+ facility record. */
export const facilities: Facility[] = [
  { id: "atal", featured: true, name: "Atal Tinkering Lab", body: "A making space for robotics, electronics and design projects, part of the national Atal Innovation Mission.", icon: "atal" },
  { id: "science", featured: true, name: "Integrated science lab", body: "Physics, chemistry and biology practicals under one roof.", icon: "lab" },
  { id: "ict", featured: true, name: "ICT lab", body: "21 working computers, 3 laptops and printers for computer classes and projects.", icon: "computer" },
  { id: "smart", name: "Projector classrooms", body: "Three projectors for visual lessons, videos and presentations.", icon: "screen" },
  { id: "library", featured: true, name: "Library", body: "Books for reading and reference, open to every class.", icon: "book" },
  { id: "playground", featured: true, name: "Playground", body: "Open ground for games, sports days and assemblies.", icon: "field" },
  { id: "classrooms", name: "39 classrooms", body: "Spread across three blocks, all recorded in good condition.", icon: "class" },
  { id: "solar", name: "Solar power", body: "Solar panels supplement the campus electricity supply.", icon: "sun" },
  { id: "rain", name: "Rainwater harvesting", body: "Monsoon rain is collected and returned to the ground.", icon: "rain" },
  { id: "ramps", name: "Ramps with handrails", body: "Step-free access for students and visitors who need it.", icon: "ramp" },
  { id: "health", name: "Medical check-ups", body: "Regular health check-ups for students.", icon: "health" },
  { id: "water", name: "Drinking water and handwash", body: "Clean drinking water and handwash points across campus.", icon: "water" },
];

/** DRAFT: generic process; confirm against the office's actual steps. */
export const admissionSteps = {
  draft: true,
  items: [
  { title: "Call or send an enquiry", body: "Tell us your child's name, age and the class you are applying for. The office will tell you whether seats are available." },
  { title: "Visit the campus", body: "Meet the principal, see the classrooms and labs, and ask anything you need to know." },
  { title: "Submit the application", body: "Collect the application form from the school office and return it with the documents requested." },
  { title: "Confirm the admission", body: "Once the application is accepted, the office will explain the fees and when classes begin." },
],
};

/** DRAFT: the school's actual TC procedure still needs confirming. */
export const tcRequest = {
  draft: true,
  steps: [
    "Write to the principal asking for the transfer certificate, giving your child's name, class and reason for leaving.",
    "Clear any school dues and return library books.",
    "Collect the certificate from the school office. The office will tell you when it is ready.",
  ],
};

/** DRAFT: typical Tamil Nadu requirements; confirm with the office. */
export const documentsCommonlyAsked = {
  draft: true,
  items: [
  "Birth certificate",
  "Transfer certificate from the previous school (Class 2 and above)",
  "Mark sheet of the last class completed",
  "Recent passport-size photographs",
  "Parent's ID and address proof",
],
};

export type Faq = { q: string; a: string; draft?: boolean };

export const faqs: Faq[] = [
  {
    q: "Which board does Mount Carmel follow?",
    a: "The Tamil Nadu State Board. Students sit the SSLC examination in Class 10 and the Higher Secondary examination in Class 12.",
  },
  {
    q: "What is the medium of instruction?",
    a: "English, from pre-primary onwards. Tamil is taught as a language subject.",
  },
  {
    q: "Is the school co-educational?",
    a: "Yes. Boys and girls study together from LKG to Class 12.",
  },
  {
    q: "When do admissions open?",
    a: "Call the school office for this year's admission dates, available seats and fee details.",
  },
  {
    q: "Which subject groups are offered in Class 11?",
    a: "Groups can change from year to year, so please ask the office for the current list before applying.",
  },
  {
    q: "How old should my child be to join LKG?",
    a: "Children usually join LKG at about three and a half years of age. The office will confirm the exact age cut-off for the year you are applying.",
    draft: true,
  },
  {
    q: "What are the school hours?",
    a: "School runs on weekdays from morning assembly until mid-afternoon, with shorter hours for pre-primary children. The office will give you the exact timings.",
    draft: true,
  },
  {
    q: "Does the school run buses?",
    a: "Yes, for Muzhucode and nearby villages. Ask the office whether your area is on a route this year.",
    draft: true,
  },
  {
    q: "Is there a school uniform?",
    a: "Yes. Students wear the school uniform every day and a PE kit on sports days. Details are given at admission.",
    draft: true,
  },
  {
    q: "How do parents hear from the school?",
    a: "Through the school diary, circulars, progress reports after each term examination and parent–teacher meetings. You are welcome to call the office at any time.",
    draft: true,
  },
  {
    q: "How do I get a transfer certificate?",
    a: "Apply in writing at the school office. The certificate is issued once school dues are cleared and library books returned.",
    draft: true,
  },
];

