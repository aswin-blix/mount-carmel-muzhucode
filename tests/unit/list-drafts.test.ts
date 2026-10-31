// @vitest-environment node
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("npm run drafts", () => {
  it("lists draft blocks by file and line with a total", () => {
    const out = execFileSync(process.execPath, ["scripts/list-drafts.mjs"], { encoding: "utf8" });
    expect(out).toMatch(/src[\\/]content[\\/]about\.ts {2}\(\d+\) {2}lines \d+/);
    expect(out).toMatch(/src[\\/]content[\\/]news[\\/].+\.md/);
    expect(out).toMatch(/\d+ draft block\(s\) to confirm with the school\./);
    // Verified facts carry no draft flag of their own.
    expect(out).not.toMatch(/in-media\.json|tc-issued\.json/);
  });
});
