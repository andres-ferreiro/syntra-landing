# Brand Voice & Copy Rewrite — Design

## Problem

The site copy (English and Spanish) still speaks in generic SaaS/system language — "mandhy connects your CRM, messaging, and automation into one system." That framing was inherited from the pre-rebrand Syntra positioning and undersells what the brand now wants to be: a formal but distinctly personified AI business assistant, not connective infrastructure. Copy currently treats "system" as the subject of sentences; mandhy should be the subject, actively doing the work.

## Goals

- Reposition mandhy from "a connected system" to "your business's AI assistant" across the entire site, in both languages.
- Keep the register formal — no slang, no hype punctuation — while making mandhy read as an active, capable character rather than infrastructure.
- Produce a durable reference (`BRAND.md`) so future copy (new pages, ads, emails) stays consistent with this voice without re-deriving it each time.

## Non-goals

- No visual/design changes (colors, layout, components) — copy only.
- No new pages or sections — rewriting existing copy in place, same information architecture.
- No change to the whitelabel constraint already documented in `PRODUCT.md` (never name the underlying platform/vendor) — still applies.

## Voice rules

1. **Subject of the sentence is mandhy, not "system"/"platform."** mandhy answers, books, follows up, reminds, organizes, notices, never forgets, handles — active assistant-verbs, not passive infrastructure-nouns.
2. **Vocabulary to retire from headline/lead copy**: "system," "platform," "workflows," "pipeline," "integrations." These stay fine in precise/technical contexts (FAQ detail, feature sub-copy) but shouldn't drive the top-level narrative.
3. **Vocabulary to lean into**: answers, books, follows up, reminds, organizes, notices, never forgets, handles, keeps track of.
4. **Register stays formal**: second person ("your business"), active voice, confident and calm — not salesy, no exclamation-point hype, no slang.
5. **Brand name always lowercase** — "mandhy," including sentence-initial position (already established convention from the rebrand).
6. **Third-person POV**: mandhy is referred to as "mandhy" / "it," never speaking in first person ("I..."), including in the chat-mockup component copy.

### Example — hero, before/after

- Before: "mandhy connects your website, CRM, messaging, follow-up, appointments, and reputation into one system built around how your business actually works."
- After: "mandhy is the assistant behind your business — answering customers, booking calls, following up on every lead, and making sure nothing falls through, so you don't have to."

## Scope of the rewrite

Both languages, all copy surfaces:

- `content/dictionaries/en.ts` and `content/dictionaries/es.ts` — meta/SEO description, hero, problem framing (kept focused on the business's pain, not personified — the business has the problem, mandhy is the fix), the "one connected system" section reframed around what mandhy *does* end-to-end, core services descriptions rewritten as mandhy-does-X, the AI section (heaviest personification — it's literally the assistant), pipeline/CRM section, omnichannel section, reputation section, industries intro if any, process ("how it works") steps, FAQ questions/answers, final CTA, footer tagline.
- `content/contact-dictionaries/en.ts` and `content/contact-dictionaries/es.ts` — page titles/descriptions, form copy, WhatsApp message, schedule page copy.
- `components/patterns/AiConversationMockup.tsx` — the "mandhy Assistant" label already fits; verify the mocked conversation lines don't put words in mandhy's mouth as first-person ("I..." — should stay as the assistant's chat replies, which are naturally first-person as a chat UI convention, so this component is exempt from the third-person rule; only narrative/body copy elsewhere on the page follows third-person).
- Diagram/flow labels (`systemFlow.steps`, funnel step labels) — short (1-3 word) labels stay as-is; they're UI labels, not narrative copy, so the voice rules apply to headlines/subcopy around them, not to the labels themselves.

Out of scope: any copy not in these dictionary files (e.g. hardcoded strings already covered by the earlier rebrand pass, like the header/footer brand name, which stays as the lowercase wordmark image).

## Deliverable: BRAND.md

New file at repo root, alongside `PRODUCT.md`/`DESIGN.md`, following their existing lightweight doc style. Sections:

1. **Positioning** — who mandhy is for, the core promise ("mandhy is an all-in-one AI assistant for your business, not a system you have to operate"), one-sentence differentiator.
2. **Personality & voice** — the rules above, written as a short reference (not a repeat of this whole design doc).
3. **Vocabulary** — do/don't word lists.
4. **Before/after examples** — 3-4 short paired lines (hero, one feature, one FAQ answer) so the voice is unambiguous at a glance.

## Verification

- Read through both rewritten dictionary files end-to-end in each language to confirm no leftover "system"/"platform" framing in headline copy, and that mandhy is consistently the grammatical subject of assistant-actions.
- `tsc --noEmit` to confirm the dictionary types still satisfy `HomeDictionary`/contact dictionary types (rewrite is content-only, no shape changes).
- Load the homepage in the browser preview (both locales) and visually confirm the new copy renders correctly, no layout breakage from longer/shorter strings.
