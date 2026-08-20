import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SystemFlowSection } from "@/components/sections/SystemFlowSection";
import { CoreServicesSection } from "@/components/sections/CoreServicesSection";
import { AutomationExamplesSection } from "@/components/sections/AutomationExamplesSection";
import { AiSection } from "@/components/sections/AiSection";
import { CrmSection } from "@/components/sections/CrmSection";
import { OmnichannelSection } from "@/components/sections/OmnichannelSection";
import { ReputationSection } from "@/components/sections/ReputationSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
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
      <Hero hero={dict.hero} />
      <ProblemSection problem={dict.problem} />
      <SystemFlowSection systemFlow={dict.systemFlow} />
      <CoreServicesSection coreServices={dict.coreServices} />
      <AutomationExamplesSection automationExamples={dict.automationExamples} />
      <AiSection ai={dict.ai} />
      <CrmSection crm={dict.crm} />
      <OmnichannelSection omnichannel={dict.omnichannel} />
      <ReputationSection reputation={dict.reputation} />
      <IndustriesSection industries={dict.industries} />
      <HowItWorksSection howItWorks={dict.howItWorks} />
      <BenefitsSection benefits={dict.benefits} />
      <FaqSection faq={dict.faq} />
      <FinalCtaSection finalCta={dict.finalCta} />
    </>
  );
}
