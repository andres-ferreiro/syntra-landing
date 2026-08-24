import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { CoreServicesSection } from "@/components/sections/CoreServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { buildFaqSchema, safeJsonLd } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(buildFaqSchema(dict.faq.items)) }}
      />
      <Hero hero={dict.hero} locale={locale} chatMessages={dict.ai.conversation} />
      <AdvantagesSection advantages={dict.advantages} locale={locale} />
      <CoreServicesSection coreServices={dict.coreServices} locale={locale} />
      <HowItWorksSection howItWorks={dict.howItWorks} />
      <FaqSection faq={dict.faq} />
    </>
  );
}
