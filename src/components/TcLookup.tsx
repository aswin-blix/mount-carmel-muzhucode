"use client";

import { useId, useState } from "react";
import type { TransferCertificate } from "@/lib/data";
import { formatDate } from "@/lib/format";

/** Searchable table of transfer certificates issued (by TC number or name). */
export function TcLookup({ certificates }: { certificates: TransferCertificate[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const rows = q
    ? certificates.filter((c) => c.tcNumber.toLowerCase().includes(q) || c.studentName.toLowerCase().includes(q))
    : certificates;

  return (
    <div>
      <label htmlFor={inputId} className="font-medium">
        Search by TC number or student name
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-2 block w-full max-w-md rounded-2xl border border-forest/25 bg-paper px-4 py-3 focus:border-forest focus:outline-none"
      />
      <p aria-live="polite" className="mt-3 text-sm text-ink-muted">
        {rows.length} {rows.length === 1 ? "certificate" : "certificates"} shown
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left">
          <thead className="border-b-2 border-forest text-sm text-ink-muted">
            <tr>
              <th scope="col" className="py-3 pr-6 font-semibold">
                TC number
              </th>
              <th scope="col" className="py-3 pr-6 font-semibold">
                Student
              </th>
              <th scope="col" className="py-3 pr-6 font-semibold">
                Last class
              </th>
              <th scope="col" className="py-3 font-semibold">
                Issued on
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/10">
            {rows.map((c) => (
              <tr key={c.tcNumber}>
                <td className="py-3 pr-6 font-medium tabular-nums">{c.tcNumber}</td>
                <td className="py-3 pr-6">{c.studentName}</td>
                <td className="py-3 pr-6">{c.lastClass}</td>
                <td className="py-3">
                  <time dateTime={c.issuedOn}>{formatDate(c.issuedOn)}</time>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-ink-muted">
                  No certificate matches “{query.trim()}”. Check the number on the certificate, or call the school
                  office.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
