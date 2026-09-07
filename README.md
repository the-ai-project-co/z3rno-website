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
