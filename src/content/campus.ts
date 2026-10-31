/**
 * Campus copy.
 *
 * The facilities themselves are verified (UDISE+, see school.ts). The longer
 * descriptions and the transport details below are DRAFT, written for the
 * website, and show a "Draft" marker until the school confirms them.
 */

export type FacilityDetail = {
  draft: boolean;
  intro: string;
  paragraphs: string[];
  highlights: string[];
};

/** Keyed by facility id (see `facilities` in school.ts). */
export const facilityDetails: Record<string, FacilityDetail> = {
  atal: {
    draft: true,
    intro:
      "Atal Tinkering Labs are set up in schools under the Government of India's Atal Innovation Mission to help young people learn by building.",
    paragraphs: [
      "In the lab, students work with electronics kits, sensors, microcontrollers, simple robotics and hand tools. They learn to take an everyday problem, sketch a solution, build a working model and test it.",
      "Sessions are planned for upper primary, secondary and higher secondary students, with projects that link to science and mathematics lessons. Students also prepare entries for science fairs and innovation competitions.",
    ],
    highlights: ["Electronics and sensor kits", "Robotics and coding projects", "Design and prototyping", "Science fair and competition preparation"],
  },
  science: {
    draft: true,
    intro: "An integrated laboratory for physics, chemistry and biology practicals.",
    paragraphs: [
      "Students carry out the experiments set out in the State Board syllabus, from simple observations in the middle classes to the practical examinations of the higher secondary years.",
      "Lab sessions are supervised by the science teachers, with safety rules explained before every practical.",
    ],
    highlights: ["Physics, chemistry and biology apparatus", "Practical work built into the timetable", "Preparation for board practical exams", "Safety equipment and supervision"],
  },
  ict: {
    draft: true,
    intro: "The computer lab has 21 working desktop computers, 3 laptops and 4 printers.",
    paragraphs: [
      "Students learn computer basics in the primary classes and move on to office tools, internet safety and programming as they grow older.",
      "The lab is also used for projects and presentations in other subjects.",
    ],
    highlights: ["21 desktop computers", "3 laptops and 4 printers", "Internet connection", "Computer classes from primary onwards"],
  },
  smart: {
    draft: true,
    intro: "Three projectors bring pictures, videos and presentations into lessons.",
    paragraphs: [
      "Teachers use the projectors to show diagrams, short films and demonstrations that are hard to draw on a blackboard, and students use them to present their own projects.",
    ],
    highlights: ["3 projectors", "Video and digital lessons", "Student presentations"],
  },
  library: {
    draft: true,
    intro: "The school library has books for reading and reference in English and Tamil.",
    paragraphs: [
      "Classes visit the library to borrow books, read quietly and learn how to find information. Younger children get picture books and simple readers; older students find reference books, general knowledge and fiction.",
    ],
    highlights: ["English and Tamil books", "Reference and general knowledge", "Library periods for each class", "Book lending"],
  },
  playground: {
    draft: true,
    intro: "An open playground for games, physical education, assemblies and sports day.",
    paragraphs: [
      "Physical education is part of the weekly timetable. Students play team games and athletics, and the ground hosts the annual sports day and school celebrations.",
    ],
    highlights: ["Physical education periods", "Team games and athletics", "Annual sports day", "Morning assembly"],
  },
  classrooms: {
    draft: true,
    intro: "39 classrooms across three teaching blocks, all recorded in good condition.",
    paragraphs: [
      "Each class has its own room with furniture for every student. Classrooms are arranged by section so that younger and older children each have their own part of the campus.",
    ],
    highlights: ["39 classrooms", "3 teaching blocks", "Furniture for every student", "Separate principal's room"],
  },
  solar: {
    draft: true,
    intro: "Solar panels supplement the campus electricity supply.",
    paragraphs: [
      "Solar power reduces the school's electricity costs and gives students a working example of renewable energy on their own campus.",
    ],
    highlights: ["Rooftop solar panels", "Lower running costs", "A real example for science lessons"],
  },
  rain: {
    draft: true,
    intro: "Rainwater harvesting collects monsoon rain and returns it to the ground.",
    paragraphs: [
      "Kanyakumari district receives rain from both the south-west and north-east monsoons. Collecting it helps recharge groundwater and teaches students to value water.",
    ],
    highlights: ["Rainwater collection", "Groundwater recharge", "Water conservation awareness"],
  },
  ramps: {
    draft: true,
    intro: "Ramps with handrails give step-free access.",
    paragraphs: ["Students, parents and visitors who cannot use steps can reach the buildings safely."],
    highlights: ["Ramps with handrails", "Step-free access to blocks"],
  },
  health: {
    draft: true,
    intro: "Students receive regular medical check-ups.",
    paragraphs: [
      "Health check-ups help spot problems with eyesight, hearing, teeth and general health early, so that parents can follow up with a doctor. Basic first aid is available at school.",
    ],
    highlights: ["Regular check-ups", "First aid at school", "Parents informed of any concerns"],
  },
  water: {
    draft: true,
    intro: "Clean drinking water and handwash points across campus.",
    paragraphs: ["Students are encouraged to drink water through the day and wash hands before meals and after play."],
    highlights: ["Drinking water", "Handwash facilities", "Separate toilets"],
  },
};

export const transport = {
  draft: true,
  intro:
    "The school runs buses for students from Muzhucode and the surrounding villages. Routes and stops are reviewed at the start of each academic year.",
  areas: ["Muzhucode", "Uthramcode", "Arumanai", "Vellamcode", "Marthandam side"],
  rules: [
    "Students should be at their stop five minutes before the bus arrives.",
    "A parent or guardian should meet children in pre-primary and primary classes at the stop.",
    "Students stay seated and follow the instructions of the driver and the bus attendant.",
    "Tell the office in writing if someone else will collect your child.",
  ],
  note: "Ask the school office whether your area is on a bus route this year and for the transport fee.",
};
