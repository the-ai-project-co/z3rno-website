---
name: z3rno
description: An embeddable memory engine for AI agents — dark-first, systems-product visual language.
colors:
  bg: "#0c0c0e"
  bg-subtle: "#1a1a1e"
  bg-card: "#27272a"
  text: "#ededed"
  text-dim: "#a1a1aa"
  accent: "#00d4aa"
  accent-text: "#04120f"
  border: "#3f3f46"
  border-strong: "#71717a"
  success: "#22c55e"
  error: "#ef4444"
  warning: "#fbbf24"
  purple: "#a78bfa"
  rose: "#fb7185"
typography:
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
  mono:
    fontFamily: "JetBrains Mono, 'SF Mono', Menlo, Consolas, monospace"
  headline:
    fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)"
    fontWeight: 600
    letterSpacing: "-0.02em"
rounded:
  pill: "9999px"
  panel: "28px"
  card: "16px"
spacing:
  shell-max-width: "1320px"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.pill}"
  card-secondary:
    backgroundColor: "{colors.bg-subtle}"
    rounded: "{rounded.card}"
  panel-major:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.panel}"
---

# Design System: z3rno

## Overview

**Creative North Star: "The Systems Terminal"**

z3rno's site reads as a working developer tool rendered as a webpage, not a marketing surface with code sprinkled on top. Dark is the resting state (light activates only when the OS explicitly prefers it, never a manual toggle) — a near-black ground, a single teal accent used sparingly, and JetBrains Mono standing in for anything that's real (commands, proof lines, data). Structure carries the persuasion: proof-line lists instead of icon cards, a real verified call shown in three languages side by side, an honest "this is genuinely early" section instead of manufactured urgency. Craft lessons were studied from a comparable product's structural patterns (never its palette, type, or branding — that boundary is load-bearing, not a style note) and adapted at a more restrained absolute scale (16–28px panel radii rather than that reference's 40px, a 1320px shell rather than 1340px) to keep a systems-product tone rather than importing a marketing site's proportions literally.

**Key Characteristics:**
- Near-black ground, one teal accent, used at low frequency
- JetBrains Mono for anything that is a real command, value, or proof — never decorative
- Full-pill buttons and nav; large, soft panel radii (16–28px) elsewhere
- Flat by default — borders separate content, not shadows; two deliberate glow exceptions (the hero terminal, the primary button) carry all the elevation the system uses
- No eyebrow/kicker labels above headings — removed deliberately once already; a heading carries its own weight

## Colors

A near-monochrome dark-first system (near-black ground, near-white text, mid-gray borders) with exactly one saturated color doing all the accent work.

### Primary
- **Signal Teal** (`#00d4aa` dark / `#009e7e` light): the one accent — links, proof lines, active states, the terminal's function-call highlighting, focus rings. Used at low frequency by design; its rarity is what makes it read as "real data" rather than decoration.

### Neutral
- **Void** (`#0c0c0e` dark / `#fafafa` light) — page background.
- **Subtle Panel** (`#1a1a1e` dark / `#e4e4e7` light) — secondary card/panel fill (code blocks, category cards, terminal chrome).
- **Card** (`#27272a` dark / `#ffffff` light) — the brightest surface, used sparingly.
- **Text** (`#ededed` dark / `#141414` light) — primary text.
- **Text Dim** (`#a1a1aa` dark / `#52525b` light) — secondary text, proof-line labels, body copy in dim contexts.
- **Border** (`#3f3f46` dark / `#d4d4d8` light) and **Border Strong** (`#71717a`, both themes) — the system's primary separator; most structure is drawn with borders, not shadows.

### Status (used only for genuine state, never as a second accent)
- **Success** `#22c55e` / `#166534` (light) — shipped/active states.
- **Warning** `#fbbf24` / `#92400e` (light) — "coming soon" badges, pre-launch status.
- **Error** `#ef4444` / unchanged in light — not yet exercised anywhere in shipped copy.
- **Purple** `#a78bfa` / `#6d28d9` (light) and **Rose** `#fb7185` / `#be123c` (light) — terminal syntax highlighting only (keyword / type tokens).

### Named Rules
**The One-Accent Rule.** Teal is the only saturated color the system spends on emphasis. Status colors exist for genuine state (success/warning), never as a second decorative accent.

## Typography

**Body/Display Font:** Inter (with the system sans stack as fallback)
**Mono Font:** JetBrains Mono (with SF Mono/Menlo/Consolas as fallback)

**Character:** A grotesk workhorse sans for prose and headings, paired with a genuinely monospaced face reserved exclusively for things that are literally code, commands, or measured values — never used as a "technical-looking" costume on prose.

### Hierarchy
- **Headline** (600 weight, `clamp(1.85rem, 3.2vw, 2.5rem)`, `-0.02em` tracking, `text-balance`): section and page H1/H2 — the shared `sectionHeading` className.
- **Body** (400 weight, ~15px, `text-dim` color for secondary copy): the shared `sectionLede` className and general prose.
- **Mono/Label** (JetBrains Mono, 11–13.5px, often `tracking-[0.06-0.07em]` + uppercase for column headers and status labels; unstyled at 13–14px for code/commands): the system's "this is real, not marketing copy" register.

