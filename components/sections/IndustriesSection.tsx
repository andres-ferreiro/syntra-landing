import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/content/types";
import type { IndustryEntry, IndustryKey } from "@/content/industry-types";
import { localizeHref, type Locale } from "@/lib/i18n";

// One hand-illustrated icon per industry (public/images/custom-icons/industry-*.png),
// matching the same hatch-fill style as HowItWorksSection's step icons.
const ICONS: Record<string, string> = {
  healthcare: "/images/custom-icons/industry-healthcare-v2.png",
  homeServices: "/images/custom-icons/industry-home-services-v2.png",
  professionalServices: "/images/custom-icons/industry-professional-services-v2.png",
  realEstate: "/images/custom-icons/industry-real-estate-v2.png",
  rentals: "/images/custom-icons/industry-rentals-v2.png",
  beautyWellness: "/images/custom-icons/industry-beauty-wellness-v2.png",
};

// Grid divider borders (no outer edge) via nth-child arithmetic, since the
// column count changes per breakpoint (1 / 2 / 3): border-b is dropped on the
// last row, border-r is dropped on the last column, per breakpoint.
const CELL_BORDERS =
  "border-border/80 " +
  "[&:not(:last-child)]:border-b " +
  "sm:border-b sm:[&:nth-last-child(-n+2)]:border-b-0 " +
  "sm:[&:not(:nth-child(2n))]:border-r " +
  "lg:[&:nth-last-child(-n+2)]:border-b lg:[&:nth-last-child(-n+3)]:border-b-0 " +
  "lg:[&:not(:nth-child(2n))]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r";

function IndustryCell({
  industryKey,
  entry,
  locale,
  delay,
}: {
  industryKey: IndustryKey;
  entry: IndustryEntry;
  locale: Locale;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={`group ${CELL_BORDERS}`}>
      <Link
        href={localizeHref(locale, `/industries/${entry.slug}`)}
        className="flex h-full flex-col items-center p-8 text-center sm:p-10"
      >
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          <Image src={ICONS[industryKey]} alt="" fill className="object-contain" />
        </div>
        <div className="relative mt-6 flex flex-1 flex-col items-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(65% 65% at 50% 100%, var(--color-accent-soft) 0%, transparent 100%)" }}
          />
          <h3 className="text-2xl font-bold text-ink">{entry.title}</h3>
          <p className="mt-1.5 text-xs text-ink-soft">{entry.subtitle}</p>
          <p className="mt-3 max-w-xs text-base leading-relaxed text-ink-soft">{entry.description}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function IndustriesSection({
  section,
  industries,
  locale,
}: {
  section: HomeDictionary["industries"];
  industries: Record<IndustryKey, IndustryEntry>;
  locale: Locale;
}) {
  const entries: [IndustryKey, IndustryEntry][] = [
    ["healthcare", industries.healthcare],
    ["homeServices", industries.homeServices],
    ["professionalServices", industries.professionalServices],
    ["realEstate", industries.realEstate],
    ["rentals", industries.rentals],
    ["beautyWellness", industries.beautyWellness],
  ];

  return (
    <section id="industries" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={section.headline} subcopy={section.subhead} align="center" />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([key, entry], i) => (
            <IndustryCell key={key} industryKey={key} entry={entry} locale={locale} delay={i * 60} />
          ))}
        </div>
      </Container>
    </section>
  );
}
