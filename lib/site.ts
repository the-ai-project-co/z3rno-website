// Static values shared across the site. basePath mirrors next.config.ts —
// hardcoded rather than derived because GitHub Pages project-path deploys
// don't change at runtime.
export const BASE_PATH = "/z3rno-website";
export const GITHUB_URL = "https://github.com/the-ai-project-co/z3rno";
export const SITE_URL = `https://the-ai-project-co.github.io${BASE_PATH}`;

export function canonicalUrl(path: `/${string}`) {
  return `${SITE_URL}${path}`;
}
