# Design

<!-- impeccable:design-schema 1 -->

## Mode

Persuade — the homepage's job is to get a visitor to request a business audit; design is the product.

## Visual World

Premium SaaS / modern technology consultancy. Ink-on-paper minimalism, one restrained accent color, generous spacing, hand-built diagrams and software-style mockups instead of stock imagery or icon packs. Explicitly avoids: neon, "AI brain" imagery, generic agency-template clichés, futuristic tropes, aggressive marketing design, gradient text, kicker/eyebrow labels, decorative section numbers (except where a real ordered process — How It Works — earns them).

## Logo & Brand Color

`public/images/mandhy-logo.png` — the full "mandhy" wordmark (ink-black type, slate-gray dot), rendered via `components/ui/Logo.tsx` in the Header (24px) and Footer (22px); the wordmark already contains the brand name, so no separate text is set alongside it. `public/images/mandhy-icon.png` — the standalone "m." mark, used for favicon/app icons and other square-icon contexts (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, the `Organization` structured-data logo, and the 404 page). The accent palette below predates this asset and was sampled from the prior Syntra logo; it has not been re-derived from the new mark.

## Tokens (`app/globals.css`, Tailwind v4 `@theme inline`)

- Color: `--color-paper` (#faf9f6, background), `--color-ink` (#13151a, primary text/dark surfaces), `--color-ink-soft` (#4b4f5e, secondary text — tinted from ink, not gray), `--color-surface` (#ffffff, card background), `--color-border` (#e5e3db), `--color-accent` (#22c3d1, brand cyan — decorative/tint use only, does not meet AA alone), `--color-accent-strong` (#0f7a83, deep teal — hover backgrounds, focus rings, small accent text/icons, meets 4.5:1+), `--color-accent-soft` (#e5f8f6, tint backgrounds), `--color-mint` (#2bd9a3, brand's second gradient stop — used sparingly, e.g. the final-CTA glow).
- Used subtly and sparingly per the brief's own direction: accent tints (checkmarks, hover borders, chat badge, focus rings) and one soft two-tone glow in the final CTA card — never a full saturated gradient background or gradient text.
- Radius: `--radius-card` (1.25rem), `--radius-pill` (999px).
- Shadow: `--shadow-card` — soft, offset, no hard/zero-blur shadows. Reserved for genuinely elevated "screenshot" mockups (`PipelineMockup`, `AiConversationMockup`) — not used on ordinary content cards or diagram nodes, to avoid the border+shadow "AI card" tell.
- Type: Geist Sans (`--font-geist-sans`) as `font-sans`, Geist Mono reserved for small structural labels (step numbers, pipeline tags).
- Light-only for v1 — no dark mode.

## Component Inventory

- `components/ui/`: `Container`, `CtaButton` (primary / secondary / inverted variants), `SectionHeader` (headline + optional subcopy, no eyebrow), `Reveal` (IntersectionObserver scroll-fade, respects `prefers-reduced-motion`), `Logo`, `animated-beam.tsx` (MagicUI's `AnimatedBeam`, vendored verbatim — see Motion below).
- `components/layout/`: `Header` (sticky, mobile drawer, CTA always visible independent of nav-link collapse), `LanguageSwitcher`, `Footer`.
- `components/patterns/`: `ServiceCard` (icon + title + description, no decorative numbering — see `ServiceIcon`), `ServiceIcon` (hand-drawn, one per service, keyed by title), `FlowIcon` (hand-drawn, one per system-flow step, keyed by label), `IndustryCard` (pill, not boxed — intentionally different from `ServiceCard`), `FeatureGrid` (checklist), `WorkflowDiagram` (vertical mode renders a compact `Circle`+`AnimatedBeam` timeline — 44px icon badges, not full-width text pills, matching MagicUI's actual visual language; horizontal kept for future reuse, unused today), `IntegrationRow` (channel pills with hand-drawn icons), `FaqAccordion` (native `<details>`), `PipelineMockup`, `AiConversationMockup`, `ContactForm` (full 14-field qualification form, live on `/contact`, posts to `/api/contact`), `DirectContactLinks` (email/phone/WhatsApp pills, `/contact` only), `CalendarEmbed` (iframe booking widget with prefill, used on `/schedule` and the contact form's post-submit step), `TestimonialPlaceholder` (built, intentionally unused — see Content Rules).
- `components/sections/`: the 14 ordered homepage blocks, each a thin composition of the above driven entirely by `content/dictionaries/{es,en}.ts`.

## Motion

- Default: light `Reveal`-based scroll fade-in, one authored moment per section.
- `SystemFlowSection`'s vertical `WorkflowDiagram` additionally uses MagicUI's `AnimatedBeam` (`motion` package, vendored at `components/ui/animated-beam.tsx` + `lib/utils.ts`'s `cn()`): a static `--color-border` rail connects each node's dot marker, with a cyan→mint gradient pulse (`#22c3d1` → `#2bd9a3`, matching the logo) sweeping down through the 7 connectors in a cascading stagger (each beam delayed `0.3s` after the previous). This is the one place the brand gradient appears in motion — everywhere else color stays static per the "sparingly" rule.

## Content Rules (binding — see also `PRODUCT.md`)

- Never name the underlying whitelabeled platform ("GoHighLevel"/"GHL") anywhere.
- No public pricing; the FAQ price question redirects to contact for a scoped assessment.
- No fabricated testimonials, logos, certifications, stats, team size, or years in business — `TestimonialPlaceholder` exists but is not rendered until real evidence exists.
- Bilingual: Spanish primary (`content/dictionaries/es.ts`), English secondary (`en.ts`), same shape (`content/types.ts`). Section anchor ids (`#services`, `#ai`, `#industries`, `#how-it-works`) stay in English across both locales — internal, not visible.

## i18n / Routing

- `proxy.ts` (Next 16 renamed `middleware.ts`) redirects unprefixed paths to `/es` or `/en` based on `Accept-Language`, defaulting to `es`.
- `app/[locale]/layout.tsx` is the effective root layout (owns `<html lang>`); there is no top-level `app/layout.tsx`.

## SEO / GEO

- Production domain, site name, and contact constants centralized in `lib/site.ts`.
- `lib/metadata.ts`'s `buildPageMetadata()` is the single source for title/description/canonical/hreflang/OpenGraph/Twitter card metadata — every page must use it (a prior bug had `/contact` and `/schedule` silently inheriting the homepage's OG tags because they only set `title`/`description`/`alternates` and never `openGraph`).
- Structured data (`lib/structured-data.ts`, escaped via `safeJsonLd()`): site-wide `Organization` schema (name, url, logo, real email/phone) in `app/[locale]/layout.tsx`; `FAQPage` schema generated from `content/dictionaries/{es,en}.ts`'s `faq.items` on the homepage.
- Per-route dynamic Open Graph images (`next/og` `ImageResponse`) at `app/[locale]/opengraph-image.tsx`, `.../contact/opengraph-image.tsx`, `.../schedule/opengraph-image.tsx`, sharing one template (`lib/og-image.tsx`) that embeds the real logo and each page's own headline.
- Real favicon/icons generated from `public/images/mandhy-icon.png` (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`).
- `public/llms.txt`: a plain-language site summary for AI answer engines/crawlers (llms.txt convention), listing pages and contact info, held to the same whitelabel/no-fabrication rules as the rest of the site.
- `app/robots.ts` disallows `/api/`; `app/sitemap.ts` covers all three routes × both locales.
- `app/not-found.tsx` is the **true root** 404 (not nested under `[locale]`) — required because the root layout lives at a top-level dynamic segment (`app/[locale]/layout.tsx`), so a nested `not-found.tsx` only catches explicit `notFound()` throws, never a genuinely-unmatched URL (Next.js's own documented caveat for this layout shape). It must not render its own `<html>`/`<body>` — Next generates an implicit root document shell since there's no `app/layout.tsx`, so doing so nests a second document and breaks hydration; the page returns a styled `<div>` instead, with the Geist font variable applied there.

## Scope

Homepage, `/contact`, and `/schedule` are built (`/es`, `/en`). `/solutions`, `/ai-automation`, `/industries`, `/how-it-works`, `/about` are not built yet.
