export const CLASS_OPTIONS = [
  "LKG",
  "UKG",
  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
] as const;

export type Enquiry = {
  parentName: string;
  phone: string;
  childName: string;
  classApplying: (typeof CLASS_OPTIONS)[number];
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export type ValidationResult =
  | { ok: true; data: Enquiry }
  | { ok: false; errors: EnquiryErrors };

const MAX = { name: 80, message: 1000 };

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Indian mobile or landline: 10 digits (optionally +91 / 0 prefix). */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const m = digits.match(/^(?:\+91|91|0)?(\d{10})$/);
  return m ? m[1] : null;
}

export function validateEnquiry(input: unknown): ValidationResult {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: EnquiryErrors = {};

  const parentName = str(src.parentName);
  const childName = str(src.childName);
  const message = str(src.message);
  const classApplying = str(src.classApplying);
  const phone = normalisePhone(str(src.phone));

  if (!parentName) errors.parentName = "Enter the parent or guardian's name.";
  else if (parentName.length > MAX.name) errors.parentName = `Keep the name under ${MAX.name} characters.`;

  if (!childName) errors.childName = "Enter your child's name.";
  else if (childName.length > MAX.name) errors.childName = `Keep the name under ${MAX.name} characters.`;

  if (!phone) errors.phone = "Enter a 10-digit phone number, for example 98765 43210.";

  if (!(CLASS_OPTIONS as readonly string[]).includes(classApplying))
    errors.classApplying = "Choose the class you are applying for.";

  if (message.length > MAX.message) errors.message = `Keep the message under ${MAX.message} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      parentName,
      childName,
      phone: phone!,
      classApplying: classApplying as Enquiry["classApplying"],
      message,
    },
  };
}

/** Stops spreadsheet apps from treating a value as a formula (=, +, -, @ prefixes). */
export function neutraliseFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
