#!/usr/bin/env node
/**
 * Lists every piece of draft content still waiting for the school's confirmation.
 * Usage: npm run drafts
 *
 * Looks for `draft: true` (TypeScript), `"draft": true` (JSON) and
 * `draft: true` front matter (Markdown) under src/content.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src", "content");
const pattern = /(^|[\s{,])"?draft"?\s*:\s*true\b/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

let total = 0;
for (const file of walk(root).sort()) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const hits = lines.flatMap((line, i) => (pattern.test(line) ? [i + 1] : []));
  if (hits.length === 0) continue;
  total += hits.length;
  console.log(`${path.relative(process.cwd(), file)}  (${hits.length})  lines ${hits.join(", ")}`);
}

console.log(total === 0 ? "\nNo draft content left." : `\n${total} draft block(s) to confirm with the school.`);
