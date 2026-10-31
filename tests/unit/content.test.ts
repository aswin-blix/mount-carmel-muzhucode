import { describe, expect, it } from "vitest";
import { facilities, milestones, school, stages } from "@/content/school";
import { allStaticRoutes, navigation } from "@/content/navigation";

describe("school content", () => {
  it("lists milestones in chronological order, starting at the founding year", () => {
    const years = milestones.map((m) => m.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(years[0]).toBe(school.founded);
  });

  it("dates each stage to a milestone year, or to none when no source gives one", () => {
    const years = new Set(milestones.map((m) => m.year));
    for (const s of stages) if (s.since !== null) expect(years).toContain(s.since);
    expect(stages.find((s) => s.slug === "pre-primary")?.since).toBeNull();
  });

  it("has unique facility ids", () => {
    const ids = facilities.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses a dialable phone link that matches the displayed number", () => {
    const digits = school.phone.replace(/\D/g, "").replace(/^0/, "");
    expect(school.phoneHref).toBe(`tel:+91${digits}`);
  });

  it("uses well-formed internal links in the navigation", () => {
    for (const group of navigation) {
      expect(group.href).toMatch(/^\/[a-z-]*(\/[a-z-]+)*$/);
      for (const c of group.children) expect(c.href).toMatch(/^\/[a-z-]*(\/[a-z-]+)*$/);
    }
  });

  it("lists every stage and facility page among the static routes", () => {
    const routes = allStaticRoutes();
    for (const s of stages) expect(routes).toContain(`/academics/${s.slug}`);
    for (const f of facilities) expect(routes).toContain(`/campus/${f.id}`);
    expect(new Set(routes).size).toBe(routes.length);
  });
});
