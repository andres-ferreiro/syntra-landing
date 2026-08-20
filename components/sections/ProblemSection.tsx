import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/content/types";

export function ProblemSection({ problem }: { problem: HomeDictionary["problem"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={problem.headline} />
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            {problem.points.map((point) => (
              <li key={point} className="flex items-start gap-3 border-t border-border pt-4">
                <span className="text-base leading-relaxed text-ink-soft">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
