import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getIndustryDictionary } from "@/content/get-industry-dictionary";
import type { IndustryKey } from "@/content/industry-types";
import { buildPageMetadata } from "@/lib/metadata";
import { buildFaqSchema, buildServiceSchema, safeJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { ChatMockup } from "@/components/patterns/ChatMockup";
import { CalendarMockup } from "@/components/patterns/CalendarMockup";
import { PainPointList } from "@/components/patterns/PainPointList";
import { FaqAccordion } from "@/components/patterns/FaqAccordion";

const FAQ_HEADLINE: Record<Locale, (title: string) => string> = {
  en: (title) => `Questions about mandhy for ${title}`,
  es: (title) => `Preguntas sobre mandhy para ${title}`,
};

const INDUSTRY_KEYS: IndustryKey[] = [
  "healthcare",
  "homeServices",
  "professionalServices",
  "realEstate",
  "rentals",
  "beautyWellness",
];

function getEntry(locale: Locale, key: IndustryKey) {
  return getIndustryDictionary(locale)[key];
}

// Slugs are localized (e.g. "healthcare" vs. "salud"), so lookups always go
// through the locale-stable `key`, never the slug itself across locales.
function findKeyBySlug(locale: Locale, slug: string): IndustryKey | null {
  return INDUSTRY_KEYS.find((key) => getEntry(locale, key).slug === slug) ?? null;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    INDUSTRY_KEYS.map((key) => ({ locale, slug: getEntry(locale, key).slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/industries/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const key = findKeyBySlug(locale, slug);
  if (!key) notFound();
  const entry = getEntry(locale, key);

  const localizedPaths = Object.fromEntries(
    LOCALES.map((l) => [l, `/industries/${getEntry(l, key).slug}`])
  ) as Partial<Record<Locale, string>>;

  return buildPageMetadata(locale, {
    title: `${entry.title} — mandhy`,
    description: entry.description,
    path: `/industries/${entry.slug}`,
    localizedPaths,
  });
}

export default async function IndustryPage({
  params,
}: PageProps<"/[locale]/industries/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const key = findKeyBySlug(locale, slug);
  if (!key) notFound();
  const entry = getEntry(locale, key);
  const pageUrl = `${SITE_URL}/${locale}/industries/${entry.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            buildServiceSchema({ name: entry.title, description: entry.description, url: pageUrl })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(buildFaqSchema(entry.faq)) }}
      />

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(55%_45%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]"
        />
        <Container className="flex flex-col items-center gap-2 text-center">
          <Reveal>
            <p className="text-sm font-medium text-accent-strong">{entry.subtitle}</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{entry.intro}</p>
            <div className="mt-7">
              <CtaButton
                label={entry.finalCta.cta.label}
                href={localizeHref(locale, entry.finalCta.cta.href)}
                size="lg"
              />
            </div>
          </Reveal>
        </Container>

        <Container className="mt-14">
          <Reveal delay={100}>
            <div className="relative mx-auto h-[380px] w-full max-w-sm">
              <ChatMockup messages={entry.sampleConversation} locale={locale} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-20 sm:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <SectionHeader headline={entry.adaptation.headline} align="center" />
          </Reveal>
        </Container>

        <Container className="mt-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="text-base leading-relaxed text-ink-soft">{entry.adaptation.body}</p>
              <div className="mt-8">
                <PainPointList items={entry.painPoints} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative mx-auto h-[340px] w-full max-w-md">
                <CalendarMockup locale={locale} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="faq" className="border-t border-border py-16 sm:py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeader headline={FAQ_HEADLINE[locale](entry.title)} />
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <FaqAccordion items={entry.faq} />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-balance text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            {entry.finalCta.headline}
          </h2>
          <CtaButton
            label={entry.finalCta.cta.label}
            href={localizeHref(locale, entry.finalCta.cta.href)}
            size="lg"
          />
        </Container>
      </section>
    </>
  );
}
