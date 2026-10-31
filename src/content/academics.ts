/**
 * Academics copy.
 *
 * DRAFT unless stated: written for the website from general knowledge of the
 * Tamil Nadu State Board, not supplied by the school. Each block carries
 * `draft: true`, which shows a "Draft" marker on the page.
 */

export type StageDetail = {
  draft: boolean;
  ages: string;
  intro: string;
  subjects: string[];
  focus: { title: string; body: string }[];
  dayShape: string;
};

/** Keyed by stage slug (see `stages` in school.ts). */
export const stageDetails: Record<string, StageDetail> = {
  "pre-primary": {
    draft: true,
    ages: "About 3 to 5 years",
    intro:
      "LKG and UKG are a gentle start to school. Children learn through songs, stories, games and hands-on activities, and grow used to listening, sharing and speaking in English.",
    subjects: ["English (phonics, rhymes, early reading)", "Tamil (letters and rhymes)", "Numbers and shapes", "Environment and general awareness", "Art, craft and music", "Free play and outdoor games"],
    focus: [
      { title: "Speaking and listening", body: "Daily rhymes, stories and show-and-tell build confidence in English." },
      { title: "Early reading and writing", body: "Phonics and pre-writing activities prepare children for Class 1." },
      { title: "Number sense", body: "Counting, sorting and simple patterns with everyday objects." },
      { title: "Habits and independence", body: "Taking turns, tidying up, eating together and caring for belongings." },
    ],
    dayShape: "A shorter school day, with time for rest, play and snacks between activities.",
  },
  primary: {
    draft: true,
    ages: "About 6 to 10 years",
    intro:
      "In Classes 1 to 5, children build strong foundations in reading, writing and arithmetic. Lessons are in English, with Tamil taught as a language, and teachers keep a close eye on each child's progress.",
    subjects: ["English", "Tamil", "Mathematics", "Environmental science (science and social studies)", "Computer basics", "General knowledge", "Art, music and physical education"],
    focus: [
      { title: "Fluent reading", body: "Regular reading time and library visits so every child reads with understanding by Class 3." },
      { title: "Mathematics with meaning", body: "Number work, measurement and problem solving using objects and real situations." },
      { title: "Curiosity about the world", body: "Simple experiments, nature walks and projects on our village and district." },
      { title: "Values and good habits", body: "Moral instruction, assemblies and class responsibilities." },
    ],
    dayShape: "A full school day with a morning assembly, five or six lessons, lunch and games time.",
  },
  "upper-primary": {
    draft: true,
    ages: "About 11 to 13 years",
    intro:
      "Classes 6 to 8 move from one class teacher to specialist subject teachers. Students start working in the science and computer labs and take on longer projects.",
    subjects: ["English", "Tamil", "Mathematics", "Science", "Social science", "Computer science", "Physical education, art and music"],
    focus: [
      { title: "Lab work", body: "Regular practical sessions in the integrated science lab." },
      { title: "Tinkering and coding", body: "Introductory projects in the Atal Tinkering Lab and ICT lab." },
      { title: "Study skills", body: "Note-making, revision and planning for tests." },
      { title: "Clubs and competitions", body: "Science fairs, quizzes, elocution and sports meets." },
    ],
    dayShape: "Subject periods through the day, with lab and library periods in the weekly timetable.",
  },
  secondary: {
    draft: true,
    ages: "About 14 to 15 years",
    intro:
      "Classes 9 and 10 prepare students for the SSLC public examination conducted by the Government of Tamil Nadu. Teaching focuses on understanding the syllabus thoroughly and practising for the board exam.",
    subjects: ["English", "Tamil", "Mathematics", "Science", "Social science"],
    focus: [
      { title: "Board-exam preparation", body: "Unit tests, model exams and revision of past papers." },
      { title: "Extra support", body: "Special classes for students who need more help in a subject." },
      { title: "Practical science", body: "Lab work to support the science syllabus." },
      { title: "Guidance for Class 11", body: "Advice for students and parents on choosing a subject group." },
    ],
    dayShape: "Full day with focused subject periods; extra study sessions in the run-up to public exams.",
  },
  "higher-secondary": {
    draft: true,
    ages: "About 16 to 17 years",
    intro:
      "Classes 11 and 12 follow the Tamil Nadu State Board higher secondary syllabus, leading to the Class 12 public examination. Students choose a subject group in Class 11 that prepares them for college and entrance examinations.",
    subjects: ["English", "Tamil", "Group subjects chosen in Class 11 (ask the office for this year's groups)"],
    focus: [
      { title: "Subject depth", body: "Postgraduate teachers for each subject." },
      { title: "Practical examinations", body: "Lab work for science and computer subjects, as required by the board." },
      { title: "College and career guidance", body: "Information on courses, entrance exams and scholarships." },
      { title: "Responsibility", body: "Senior students lead clubs, events and assemblies." },
    ],
    dayShape: "Full day of subject and lab periods; revision and model examinations before the public exams.",
  },
};

export const curriculum = {
  draft: true,
  intro:
    "Mount Carmel follows the syllabus and textbooks of the Tamil Nadu State Board from Class 1 to Class 12, taught in English. Tamil is studied as a language throughout.",
  sections: [
    {
      title: "The syllabus",
      body: "Classes 1 to 12 use the State Board textbooks published by the Tamil Nadu Textbook and Educational Services Corporation. Pre-primary classes follow the school's own early-years programme.",
    },
    {
      title: "Continuous assessment",
      body: "Teachers check progress through class work, projects, oral tests and short written tests throughout the year, not only in exams.",
    },
    {
      title: "Term examinations",
      body: "Students sit term examinations during the year. Parents receive a progress report after each one and are invited to meet the class teacher.",
    },
    {
      title: "Public examinations",
      body: "Students sit the SSLC public examination at the end of Class 10 and the Higher Secondary public examination at the end of Class 12, conducted by the Directorate of Government Examinations, Tamil Nadu.",
    },
    {
      title: "Practical work",
      body: "Science, computer science and tinkering activities are part of the timetable, and practical examinations are held where the board requires them.",
    },
    {
      title: "Homework and reading",
      body: "Homework is set to practise what was learned in class, with regular reading from the school library.",
    },
  ],
};