### Named Rules
**The No-Kicker Rule.** No eyebrow/kicker label sits directly above a heading — removed once already from this site's history and reintroduced by mistake during this pass (caught and fixed before shipping). A heading states its own subject; a label above it is a tell, not a hierarchy device. The one narrow exception the system already keeps is a genuinely sequential phase label (Now/Next/Then in the roadmap) — that carries ordering information a decorative kicker does not.

## Layout

A single content shell (`shell` className, `max-w-[1320px]`, `px-6 sm:px-10`) used on every page. Sections stack full-bleed with `border-b border-border` between them and generous vertical rhythm (`py-16 sm:py-22` on marketing sections; docs sub-pages run tighter, `py-10`, matching their Read-mode job over the landing page's Persuade-mode pacing). Grids collapse to a single column below `md`/`sm` breakpoints throughout — no fixed-pixel layout that only holds at one width.

## Elevation & Depth

Flat by default: almost everything is separated by a 1px border, not a shadow. Two deliberate exceptions carry all of the system's depth: the hero terminal card (`.terminal-card`, a soft multi-layer shadow with an accent-tinted glow) and the primary button (`.btn-primary`, an inset highlight plus a colored glow that grows on hover). Depth is reserved for the two moments the system wants to feel alive; everywhere else, structure comes from borders and spacing alone.

### Named Rules
**The Two-Glow Rule.** Only the hero terminal and the primary CTA carry a shadow/glow. Every other panel, card, and diagram node is flat with a border — adding a third glow would dilute what currently reads as two deliberate, load-bearing moments.

## Shapes

Three radius steps, chosen by role: `rounded-full` (pills) for every button and the nav capsule; `rounded-2xl` (~16px) for secondary content cards (install cards, docs category cards, code blocks); `rounded-[28px]` for major structural panels (the pillar list, the architecture diagram, the roadmap grid, the docs data-flow table). The 28px value is a deliberate divergence from the 40px reference studied structurally — bumped toward the terminal card's own radius, but kept smaller to hold a more restrained, systems-product tone rather than a marketing-site's softer proportions.

## Components

### Buttons
- **Shape:** full pill (`rounded-full`), consistent across every register.
- **Ghost** (`ghostBtn` in `lib/styles.ts`): transparent fill, `border-border`, lifts 1px and darkens its border on hover — the default secondary action.
- **Primary:** accent-filled, `accent-text` on top, carries the system's one button-level glow (see Elevation).

### Cards / Panels
- **Secondary card** (`rounded-2xl`, `bg-bg-subtle`): install commands, docs category cards, code blocks — content-density surfaces.
- **Major panel** (`rounded-[28px]`, `border-border`): structural groupings — the pillar list, the roadmap grid, the data-flow table, the z3rno Cloud teaser.
- **Pillar row** (not a card): the "How z3rno actually works" list is a proof-line list with hover-tinted rows, deliberately not a card grid — the system's answer to the generic icon+heading+text template.

### CodeBlock (new, this pass)
A bordered `rounded-2xl` panel with an optional label header and a `font-mono` body; `prompt` prefixes a single accent-colored `$`. Extracted from the landing page's pre-existing inline `<pre>` pattern rather than invented, so every docs page shares one implementation instead of five near-duplicates.

### DataFlowDiagram (new, this pass)
A bordered `rounded-[28px]` grid table — operations as rows, the three storage backends as columns — reusing the same border/radius language as every other major panel rather than introducing a new diagram grammar. `full` mode adds a per-row note; the compact mode (used on the `/docs` landing page) omits it.

### Navigation
`SiteHeader`: a bordered pill capsule of `$`-prefixed command-style labels, a blinking terminal caret, and an icon-only GitHub button — sticky, blurred background on scroll. Mobile collapses to a full-width dropdown panel, not a modal.

## Do's and Don'ts

### Do:
- **Do** keep JetBrains Mono reserved for real commands, code, and measured values — never as a "technical" costume on ordinary prose.
- **Do** separate content with borders and spacing before reaching for a shadow; the system is flat by design.
- **Do** use the proof-line list pattern (label + one-line mechanism, not an icon) for any new "why trust this" section, matching the existing pillars section.
- **Do** keep Read-mode surfaces (docs) tighter and quieter than Persuade-mode surfaces (the landing page) — no hero persuasion copy, no CTA beyond navigation, on any `/docs` page.

### Don't:
- **Don't** place an eyebrow/kicker label directly above a heading, anywhere on the site.
- **Don't** add a third shadow/glow moment beyond the hero terminal and the primary button.
- **Don't** copy the studied reference's literal colors, type, or exact spacing values (40px radii, 1340px shell) — pattern and structure only, per the standing brand-source-of-truth rule (`z3rno-brand-assets`).
- **Don't** invent install/publish-status copy — every "coming soon" or "not yet published" claim must match the actual current registry state.
