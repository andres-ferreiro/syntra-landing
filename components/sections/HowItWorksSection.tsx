import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/content/types";

// One hand-illustrated icon per step (public/images/custom-icons/1-6.png),
// with the step number overlapping its bottom-left corner — an icon-led,
// editorial row instead of a connecting-line timeline.
const ICONS = [
  "/images/custom-icons/1.png",
  "/images/custom-icons/2.png",
  "/images/custom-icons/3.png",
  "/images/custom-icons/4.png",
  "/images/custom-icons/5.png",
  "/images/custom-icons/6.png",
];

export function HowItWorksSection({
  howItWorks,
}: {
  howItWorks: HomeDictionary["howItWorks"];
}) {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={howItWorks.headline} />
        </Reveal>

        <ol className="mt-20 grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-6">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <li>
                <div className="relative h-36 w-36">
                  <Image src={ICONS[i]} alt="" fill className="object-contain" />
                  <span className="absolute -bottom-4 -left-1 text-5xl font-bold text-ink">{i + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-ink-soft">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
