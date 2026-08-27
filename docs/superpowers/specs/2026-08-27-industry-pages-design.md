# Industry landing pages (`/industries/[slug]`)

## Context

The homepage `IndustriesSection` (added earlier) teases 6 verticals mandhy serves — Healthcare & Medical, Home Services & Trades, Professional Services, Real Estate, Rentals & Hire, Beauty & Wellness — but each card is a static, non-clickable div with only a title/subtitle/one-line description. The goal now is to give each industry its own SEO-focused landing page with richer, unique content, so the homepage cards become real links and each page has enough distinct copy to be worth indexing and clicking into.

## Content architecture

Industries content is being promoted from a teaser fragment inside the main dictionary into its own content domain, mirroring the existing `/pricing` precedent (`content/pricing-types.ts` + `content/pricing-dictionaries/{en,es}.ts` + `content/get-pricing-dictionary.ts`):

- `content/industry-types.ts` — `IndustryEntry` interface (moved/expanded from `content/types.ts`) and `IndustryDictionary` (`Record<string, IndustryEntry>` keyed by the same 6 keys used today: `healthcare`, `homeServices`, `professionalServices`, `realEstate`, `rentals`, `beautyWellness`).
- `content/industry-dictionaries/{en,es}.ts` — one entry per industry per locale with:
  - `title`, `subtitle`, `description` — existing fields, relocated here (removed from `content/types.ts`'s `HomeDictionary.industries` and the main `en.ts`/`es.ts`)
  - `slug` — existing field, relocated here (single source of truth for routing and homepage links)
  - `intro: string` — a short paragraph for the page hero, distinct from the homepage's one-liner
  - `painPoints: string[]` — 3-4 short, industry-specific problems mandhy solves
  - `adaptation: { headline: string; body: string }` — "how mandhy adapts for you" narrative
  - `faq: { question: string; answer: string }[]` — 3-4 industry-specific Q&As (a subset/rephrasing of the sitewide FAQ where relevant, not new fabricated claims)
  - `finalCta: { headline: string; cta: { label: string; href: string } }` — industry-tailored closing CTA (href always `/contact`)
- `content/get-industry-dictionary.ts` — `getIndustryDictionary(locale): IndustryDictionary`, same lookup shape as `getPricingDictionary`.

`content/dictionaries/{en,es}.ts` keep the `industries.headline`/`industries.subhead` section-level copy (used by the homepage section header) but drop the per-industry entries — those now come from the new module. `components/sections/IndustriesSection.tsx` takes a new `industryDictionary: IndustryDictionary` prop (fetched in `app/[locale]/page.tsx` alongside `dict`) instead of `dict.industries`.

No fabricated stats, testimonials, or client counts anywhere in this new copy — same rule as the rest of the site (PRODUCT.md). Pain points and adaptation copy describe mechanism ("mandhy answers after-hours calls and books the visit") not unverified outcomes ("increases bookings 40%").

## Routing

`app/[locale]/industries/[slug]/page.tsx`:
- `generateStaticParams()` returns all 12 `{locale, slug}` pairs by reading both locale dictionaries and mapping each entry to `{locale, slug: entry.slug}`. `export const dynamicParams = false` — any unknown slug 404s via Next's default not-found handling for excluded static params.
- `generateMetadata({params})` validates locale, looks up the entry by slug (404 via `notFound()` if not found), calls the extended `buildPageMetadata` (see below) with that entry's `title`/`description`-derived meta text and per-locale localized paths.
- The page component itself validates locale + resolves the entry the same way, renders the sections below, and calls `notFound()` if the slug doesn't match any entry for that locale.

## SEO plumbing

- `lib/metadata.ts`: `buildPageMetadata` gains an optional fourth field on its options object: `localizedPaths?: Partial<Record<Locale, string>>`. When present, `alternates.languages` uses `localizedPaths[l] ?? path` per locale instead of the current flat `path` for every locale. Fully backward-compatible — every existing caller (`/`, `/contact`, `/schedule`, `/pricing`) keeps working unchanged since none pass this new field.
- `app/sitemap.ts`: add a second branch (industries) that reads both locale dictionaries, and for each of the 6 industry keys emits one sitemap entry per locale with `alternates.languages` cross-referencing the *other* locale's own slug for that same industry — not reusing the flat `PATHS` map (paths diverge per locale here).
- `lib/structured-data.ts`: add `buildServiceSchema({name, description, url})` → `schema.org/Service` with `provider` set to the site's `Organization` (via `buildOrganizationSchema()`'s shape, referenced not duplicated). Each industry page emits this plus a reused `buildFaqSchema(entry.faq)` for its FAQ subset.

## Page layout

Composed from a mix of reused and new small components, in this order:

1. **Hero** — new lightweight section (not the homepage `Hero.tsx`, which has homepage-specific wordmark-splitting logic): centered headline (industry title worked into a sentence, e.g. "AI automation built for {title}"), `intro` paragraph, primary CTA ("Request an audit" → `/contact`), and the existing `ChatMockup` fed an industry-flavored 4-message sample conversation (new content, `ChatMessage[]` per industry per locale — kept inline in the industry dictionary entry as `sampleConversation`, reusing the existing `ChatMessage` type from `content/types.ts`).
2. **Pain points** — new small pattern component (`components/patterns/PainPointList.tsx`), a checklist styled like `PricingCard`'s feature list (same `CheckIcon`, same `text-ink`/`text-ink-soft` tokens) rendering `painPoints`.
3. **Adaptation** — `adaptation.headline` + `adaptation.body`, paired with one reused mockup (`CalendarMockup` — locale-only, no new props needed) for visual proof, laid out like a simplified `BentoTile` (text one side, mockup the other).
4. **FAQ** — existing `FaqAccordion` fed `entry.faq`, headline "Preguntas sobre mandhy para {title}" / "Questions about mandhy for {title}".
5. **Final CTA** — new small section mirroring `/pricing`'s own final-CTA block: `finalCta.headline` + `CtaButton` to `/contact`.

All sections use the existing `Container`/`SectionHeader`/`Reveal` primitives and design tokens — no new colors, radii, or shadows introduced.

## Homepage integration

`components/sections/IndustriesSection.tsx`:
- Regains a `locale: Locale` prop (dropped earlier specifically because these pages didn't exist yet).
- Each `IndustryCell`'s outer element becomes a `<Link href={localizeHref(locale, "/industries/" + entry.slug)}>` wrapping the existing content — same visual treatment (grid dividers, hover glow) since those are just CSS on the wrapping element, `Link` swaps in for the current plain `div` in the DOM position that already carries those classes.
- `app/[locale]/page.tsx` fetches `getIndustryDictionary(locale)` alongside `dict` and passes both `industries={industryDictionary}` (renamed prop) and `locale` to `IndustriesSection`.

## Out of scope (confirmed with user)

- No `/industries` hub/index page — only the 6 individual pages, reached via the homepage cards.
- No new opengraph-image route per industry — the existing shared `lib/og-image.tsx` template is reused per page the same way `/pricing/opengraph-image.tsx` does, each industry page getting its own `app/[locale]/industries/[slug]/opengraph-image.tsx` that reads the resolved entry's `intro` line as the template's headline text (small addition, same pattern, not a new template).
