# Contributing to z3rno-website

## Developer Certificate of Origin

Every commit must be signed off:

```bash
git commit -s -m "your commit message"
```

See [DCO.md](DCO.md) for the full text.

## Workflow

1. Branch from `main`.
2. Make your change. Keep pull requests scoped to one page/section/fix.
3. Ensure CI (build + lint) passes.
4. Open a PR against `main` using the PR template.
5. Once CI is green, the PR merges automatically (auto-merge is enabled on this repo).

## Brand assets

Never hardcode colors, fonts, or logos here — pull them from [z3rno-brand-assets](https://github.com/the-ai-project-co/z3rno-brand-assets). If something you need isn't there yet, add it to that repo first, in a separate PR.

## Code of Conduct

Participation in this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).
