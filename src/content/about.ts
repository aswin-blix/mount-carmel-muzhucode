/**
 * About-section copy.
 *
 * DRAFT: everything in this file was written for the website, not supplied by
 * the school. Each block carries `draft: true`, which shows a "Draft" marker
 * on the page. Replace the text with the school's own and set `draft: false`.
 */

export type DraftText = { draft: boolean };

export const vision: DraftText & { statement: string } = {
  draft: true,
  statement:
    "Every child who leaves Mount Carmel is confident in English, curious about the world, kind to others and ready for the next step, wherever it leads.",
};

export const mission: DraftText & { points: { title: string; body: string }[] } = {
  draft: true,
  points: [
    {
      title: "Teach well, from the first day",
      body: "Give every child a strong start in reading, writing and mathematics in English, while keeping Tamil and our local culture close.",
    },
    {
      title: "Learn by doing",
      body: "Use our science, computer and tinkering labs so that students test ideas with their own hands, not only from the textbook.",
    },
    {
      title: "Grow the whole child",
      body: "Make room for sport, art, music and service, so that each student finds something they are good at and enjoy.",
    },
    {
      title: "Form good character",
      body: "Encourage honesty, discipline, respect and care for others, in the classroom and outside it.",
    },
    {
      title: "Work with families",
      body: "Keep parents informed and involved, because children do best when home and school pull in the same direction.",
    },
  ],
};

export const values: DraftText & { items: { name: string; body: string }[] } = {
  draft: true,
  items: [
    { name: "Faith", body: "Trust in God and respect for every person's beliefs." },
    { name: "Discipline", body: "Doing the right thing, on time, even when no one is watching." },
    { name: "Excellence", body: "Doing our best work and helping others do theirs." },
    { name: "Service", body: "Using what we learn to help our families and our village." },
  ],
};

export const principalMessage: DraftText & {
  greeting: string;
  paragraphs: string[];
  signOff: string;
  /** Name is left empty until the school supplies it. */
  name: string;
  title: string;
} = {
  draft: true,
  greeting: "Dear parents and students,",
  paragraphs: [
    "Welcome to Mount Carmel. For more than thirty years this school has grown with the families of Muzhucode and the villages around it, from a small English-medium primary school to a campus that now takes children from LKG to Class 12.",
    "Our aim is simple: to give every child a sound education and a good character. We want our students to read widely, think clearly, speak confidently in English and Tamil, and treat others with respect. Good marks matter, and we work hard for them, but so do curiosity, honesty and kindness.",
    "Our teachers know their students by name. In the classroom, the laboratories and on the playground, they help each child find what they are good at and push a little further. Our Atal Tinkering Lab, science and computer labs give students the chance to learn by making and testing, not only by memorising.",
    "Parents are our partners. Please talk to us, attend our meetings and celebrations, and tell us how your child is doing at home. Together we can help every child grow.",
    "I warmly invite you to visit the campus and see Mount Carmel for yourself.",
  ],
  signOff: "With best wishes,",
  name: "",
  title: "Principal",
};

export const management: DraftText & { intro: string; paragraphs: string[]; roles: { role: string; body: string }[] } = {
  draft: true,
  intro:
    "Mount Carmel is a recognised minority institution, run as a private unaided school under the Tamil Nadu State Board.",
  paragraphs: [
    "The management sets the school's direction, appoints the principal and staff, and is responsible for the campus, its buildings and its finances. Day-to-day running of the school is led by the principal.",
  ],
  roles: [
    { role: "Correspondent", body: "Represents the management to the education department and parents, and oversees administration." },
    { role: "Principal", body: "Leads teaching and learning, staff and student welfare, and the daily life of the school." },
    { role: "Vice principal", body: "Supports the principal and coordinates the higher secondary section." },
    { role: "Section coordinators", body: "Look after the pre-primary, primary and secondary sections." },
    { role: "School office", body: "Handles admissions, fees, certificates and enquiries from parents." },
  ],
};

export const staffSections: DraftText & { items: { name: string; body: string }[] } = {
  draft: true,
  items: [
    { name: "Pre-primary", body: "Teachers trained in early-years education, supported by helpers in each classroom." },
    { name: "Primary", body: "Class teachers for Classes 1 to 5, with specialist teachers for Tamil, computer science and physical education." },
    { name: "Upper primary and secondary", body: "Subject teachers for English, Tamil, mathematics, science and social science." },
    { name: "Higher secondary", body: "Postgraduate teachers for each subject offered in Classes 11 and 12." },
    { name: "Co-curricular", body: "Physical education, art, music and lab staff who run sports, clubs and practical work." },
  ],
};
