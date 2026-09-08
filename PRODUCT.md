# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both technical:
- **Individual developers** building AI agents who need persistent memory, evaluating z3rno to embed directly into their own agent, weighing it against alternatives on its own merits.
- **Enterprise/platform teams** evaluating z3rno as infrastructure — a production backend with multi-tenant isolation guarantees they can deploy behind their own agent platform.

No further narrowing confirmed yet (e.g. specific industries, team sizes) — keep copy legible to both a solo dev skimming and an engineering lead doing technical due diligence, rather than picking one persona's voice.

## Product Purpose

z3rno is an open-source memory engine for AI agents: persistent memory across sessions via four operations (`store`, `recall`, `forget`, `audit`), across four memory tiers (working, episodic, semantic, procedural), queryable as vectors, a knowledge graph, or both. Success for the *site* right now (pre-v1.0.0) is honest, credible communication of what's actually shipped and why the architecture is built the way it is — not conversion, since nothing is installable yet.

## Positioning

- **Embeddable by default, zero required infrastructure** — runs embedded (SQLite + embedded vector index + embedded graph store) out of the box, pluggable to a production backend (Postgres + pgvector + Apache AGE) when needed. A neighboring product that hard-wires to one production datastore from day one could not truthfully claim this.
- **Native bindings, not a thin HTTP client** — Python (PyO3) and TypeScript (napi-rs) bindings compile the actual Rust engine; the SDK *is* the engine.
- **Rust core, rewritten from a Python predecessor** for speed and a single monorepo instead of six separately-published repos.
- Standing rule: never name any specific third-party product anywhere in this repository (site copy, code, commits, docs) — structural/craft research may inform this positioning as prior art, but the source is never named.

## Operating Context

- Pre-v1.0.0: no packages published yet (no PyPI/npm/crates.io/GHCR release). The site must represent this honestly — no install CTAs that don't work, no implied general availability.
- Development ships slice-by-slice against `_plan_docs/` in the `z3rno` repo; the website is updated after each slice ships — both landing-page copy and a real entry on `/progress` (a chronological build-in-public changelog with real decisions/tradeoffs and PR/issue links, added specifically because early slices shipped real engineering work with no visible site change).
- Site currently has two pages: landing (`/`) and `/progress`. More pages are anticipated as the product matures (this pass should leave room for that rather than treating two pages as the permanent shape of the site).
- Hosted on GitHub Pages via Next.js static export — no server runtime available to any page.

## Capabilities and Constraints

- Framework: Next.js (App Router), `output: "export"`, deployed to GitHub Pages under a `/z3rno-website` basePath — every internal link must resolve correctly under that basePath (a real bug already hit once: raw `<a>` tags don't get Next's automatic basePath rewriting the way `<Link>` does).
- Styling: Tailwind CSS v4, CSS-first config (`@theme inline`) over brand tokens pulled from `z3rno-brand-assets` — no server-rendered personalization, no backend-driven content.
- Content must stay truthful to actual shipped state — no fabricated metrics, testimonials, customer logos, or benchmark numbers (none exist yet; this is a pre-launch open-source project).

## Brand Commitments

- All colors, themes, logos, and other brand assets come from the `z3rno-brand-assets` repo — the sole source of truth. Nothing brand-related is hardcoded or duplicated here.
- A comparable product's live site was studied for structural/craft lessons only — its palette, typography, and branding are explicitly off-limits as a source, and it is never named anywhere in this repository.
- Scope for this redesign pass is confirmed as **extension**: preserve the current visual identity (z3rno's palette, mood, current accurate copy) and elevate craft/structure, not a ground-up visual replacement.

## Evidence on Hand

- Real GitHub repos (`z3rno`, `z3rno-website`, `z3rno-brand-assets`), real merged PRs and issues, real `/progress` entries per shipped slice, real architecture (documented in `z3rno`'s README and `_decision_docs`/`_plan_docs`).
- No customer testimonials, case studies, press, or usage metrics exist — none should be invented or implied.

## Product Principles

1. Honest-status-first: the site must never claim more readiness than what's actually shipped, since nothing is installable yet — this outranks persuasive polish.
2. Build-in-public as a real feature, not a slogan: `/progress` exists because prior slices shipped real work invisibly; every future slice's website step must keep it substantive.
3. Zero-infra-by-default, pluggable-when-needed is the core technical differentiator and should stay legible on the landing page, not buried under generic AI-agent marketing language.
4. Speak to both a solo developer and an enterprise technical evaluator in the same copy — don't fork the site into two audience tracks yet.
5. Borrow structural craft, never brand — outside research may inform layout/information-architecture thinking, never palette, typography, or naming.

## Accessibility & Inclusion

No product-specific requirement established yet beyond standard web accessibility practice (semantic HTML, sufficient contrast, keyboard navigability) — treat as the applicable baseline, not a confirmed custom requirement.
