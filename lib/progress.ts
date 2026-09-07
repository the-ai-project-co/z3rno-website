// The build-in-public log shown at /progress. One entry per slice (plus the
// occasional unplanned pass, like the design iteration below) — added as
// part of that slice's own website-update step, not backfilled after the
// fact. Newest first.

export type ProgressLink = { label: string; href: string };

export type ProgressEntry = {
  tag: string;
  title: string;
  date: string;
  summary: string;
  decisions?: string[];
  links: ProgressLink[];
  note?: string;
};

const Z = "https://github.com/the-ai-project-co/z3rno";
const ZW = "https://github.com/the-ai-project-co/z3rno-website";

export const PROGRESS_ENTRIES: ProgressEntry[] = [
  {
    tag: "0003",
    title: "Core engine + embedded backend",
    date: "2026-09-07",
    summary:
      "The zero-infra default is now real, not scaffolding: a MemoryEngine with store/recall/forget plus an append-only, hash-chained audit log, running against SQLite, an embedded vector index, and an embedded graph. 19 tests, including a full store → recall → forget cycle covering all four memory tiers (working, episodic, semantic, procedural).",
    decisions: [
      "Temporal/SCD-2 versioning stays a production-backend concern, not the embedded default — the hash-chained audit log is the actual “what changed and when” guarantee, matching what's already promised on this site.",
      "hnsw_rs picked over instant-distance for the vector index: it supports incremental insert, the latter is build-once with no documented delete.",
      "petgraph's StableDiGraph for the embedded graph — plain Graph silently invalidates other stored node indices on removal, StableGraph doesn't.",
      "Known gap, filed rather than shipped silently: the embedded graph has no persistence across a process restart.",
    ],
    links: [
      { label: "z3rno #9", href: `${Z}/pull/9` },
      { label: "z3rno #8 (gap)", href: `${Z}/issues/8` },
      { label: "z3rno-website #8", href: `${ZW}/pull/8` },
    ],
  },
  {
    tag: "0002",
    title: "Production backend evaluation spike",
    date: "2026-09-07",
    summary:
      "A six-criterion rubric was written before any candidate was touched. Three production-backend candidates got real, working Rust proof-of-concepts against live Docker instances — Postgres+pgvector+Apache AGE, SurrealDB, and Neo4j+Qdrant — each store-one/recall-one/traverse-one, each with an actual attempt to breach multi-tenant isolation rather than assume it holds.",
    decisions: [
      "Neo4j+Qdrant ruled out on evidence: Neo4j Community can't run multiple databases (Enterprise-only), and a search that simply omitted the tenant filter on Qdrant returned another tenant's data.",
      "SurrealDB passed isolation as cleanly as Postgres RLS, but its license (Business Source License, converts to Apache-2.0 after a delay) left an open question Postgres didn't need answered.",
      "cognee's own Rust rewrite doesn't actually use Neo4j or Qdrant at all — corrected before scoring, since “diversity like cognee” was this spike's original motivation.",
      "Decision: Postgres + pgvector + Apache AGE is what slice 0004 builds against.",
    ],
    links: [
      { label: "z3rno #5", href: `${Z}/pull/5` },
      { label: "z3rno-website #6", href: `${ZW}/pull/6` },
    ],
  },
  {
    tag: "design",
    title: "Website design pass",
    date: "2026-09-07",
    summary:
      "Direct feedback that the first landing page “looked like slop” led to a real pass: bigger hero type scale, ambient depth, an actual architecture diagram and roadmap section. A screenshot then caught a real bug — terminal code text clipping past the card edge — fixed the same day. The stylesheet was later migrated from plain CSS to Tailwind CSS v4.",
    decisions: [
      "Kept the existing CSS custom-property token system, sourced from z3rno-brand-assets, as the single source of truth — mapped into Tailwind's generated utilities rather than inventing a second palette.",
    ],
    links: [
      { label: "z3rno-website #3", href: `${ZW}/pull/3` },
      { label: "z3rno-website #4", href: `${ZW}/pull/4` },
      { label: "z3rno-website #5", href: `${ZW}/pull/5` },
    ],
    note: "Not a numbered slice — an unplanned pass driven directly by user feedback.",
  },
  {
    tag: "0001",
    title: "Monorepo bootstrap",
    date: "2026-09-07",
    summary:
      "The Cargo workspace (engine/server/cli), Python (PyO3) and TypeScript (napi-rs) binding scaffolds, and a CI skeleton landed in one PR. The website launched alongside it — first landing page, brand assets wired in, GitHub Pages deploy pipeline.",
    decisions: [
      "Branch protection with named CI status checks was set up before the first PR, so every slice since has used GitHub's native auto-merge — no manual merge step.",
      "napi-rs auto-generates index.js/index.d.ts glue files — real committed JavaScript, not a hand-authored SDK (that's a later slice) — marked linguist-generated so it stopped skewing the repo's reported language mix.",
    ],
    links: [
      { label: "z3rno #2", href: `${Z}/pull/2` },
      { label: "z3rno #3", href: `${Z}/pull/3` },
      { label: "z3rno-website #2", href: `${ZW}/pull/2` },
    ],
  },
  {
    tag: "0000",
    title: "Deprecate the old six-repo stack",
    date: "2026-09-07",
    summary:
      "The previous z3rno stack shipped as six separately-published Python repos, hard-wired to a single Postgres deployment. Deprecated across PyPI, npm, and GHCR. All thirteen old repos archived on GitHub except z3rno-brand-assets, which stays active as the ongoing source of brand truth.",
    decisions: [
      "PyPI has no metadata-only deprecate flag — required an actual version bump just to update the published description; npm's own npm deprecate handled that in place.",
    ],
    links: [],
    note: "No PRs to link — this happened to the old repos before this monorepo existed.",
  },
];
