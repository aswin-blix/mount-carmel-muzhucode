/**
 * Typed access to the JSON lists in src/content/data/. The type annotations
 * make `npm run typecheck` fail if someone edits a file into the wrong shape.
 */
import feesJson from "@/content/data/fees.json";
import staffJson from "@/content/data/staff.json";
import tcJson from "@/content/data/tc-issued.json";
import galleryJson from "@/content/data/gallery.json";
import mediaJson from "@/content/data/in-media.json";
import calendarJson from "@/content/data/calendar.json";

export type Fees = {
  draft: boolean;
  academicYear: string;
  intro: string;
  components: { name: string; body: string }[];
  schedule: { instalment: string; due: string }[];
  /** `amount` is null until the school publishes the approved fee. */
  byClass: { classes: string; amount: string | null }[];
  notes: string[];
};

export type StaffMember = { name: string; role: string; qualification?: string; subject?: string };
export type Staff = { draft: boolean; members: StaffMember[] };

export type TransferCertificate = {
  /** Number printed on the certificate */
  tcNumber: string;
  studentName: string;
  /** Class the student left from, e.g. "Class 10" */
  lastClass: string;
  /** YYYY-MM-DD */
  issuedOn: string;
};
export type TcIssued = { certificates: TransferCertificate[] };

export type GalleryPhoto = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  album: string;
  width: number;
  height: number;
  draft?: boolean;
};
export type Gallery = { photos: GalleryPhoto[] };

export type MediaItem = { title: string; outlet: string; date: string; url: string };
export type InMedia = { items: MediaItem[] };

export type CalendarEvent = { title: string; kind: "term" | "exam" | "holiday" | "event" };
export type AcademicCalendar = {
  draft: boolean;
  academicYear: string;
  note: string;
  months: { month: string; events: CalendarEvent[] }[];
};

export const fees: Fees = feesJson;
export const staff: Staff = staffJson;
export const tcIssued: TcIssued = tcJson;
export const gallery: Gallery = galleryJson;
export const inMedia: InMedia = mediaJson;
export const calendar: AcademicCalendar = calendarJson as AcademicCalendar;
