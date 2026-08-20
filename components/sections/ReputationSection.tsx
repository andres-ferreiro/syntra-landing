import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureGrid } from "@/components/patterns/FeatureGrid";
import type { HomeDictionary } from "@/content/types";

export function ReputationSection({
  reputation,
}: {
  reputation: HomeDictionary["reputation"];
}) {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={reputation.headline} subcopy={reputation.description} />
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <FeatureGrid items={reputation.points} columns={2} />
        </Reveal>
      </Container>
    </section>
  );
}
