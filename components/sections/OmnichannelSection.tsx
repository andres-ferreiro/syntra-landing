import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IntegrationRow } from "@/components/patterns/IntegrationRow";
import type { HomeDictionary } from "@/content/types";

export function OmnichannelSection({
  omnichannel,
}: {
  omnichannel: HomeDictionary["omnichannel"];
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center">
        <Reveal>
          <SectionHeader
            headline={omnichannel.headline}
            subcopy={omnichannel.description}
            align="center"
          />
        </Reveal>
        <Reveal delay={100} className="mt-10 w-full">
          <IntegrationRow channels={omnichannel.channels} />
        </Reveal>
      </Container>
    </section>
  );
}
