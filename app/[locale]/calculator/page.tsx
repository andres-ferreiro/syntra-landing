import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCalculatorDictionary } from "@/content/get-calculator-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevenueCalculator } from "@/components/patterns/RevenueCalculator";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/calculator">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getCalculatorDictionary(locale);

  return buildPageMetadata(locale, {
    title: dict.meta.title,
    description: dict.meta.description,
    path: "/calculator",
  });
}

export default async function CalculatorPage({ params }: PageProps<"/[locale]/calculator">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getCalculatorDictionary(locale);

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {dict.hero.headline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{dict.hero.intro}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="max-w-5xl">
          <Reveal>
            <RevenueCalculator dict={dict} locale={locale} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
