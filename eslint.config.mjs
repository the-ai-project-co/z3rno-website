import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Worktrees and generated artifacts are separate checkouts, not site source.
const eslintConfig = [
  { ignores: [".worktree/**", ".impeccable/**", ".codebase-memory/**", "out/**"] },
  ...nextCoreWebVitals,
];

export default eslintConfig;
