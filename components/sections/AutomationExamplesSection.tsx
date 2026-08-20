import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/content/types";

export function AutomationExamplesSection({
  automationExamples,
}: {
  automationExamples: HomeDictionary["automationExamples"];
}) {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={automationExamples.headline} />
        </Reveal>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {automationExamples.examples.map((example, index) => (
            <Reveal key={example.trigger} delay={index * 40}>
              <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-full text-sm font-medium text-ink sm:w-56">
                  {example.trigger}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="hidden text-ink-soft sm:block"
                >
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
                <span className="text-sm text-ink-soft">{example.action}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
