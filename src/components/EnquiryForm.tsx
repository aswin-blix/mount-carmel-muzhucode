"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLASS_OPTIONS, type EnquiryErrors } from "@/lib/enquiry";
import { school } from "@/content/school";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const FIELD_ORDER: (keyof EnquiryErrors)[] = ["parentName", "phone", "childName", "classApplying", "message"];

const field =
  "mt-2 w-full rounded-2xl border border-forest/25 bg-paper px-4 py-3 text-forest placeholder:text-ink-muted/60 focus:border-forest focus:outline-none focus-visible:outline-gold aria-[invalid=true]:border-red-700";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<EnquiryErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; errors?: EnquiryErrors; error?: string };
      if (json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        // Move focus to the first field that needs fixing.
        const first = FIELD_ORDER.find((k) => json.errors?.[k]);
        if (first) requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
        setStatus({ kind: "error", message: "Check the highlighted fields and send again." });
        return;
      }
      setStatus({ kind: "error", message: json.error ?? `Your enquiry was not sent. Please call ${school.phone}.` });
    } catch {
      setStatus({
        kind: "error",
        message: `Your enquiry was not sent. Check your connection or call ${school.phone}.`,
      });
    }
  }

  const err = (name: keyof EnquiryErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">
        {errors[name]}
      </p>
    ) : null;

  const aria = (name: keyof EnquiryErrors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const label = (name: keyof EnquiryErrors, text: React.ReactNode) => (
    <label htmlFor={`enquiry-${name}`} className="font-medium">
      {text}
    </label>
  );
  const control = (name: keyof EnquiryErrors) => ({
    id: `enquiry-${name}`,
    name,
    className: field,
    ...aria(name),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-label="Admission enquiry">
      <div>
        {label("parentName", <>Parent or guardian&apos;s name</>)}
        <input autoComplete="name" required {...control("parentName")} />
        {err("parentName")}
      </div>
      <div>
        {label("phone", "Phone number")}
        <input type="tel" inputMode="tel" autoComplete="tel" required placeholder="98765 43210" {...control("phone")} />
        {err("phone")}
      </div>
      <div>
        {label("childName", <>Child&apos;s name</>)}
        <input required {...control("childName")} />
        {err("childName")}
      </div>
      <div>
        {label("classApplying", "Applying for")}
        <select required defaultValue="" {...control("classApplying")}>
          <option value="" disabled>
            Choose a class
          </option>
          {CLASS_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {err("classApplying")}
      </div>
      <div className="sm:col-span-2">
        {label(
          "message",
          <>
            Anything else? <span className="font-normal text-ink-muted">(optional)</span>
          </>,
        )}
        <textarea rows={4} {...control("message")} />
        {err("message")}
      </div>
      {/* Honeypot for bots; hidden from people and assistive tech */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-forest disabled:opacity-60">
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <div aria-live="polite" className="min-h-6">
          <AnimatePresence mode="wait">
            {status.kind === "sent" && (
              <motion.p
                key="sent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-medium text-leaf"
              >
                Enquiry sent. The school office will call you back.
              </motion.p>
            )}
            {status.kind === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-medium text-red-700"
              >
                {status.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
