import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/patterns/FaqAccordion";
import type { HomeDictionary } from "@/content/types";

// The white panel is a masked overlay, not a solid section background — it
// fades to transparent at both edges so the section blends into HowItWorks
// above and the footer's gradient below, instead of meeting them at a hard
// border/color-stop line.
const FADE_MASK = "linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)";

export function FaqSection({ faq }: { faq: HomeDictionary["faq"] }) {
  return (
    <section id="faq" className="relative scroll-mt-24 py-14 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-surface"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      />
      <Container className="max-w-2xl">
        <Reveal>
          <SectionHeader headline={faq.headline} />
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
