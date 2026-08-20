import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/content/types";

export function HowItWorksSection({
  howItWorks,
}: {
  howItWorks: HomeDictionary["howItWorks"];
}) {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={howItWorks.headline} />
        </Reveal>
        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <li className="border-t border-border pt-5">
                <span className="font-mono text-xs text-accent-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-medium text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
