import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const base = "/z3rno-website";
const origin = `https://the-ai-project-co.github.io${base}`;
const routes = [
  "/",
  "/docs",
  "/docs/architecture",
  "/docs/cli",
  "/docs/install",
  "/docs/mcp",
  "/docs/sdk",
  "/progress",
];

for (const route of routes) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const html = readFileSync(join("out", file), "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"\/>/g) ?? [];
  assert.deepEqual(canonical, [`<link rel="canonical" href="${origin}${route}"/>`], file);

  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (href.startsWith("/")) {
      assert.ok(href === base || href.startsWith(`${base}/`), `${file}: ${href}`);
    }
  }
}

console.log(`Checked canonical URLs and internal links for ${routes.length} exported routes.`);
