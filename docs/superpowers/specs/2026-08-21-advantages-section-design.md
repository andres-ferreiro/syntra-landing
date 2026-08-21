# Homepage "Advantages" Section — Design

## Problem

The section immediately after the Hero is `components/sections/ProblemSection.tsx`, a pain-point-agitation list ("Your business may already be generating opportunities — and losing them just as fast.") followed by six bullet points. The user wants to replace this with a value-forward section inspired by a competitor's dark-themed "One AI. Every Advantage." block: a headline, a subhead, and three cards, each pairing a short claim with a visual proof.

The reference cannot be cloned directly:
- It's a dark/neon world; this site is light-only, ink-on-paper minimalism (`DESIGN.md`).
- One of its cards ("17,987 bookings made outside business hours...", a "Human vs Syntra" bar chart claiming 3x conversion) presents fabricated-looking specific statistics as fact. `PRODUCT.md`'s hard constraints explicitly ban fabricating stats, testimonials, case studies, or client proof — none of that exists yet for mandhy.

## Goals

- Replace `ProblemSection` with a new `AdvantagesSection`, same position in the homepage flow (right after Hero).
- Three cards, each built around a distinct visual "component" (per user direction: "think of something we can actually use components for, like the globe or charts"), each mapped to something mandhy actually does — no invented numbers.
- Use the Magic UI Globe component (https://magicui.design/docs/components/globe.md) for the reach/industries card, per explicit user request.
- Stay fully within the existing light design system — no dark-card treatment for this section (the user explicitly rejected a dark-card approach after seeing it proposed).
- Keep the third card visually quieter and framed as pain-relief, not a feature pitch — an emotional beat distinct from the other two, and distinct from anything already framed as "features" elsewhere on the page.

## Non-goals

- No fabricated stats, comparison numbers, testimonials, or client logos anywhere in this section.
- No orbiting-circles / channel-icon component here — the user wants that saved for a future "features" section, not built in this pass.
- No new charting library dependency — the speed card's chart is a small hand-built SVG illustration, consistent with this codebase's existing "hand-built diagrams instead of stock chart widgets" convention (see `WorkflowDiagram`, `ServiceIcon`, `FlowIcon` in `DESIGN.md`'s Component Inventory).
- No dark theme for the section or its cards.

## Section content

Both locales (`content/dictionaries/{en,es}.ts`) get a new `advantages` key (replacing `problem`) shaped as:

```ts
advantages: {
  headline: string;
  subhead: string;
  reach: { title: string; caption: string };
  speed: { title: string; caption: string };
  painPoint: { title: string; caption: string };
}
```

EN copy:
- headline: "Built to work everywhere your business does."
- subhead: "Every industry, every hour, without missing a beat."
- reach.title: "Every industry, every business."
- reach.caption: "mandhy adapts to how your business actually works — clinics, real estate, restaurants, and more."
- speed.title: "Answers before the moment passes."
- speed.caption: "mandhy responds the instant a message comes in, any time of day."
- painPoint.title: "Nothing falls through the cracks."
- painPoint.caption: "Every conversation remembered, every lead followed up — automatically."

ES copy (same voice, see `BRAND.md`):
- headline: "Diseñado para estar donde tu negocio lo necesita."
- subhead: "Cada industria, cada hora, sin que se te escape nada."
- reach.title: "Cada industria, cada negocio."
- reach.caption: "mandhy se adapta a cómo funciona realmente tu negocio — clínicas, bienes raíces, restaurantes y más."
- speed.title: "Responde antes de que se enfríe el momento."
- speed.caption: "mandhy responde al instante en cuanto llega un mensaje, a cualquier hora."
- painPoint.title: "Nada se te escapa."
- painPoint.caption: "Cada conversación recordada, cada lead con seguimiento — automáticamente."

`content/types.ts`'s `HomeDictionary` gets `advantages` in place of `problem`; `app/[locale]/page.tsx` swaps `<ProblemSection problem={dict.problem} />` for `<AdvantagesSection advantages={dict.advantages} />`. `ProblemSection.tsx` and the `problem` dictionary key are deleted (nothing else references them — confirmed via grep before implementation).

## Layout

`AdvantagesSection`, same section rhythm as its neighbors (`py-20 sm:py-28`, `Container`), light `paper` background (inherited, no section-level bg change):

1. Centered headline + subhead (reuse `SectionHeader` if its shape fits — headline + subcopy, no eyebrow, matching existing convention — otherwise a small local block).
2. Below, `grid grid-cols-1 sm:grid-cols-3 gap-6` (or `gap-8` — final spacing tuned during implementation against real content), three cards of equal width.

Each card: `rounded-card border border-border bg-surface shadow-card p-8`, a visual area (~200px), then title (font-medium, text-lg) and caption (text-sm, text-ink-soft) below it — same card chrome the rest of the site uses (`ServiceCard`), so only the *visual* differs per card, not the container.

## Card 1 — Reach (Globe)

New component: `components/patterns/GlobeMockup.tsx` (or similar name, finalized in the plan), composing a vendored `components/ui/globe.tsx`.

- `components/ui/globe.tsx` is Magic UI's Globe, vendored following the exact precedent already set by `components/ui/animated-beam.tsx` in this repo (per `DESIGN.md`'s Motion section: "vendored verbatim" from MagicUI, then adapted to project conventions) — adapted to this project's `motion/react` import (not `framer-motion`) and `lib/utils.ts`'s `cn()`.
- New dependency: `cobe` (the WebGL globe library Magic UI's component wraps). No other new dependency.
- Recolored for the light theme instead of the library's dark default: pale/near-white sphere base, `--color-accent` teal dots, `--color-accent-strong` markers, subtle glow — sits directly on the white card (`bg-surface`), no dark backdrop needed. Colors read from the existing CSS custom properties (resolved to hex/rgb at render time, since `cobe`'s config takes numeric RGB tuples, not CSS vars directly).
- Auto-rotates; keeps the library's default drag-to-rotate interaction (a nice touch, not required to be disabled).
- Respects `prefers-reduced-motion` (pause auto-rotation), matching this codebase's existing motion-accessibility pattern (`Reveal`, `CalendarMockup`, `ChatMockup` all check this already).

## Card 2 — Speed (hand-built chart)

New component: `components/patterns/ResponseTimeChart.tsx` — a small hand-authored SVG, not a charting library.

- Two illustrative line/area series, **no numeric axis, no axis labels with units** — this is the deliberate line that keeps it from reading as a fabricated statistic (unlike the reference's "17,987 bookings" or "3x better"): "mandhy" (flat, low, fast) vs. "Manual follow-up" (spiky, high, slow), distinguished by a small color-swatch legend ("mandhy" in `accent-strong`, "Manual" in `ink-soft`/gray) rather than any claimed number.
- Subtle draw-in animation on scroll into view (reuse `Reveal` or a lightweight `motion` path-draw), one authored moment, consistent with the rest of the page's restrained motion.

## Card 3 — Pain point, not a feature (typographic, quieter)

New component: `components/patterns/PainPointCard.tsx` (or inlined directly in `AdvantagesSection.tsx` if small enough — decided during planning).

- Deliberately lighter visual weight than cards 1–2, per explicit user direction. Primarily typographic: the bold statement ("Nothing falls through the cracks.") *is* the visual, with the caption beneath it.
- One small hand-drawn SVG accent motif: a faint, wandering dashed/thin line (representing a thread that could be lost) that resolves into a solid `accent-strong` line ending in a filled dot (representing "caught" / followed up). Small, quiet, not a dashboard-style mockup, not styled as a screenshot of a real feature.
- Same card chrome as the other two (`bg-surface border-border shadow-card rounded-card`) so it still reads as part of the same three-card set, just visually quieter inside.

## Verification

- `tsc --noEmit` clean after the dictionary shape change (`problem` → `advantages`) propagates through `content/types.ts`, both dictionaries, and `page.tsx`.
- Load `/en` and `/es` in the browser: confirm the section renders where `ProblemSection` used to, headline/subhead/cards show localized copy, the globe renders and rotates (auto + drag) without a dark backdrop, the chart draws in without any numeric label present anywhere in the DOM, and card 3 reads as visually quieter than cards 1–2.
- Confirm `prefers-reduced-motion` stops the globe's auto-rotation and the chart's draw-in animation (static end-state instead).
- Confirm mobile layout (`grid-cols-1`) stacks the three cards cleanly, and the globe's canvas resizes correctly at that width (this is the one part of the reference implementation most likely to need real tuning against a live browser, per Magic UI's own responsive-canvas caveats).
- Grep the repo for `ProblemSection` and `problem:` (dictionary key) after removal to confirm no dangling references.
