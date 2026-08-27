import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getPricingDictionary } from "@/content/get-pricing-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/patterns/PricingCard";
import { ValueComparisonTable } from "@/components/patterns/ValueComparisonTable";
import { localizeHref } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pricing">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getPricingDictionary(locale);

  return buildPageMetadata(locale, {
    title: dict.meta.title,
    description: dict.meta.description,
    path: "/pricing",
  });
}

export default async function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getPricingDictionary(locale);

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {dict.hero.headline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dict.hero.intro}</p>
            <p className="mt-3 text-sm text-ink-soft">{dict.noPriceListNote}</p>
          </Reveal>
        </Container>

        <Container className="mt-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {dict.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80}>
                <PricingCard tier={tier} locale={locale} recommendedLabel={dict.recommendedLabel} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 sm:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <h2 className="text-balance text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {dict.valueComparison.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{dict.valueComparison.intro}</p>
          </Reveal>
        </Container>

        <Container className="mt-10">
          <Reveal>
            <ValueComparisonTable dict={dict.valueComparison} />
          </Reveal>
          <p className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
            {dict.valueComparison.footnote}
          </p>

          {dict.calculatorTeaser ? (
            <Reveal className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-lg font-medium tracking-tight text-ink">{dict.calculatorTeaser.headline}</p>
              <CtaButton
                label={dict.calculatorTeaser.cta.label}
                href={localizeHref(locale, dict.calculatorTeaser.cta.href)}
                variant="secondary"
              />
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-balance text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            {dict.finalCta.headline}
          </h2>
          <CtaButton
            label={dict.finalCta.cta.label}
            href={localizeHref(locale, dict.finalCta.cta.href)}
            size="lg"
          />
        </Container>
      </section>
    </>
  );
}
