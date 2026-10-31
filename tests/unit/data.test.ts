import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { calendar, fees, gallery, inMedia, staff, tcIssued } from "@/lib/data";
import { facilities, stages } from "@/content/school";
import { stageDetails } from "@/content/academics";
import { facilityDetails } from "@/content/campus";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

describe("content data files", () => {
  it("has a detail entry for every stage and facility", () => {
    for (const s of stages) expect(stageDetails[s.slug], s.slug).toBeDefined();
    for (const f of facilities) expect(facilityDetails[f.id], f.id).toBeDefined();
  });

  it("points every gallery photo at a file in /public with alt text", () => {
    for (const p of gallery.photos) {
      expect(p.src.startsWith("/"), p.src).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", p.src)), p.src).toBe(true);
      expect(p.alt.length, p.src).toBeGreaterThan(10);
      expect(p.width).toBeGreaterThan(0);
      expect(p.height).toBeGreaterThan(0);
    }
    expect(new Set(gallery.photos.map((p) => p.src)).size).toBe(gallery.photos.length);
  });

  it("uses ISO dates and unique numbers for transfer certificates", () => {
    for (const c of tcIssued.certificates) expect(c.issuedOn).toMatch(ISO);
    const numbers = tcIssued.certificates.map((c) => c.tcNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("uses ISO dates and https links for media coverage", () => {
    for (const m of inMedia.items) {
      expect(m.date).toMatch(ISO);
      expect(m.url).toMatch(/^https:\/\//);
    }
  });

  it("covers every class from LKG to 12 in the fee table", () => {
    const text = fees.byClass.map((r) => r.classes).join(" ");
    for (const label of ["LKG", "UKG", "1 to 5", "6 to 8", "9 and 10", "11 and 12"]) expect(text).toContain(label);
  });

  it("gives every calendar month at least one event", () => {
    expect(calendar.months.length).toBeGreaterThanOrEqual(10);
    for (const m of calendar.months) expect(m.events.length, m.month).toBeGreaterThan(0);
  });

  it("gives every staff member a name and role", () => {
    for (const m of staff.members) {
      expect(m.name.trim()).not.toBe("");
      expect(m.role.trim()).not.toBe("");
    }
  });
});
