import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/patterns/FaqAccordion";
import type { HomeDictionary } from "@/content/types";

export function FaqSection({ faq }: { faq: HomeDictionary["faq"] }) {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeader headline={faq.headline} />
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
