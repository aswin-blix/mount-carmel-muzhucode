import { neutraliseFormula, validateEnquiry, type Enquiry } from "@/lib/enquiry";
import { school } from "@/content/school";

/**
 * Receives admission enquiries from the site form.
 *
 * Delivery is configured with ENQUIRY_WEBHOOK_URL: the validated enquiry is
 * POSTed there as JSON (works with a Google Apps Script web app, Zapier, Make,
 * n8n or any endpoint that accepts JSON). Without it the endpoint answers 503
 * so the form tells parents to phone the office instead of silently dropping
 * data.
 *
 * Basic abuse protection: JSON only, same-origin only, small bodies, honeypot.
 * Add rate limiting at the host (e.g. a firewall rule) if spam becomes a problem.
 */

const MAX_BODY_BYTES = 8 * 1024;
const WEBHOOK_TIMEOUT_MS = 8000;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients and same-origin GETs may omit it
  try {
    const originHost = new URL(origin).host;
    // Behind a proxy request.url may carry an internal host, so also accept the forwarded host and the public URL.
    const hosts = [
      new URL(request.url).host,
      request.headers.get("x-forwarded-host"),
      request.headers.get("host"),
      process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : null,
    ];
    return hosts.includes(originHost);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return Response.json({ ok: false, error: "Send the form as JSON." }, { status: 415 });
  }
  if (!sameOrigin(request)) {
    return Response.json({ ok: false, error: "Enquiries must be sent from the school website." }, { status: 403 });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "The enquiry is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  const result = validateEnquiry(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      { ok: false, error: `Online enquiries are not switched on yet. Please call the office on ${school.phone}.` },
      { status: 503 },
    );
  }

  const d = result.data;
  const payload: Enquiry & { receivedAt: string; source: string } = {
    parentName: neutraliseFormula(d.parentName),
    phone: d.phone,
    childName: neutraliseFormula(d.childName),
    classApplying: d.classApplying,
    message: neutraliseFormula(d.message),
    receivedAt: new Date().toISOString(),
    source: "website",
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return Response.json(
      { ok: false, error: `Your enquiry could not be sent. Please call the office on ${school.phone}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
