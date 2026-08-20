import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "@/components/patterns/IndustryCard";
import type { HomeDictionary } from "@/content/types";

export function IndustriesSection({
  industries,
}: {
  industries: HomeDictionary["industries"];
}) {
  return (
    <section id="industries" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="flex flex-col items-center">
        <Reveal>
          <SectionHeader headline={industries.headline} align="center" />
        </Reveal>
        <Reveal delay={100} className="mt-10 flex w-full flex-wrap justify-center gap-3">
          {industries.items.map((item) => (
            <IndustryCard key={item} name={item} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
