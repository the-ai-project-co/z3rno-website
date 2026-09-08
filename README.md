# z3rno-website

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The marketing and documentation site for [z3rno](https://github.com/the-ai-project-co/z3rno), built with Next.js (static export) and deployed to GitHub Pages.

## Brand assets

All colors, themes, logos, and other brand assets used on this site come from [z3rno-brand-assets](https://github.com/the-ai-project-co/z3rno-brand-assets) — nothing brand-related is hardcoded or duplicated in this repo. Pull that repo in as a source of truth before styling anything.

## Stack

- **Framework:** Next.js (App Router), static export (`output: 'export'`) for GitHub Pages compatibility — no server runtime.
- **Styling:** Tailwind CSS v4, CSS-first config (`@theme inline`) over the brand tokens from `z3rno-brand-assets`.
- **Hosting:** GitHub Pages, built and deployed via GitHub Actions on merge to `main` — live at https://the-ai-project-co.github.io/z3rno-website/.
- **Content:** kept in sync with the main [z3rno](https://github.com/the-ai-project-co/z3rno) repo — after each shipped slice, this site is updated to reflect it.

## Status

Live, pre-v1.0.0 launch. Landing page covers the product pitch, architecture, roadmap, and honest pre-launch install status — no packages are published yet.

**Shipped so far:**

- **Slice 0001 — Website launch.** Landing page, brand assets wired in, GitHub Pages deploy pipeline.
- Design pass (hero, architecture diagram, roadmap sections), a terminal-overflow fix, and a Tailwind CSS v4 migration.
- **Slice 0002 follow-up.** Architecture/pillar/roadmap copy updated to name the actual production backend decided in that slice (Postgres + pgvector + Apache AGE).
- **Slice 0003 follow-up.** Roadmap and status copy updated to reflect the working embedded engine (store/recall/forget/audit) that slice shipped, replacing "Cargo workspace skeleton and binding scaffolds."
- **`/progress` page.** A chronological, build-in-public log of what each slice actually shipped — real decisions and tradeoffs, real PR/issue links — added directly in response to feedback that the site had stayed a single landing page through several slices of real engineering work. Updating it is now part of every slice's website-update step, alongside landing-page copy.
- **Slice 0004 follow-up.** Roadmap and status copy updated for the production backend (Postgres + pgvector + Apache AGE), which now sits alongside the embedded backend rather than being a "Next" item.
- **Header basePath fix.** The header's "How it works"/"Status" links were dropping the GitHub Pages basePath when navigating from `/progress` back to the landing page anchors — fixed.
- **Craft pass.** Landing + `/progress` run through the `impeccable` design skill, informed structurally (never visually — same brand/palette throughout) by studying cognee.ai's live site (`_research_refs/cognee-website/` in the `z3rno` repo). Removed the eyebrow-label pattern above every heading, added a developer-facing adoption-ladder section distinct from the Roadmap, and reworked the "How it works" pillars into a proof-line list with real, falsifiable evidence per claim.
- **Header rebuild.** Fixed three issues flagged after review: no mobile-nav collapse (replaced an ad hoc `hidden sm:inline` on a single link with a real hamburger panel below `md`), a redundant icon+wordmark logo lockup (now wordmark-only, matching the footer), and a plain-color-only nav hover (now a grown-in accent underline).
- **Header nav treatment.** Explored 35 systematic variants (a 7×5 matrix) in a comparison artifact and shipped the one picked: a bordered pill capsule of `$`-prefixed command-style labels, a blinking terminal caret, and an icon-only GitHub button.
- **Hero tagline.** Replaced "The memory engine your agents run inside, not around." with "Persistent memory for AI agents, compiled into your process." — the old line relied on wordplay instead of stating the mechanism.
- **Slice 0005 entry.** `/progress` updated for the `z3rno-server` crate: routes, auth, cross-tenant budget admin, and observability, including the closed health-check gap.
- **Slice 0006 entry.** `/progress` updated for the real Python (PyO3) and TypeScript (napi-rs) bindings over `z3rno-engine`, the sync/async split resolved per language, and the multi-platform release pipeline.
- **Bolder structural pass.** Shell widened 1120px → 1320px, hero H1 grew to a 5.75rem clamp ceiling, major panel radius doubled (16px → 28px), and a new "One engine, called three ways" section shows a real, verified `store()` call side by side in Rust/Python/TypeScript — all spatial/structural, brand colors and logo untouched.
- **Slice 0007 entry.** `/progress` updated for the real `z3rno-cli` binary (init/serve/store/recall/forget) and four real distribution pipelines (crates.io, npm, GHCR, supply-chain provenance) — no publish credentials configured yet.
- **Slice 0008 entry.** `/progress` updated for the Python MCP server (`FastMCP` over stdio, four tools over a real `z3rno` client) and the three independent eval harnesses (Rust, Python, TypeScript) scoring recall@k/MRR/faithfulness/latency against one shared golden dataset.
- **Slice 0009 entry.** `/progress` updated for `z3rno-starter-kit`, five worked examples over the real bindings surface, redesigned around what the new engine actually offers rather than mechanically ported from the pre-rewrite version.

## Local development

```bash
npm install
npm run dev      # local dev server
npm run build    # static export to out/
npm run lint
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All commits must be signed off per [DCO.md](DCO.md).
