import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GlobeMockup } from "@/components/patterns/GlobeMockup";
import { ResponseTimeChart } from "@/components/patterns/ResponseTimeChart";
import { ClockMockup } from "@/components/patterns/ClockMockup";
import type { Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";

// Tailwind's line-clamp utility doesn't reliably apply in this project's
// build (see ChatMockup for the earlier debugging), so it's set explicitly.
// Clamping title and caption to a fixed 2 lines — combined with the min-height
// below — is what keeps all three cards' visuals starting at the same height
// regardless of how each locale's copy happens to wrap.
const CLAMP_2: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export function AdvantagesSection({
  advantages,
  locale,
}: {
  advantages: HomeDictionary["advantages"];
  locale: Locale;
}) {
  const cards = [
    { visual: <GlobeMockup />, title: advantages.reach.title, caption: advantages.reach.caption },
    {
      visual: <ResponseTimeChart locale={locale} />,
      title: advantages.speed.title,
      caption: advantages.speed.caption,
    },
    {
      visual: <ClockMockup />,
      title: advantages.alwaysOn.title,
      caption: advantages.alwaysOn.caption,
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={advantages.headline} subcopy={advantages.subhead} align="center" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card">
                <h3
                  className="flex min-h-[7rem] items-start justify-center px-8 pb-4 pt-8 text-center text-2xl font-bold tracking-tight text-ink"
                  style={CLAMP_2}
                >
                  {card.title}
                </h3>
                <div className="flex items-center justify-center overflow-hidden">{card.visual}</div>
                <p
                  className="flex min-h-[5rem] items-center justify-center px-8 pb-8 pt-4 text-center text-sm leading-relaxed text-ink-soft"
                  style={CLAMP_2}
                >
                  {card.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
