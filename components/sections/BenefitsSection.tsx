import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureGrid } from "@/components/patterns/FeatureGrid";
import type { HomeDictionary } from "@/content/types";

export function BenefitsSection({ benefits }: { benefits: HomeDictionary["benefits"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={benefits.headline} />
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <FeatureGrid items={benefits.items} columns={3} />
        </Reveal>
      </Container>
    </section>
  );
}
