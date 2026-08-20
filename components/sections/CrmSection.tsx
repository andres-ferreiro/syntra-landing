import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PipelineMockup } from "@/components/patterns/PipelineMockup";
import type { HomeDictionary } from "@/content/types";

export function CrmSection({ crm }: { crm: HomeDictionary["crm"] }) {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeader headline={crm.headline} subcopy={crm.description} />
        </Reveal>
        <Reveal delay={100}>
          <PipelineMockup stages={crm.stages} />
        </Reveal>
      </Container>
    </section>
  );
}
