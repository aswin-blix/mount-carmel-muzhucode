import { describe, expect, it } from "vitest";
import { neutraliseFormula, normalisePhone, validateEnquiry } from "@/lib/enquiry";

const valid = {
  parentName: "  Mary Joseph ",
  phone: "+91 98765-43210",
  childName: "Anna",
  classApplying: "LKG",
  message: "",
};

describe("normalisePhone", () => {
  it.each([
    ["9876543210", "9876543210"],
    ["+91 98765 43210", "9876543210"],
    ["09876543210", "9876543210"],
    ["04651 287977", "4651287977"],
    ["(0465) 128-7977", "4651287977"],
  ])("accepts %s", (input, expected) => {
    expect(normalisePhone(input)).toBe(expected);
  });

  it.each(["", "12345", "98765432101", "abcdefghij", "+1 9876543210"])("rejects %j", (input) => {
    expect(normalisePhone(input)).toBeNull();
  });
});

describe("validateEnquiry", () => {
  it("accepts a complete enquiry and trims / normalises values", () => {
    const r = validateEnquiry(valid);
    expect(r).toEqual({
      ok: true,
      data: { parentName: "Mary Joseph", phone: "9876543210", childName: "Anna", classApplying: "LKG", message: "" },
    });
  });

  it("reports every missing required field", () => {
    const r = validateEnquiry({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(["childName", "classApplying", "parentName", "phone"]);
    }
  });

  it("rejects non-object input without throwing", () => {
    expect(validateEnquiry(null).ok).toBe(false);
    expect(validateEnquiry("hello").ok).toBe(false);
    expect(validateEnquiry(42).ok).toBe(false);
  });

  it("rejects a class that is not offered", () => {
    const r = validateEnquiry({ ...valid, classApplying: "Class 13" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.classApplying).toBeDefined();
  });

  it("accepts every offered class", () => {
    for (const c of ["UKG", "Class 1", "Class 12"]) {
      expect(validateEnquiry({ ...valid, classApplying: c }).ok).toBe(true);
    }
  });

  it("enforces length limits at the boundary", () => {
    expect(validateEnquiry({ ...valid, parentName: "a".repeat(80) }).ok).toBe(true);
    expect(validateEnquiry({ ...valid, parentName: "a".repeat(81) }).ok).toBe(false);
    expect(validateEnquiry({ ...valid, message: "m".repeat(1000) }).ok).toBe(true);
    expect(validateEnquiry({ ...valid, message: "m".repeat(1001) }).ok).toBe(false);
  });

  it("treats non-string values as empty", () => {
    const r = validateEnquiry({ ...valid, parentName: 123, childName: ["x"] });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.parentName).toBeDefined();
      expect(r.errors.childName).toBeDefined();
    }
  });
});

describe("neutraliseFormula", () => {
  it.each(["=SUM(A1)", "+91", "-1", "@cmd", "\tx"])("prefixes %j with an apostrophe", (v) => {
    expect(neutraliseFormula(v)).toBe(`'${v}`);
  });
  it.each(["Mary", "", "Class 3 = good"])("leaves %j alone", (v) => {
    expect(neutraliseFormula(v)).toBe(v);
  });
});
