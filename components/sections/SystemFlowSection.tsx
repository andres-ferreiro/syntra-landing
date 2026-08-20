import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { WorkflowDiagram } from "@/components/patterns/WorkflowDiagram";
import type { HomeDictionary } from "@/content/types";

export function SystemFlowSection({
  systemFlow,
}: {
  systemFlow: HomeDictionary["systemFlow"];
}) {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container className="flex flex-col items-center">
        <Reveal>
          <SectionHeader headline={systemFlow.headline} align="center" />
        </Reveal>
        <Reveal delay={100} className="mt-12 w-full max-w-md">
          <WorkflowDiagram steps={systemFlow.steps} direction="vertical" />
        </Reveal>
      </Container>
    </section>
  );
}
