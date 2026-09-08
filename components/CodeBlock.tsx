/** Shared code-block chrome for docs pages — the same bordered/rounded-2xl
 * card + label header the landing page already used inline (see its
 * INSTALLS grid and LANGS panels), extracted so five new docs pages don't
 * each reinvent it. `prompt` prefixes a single `$` (shell commands); omit
 * it for file contents, JSON, or multi-line snippets. */
export function CodeBlock({
  label,
  code,
  prompt = false,
}: {
  label?: string;
  code: string;
  prompt?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-subtle">
      {label && (
        <div className="border-b border-border px-4 py-3">
          <span className="text-[13px] text-text-dim">{label}</span>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4.5 font-mono text-[13px] leading-relaxed text-text-dim">
        {prompt && <span className="text-accent">$ </span>}
        {code}
      </pre>
    </div>
  );
}
