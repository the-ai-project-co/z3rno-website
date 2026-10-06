/** Docs hub cards are the public index of the implemented documentation routes. */
export const DOC_CATEGORIES = [
  {
    href: "/docs/sdk",
    title: "SDK / Bindings",
    body: "Python and TypeScript Client usage, error semantics, and the Postgres backend opt-in.",
  },
  {
    href: "/docs/cli",
    title: "CLI Reference",
    body: "All five z3rno subcommands, flag tables, and the naive local embedding fallback.",
  },
  {
    href: "/docs/mcp",
    title: "MCP Setup",
    body: "Claude Desktop / Cursor config, the four exposed tools, and local dev setup.",
  },
  {
    href: "/docs/architecture",
    title: "Architecture",
    body: "The full store / recall / forget / audit data flow across all three backends.",
  },
] as const;
