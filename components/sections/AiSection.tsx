import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureGrid } from "@/components/patterns/FeatureGrid";
import { AiConversationMockup } from "@/components/patterns/AiConversationMockup";
import type { HomeDictionary } from "@/content/types";

export function AiSection({ ai }: { ai: HomeDictionary["ai"] }) {
  return (
    <section id="ai" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader headline={ai.headline} subcopy={ai.intro} />
          <div className="mt-8">
            <FeatureGrid items={ai.capabilities} columns={2} />
          </div>
          <p className="mt-8 text-base font-medium text-ink">{ai.ruleNote}</p>
        </Reveal>
        <Reveal delay={100}>
          <AiConversationMockup messages={ai.conversation} />
        </Reveal>
      </Container>
    </section>
  );
}
