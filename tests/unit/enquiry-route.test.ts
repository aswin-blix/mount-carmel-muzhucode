// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/enquiry/route";

const valid = {
  parentName: "Mary Joseph",
  phone: "9876543210",
  childName: "Anna",
  classApplying: "Class 3",
  message: "Bus route from Arumanai?",
};

function req(body: unknown, { raw = false, headers = {} }: { raw?: boolean; headers?: Record<string, string> } = {}) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

describe("POST /api/enquiry", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(req("{not json", { raw: true }));
    expect(res.status).toBe(400);
  });

  it("rejects non-JSON content types with 415", async () => {
    const res = await POST(req("parentName=x", { raw: true, headers: { "content-type": "text/plain" } }));
    expect(res.status).toBe(415);
  });

  it("rejects cross-origin posts with 403", async () => {
    const res = await POST(req(valid, { headers: { origin: "https://evil.example" } }));
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts posts from the same origin or the forwarded host", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    fetchMock.mockResolvedValue(new Response("ok"));
    expect((await POST(req(valid, { headers: { origin: "http://localhost" } }))).status).toBe(200);
    const proxied = req(valid, { headers: { origin: "https://school.example", "x-forwarded-host": "school.example" } });
    expect((await POST(proxied)).status).toBe(200);
  });

  it("rejects bodies over 8 KB with 413", async () => {
    const res = await POST(req({ ...valid, message: "m".repeat(9000) }));
    expect(res.status).toBe(413);
  });

  it("returns 422 with field errors for invalid data", async () => {
    const res = await POST(req({ ...valid, phone: "123" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.errors.phone).toMatch(/10-digit/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently accepts and drops honeypot submissions", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    const res = await POST(req({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 503 and points to the phone when no webhook is configured", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toMatch(/04651 287 977/);
  });

  it("forwards a valid enquiry to the webhook", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    fetchMock.mockResolvedValue(new Response("ok", { status: 200 }));
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://hooks.example.test/x");
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({ ...valid, source: "website" });
    expect(sent.receivedAt).toBeTypeOf("string");
  });

  it("neutralises spreadsheet formulas and sets a timeout on the webhook call", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    fetchMock.mockResolvedValue(new Response("ok"));
    await POST(req({ ...valid, parentName: "=HYPERLINK(\"x\")", message: "+1 more" }));
    const [, init] = fetchMock.mock.calls[0];
    const sent = JSON.parse(init.body);
    expect(sent.parentName).toBe("'=HYPERLINK(\"x\")");
    expect(sent.message).toBe("'+1 more");
    expect(sent.childName).toBe("Anna");
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("returns 502 when the webhook fails", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));
    const res = await POST(req(valid));
    expect(res.status).toBe(502);
  });

  it("returns 502 when the webhook is unreachable", async () => {
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "https://hooks.example.test/x");
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const res = await POST(req(valid));
    expect(res.status).toBe(502);
  });
});
