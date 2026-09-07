# z3rno-website

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The marketing and documentation site for [z3rno](https://github.com/the-ai-project-co/z3rno), built with Next.js (static export) and deployed to GitHub Pages.

## Brand assets

All colors, themes, logos, and other brand assets used on this site come from [z3rno-brand-assets](https://github.com/the-ai-project-co/z3rno-brand-assets) — nothing brand-related is hardcoded or duplicated in this repo. Pull that repo in as a source of truth before styling anything.

## Stack

- **Framework:** Next.js, static export (`next export`-style output) for GitHub Pages compatibility — no server runtime.
- **Hosting:** GitHub Pages, built and deployed via GitHub Actions on merge to `main`.
- **Content:** kept in sync with the main [z3rno](https://github.com/the-ai-project-co/z3rno) repo — after each shipped slice, this site is updated to reflect it.

## Status

Scaffold stage — no pages yet. Structure and initial design lands in an upcoming slice.

## Local development

Setup instructions land once the Next.js scaffold is in place.

## License

Apache License 2.0 — see [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All commits must be signed off per [DCO.md](DCO.md).
