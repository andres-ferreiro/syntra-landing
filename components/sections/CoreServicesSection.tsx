import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FunnelMockup } from "@/components/patterns/FunnelMockup";
import { SchedulingMockup } from "@/components/patterns/SchedulingMockup";
import { IntegrationsMockup } from "@/components/patterns/IntegrationsMockup";
import { CrmMockup } from "@/components/patterns/CrmMockup";
import type { Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";

// Four large tiles with a bento's signature asymmetry — each row pairs a
// wide tile with a narrow one, and the rows mirror each other (wide-left/
// narrow-right, then narrow-left/wide-right) so the grid reads as
// deliberately uneven rather than a plain equal-quadrant split.
function BentoTile({
  title,
  description,
  children,
  overlay,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  // Full-tile, absolutely positioned content that renders behind the header
  // (z-0) and is clipped by the tile's own rounded corner — for visuals that
  // bleed past the normal content flow, e.g. a card "peeking" out of frame.
  overlay?: ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-card border border-border bg-surface p-8 sm:p-10">
      {overlay}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">{description}</p>
      </div>
      {children ? (
        <div className="relative z-10 mt-6 flex-1 overflow-hidden">{children}</div>
      ) : !overlay ? (
        <div className="relative z-10 mt-8 flex-1 rounded-2xl border border-dashed border-border" />
      ) : null}
    </div>
  );
}

export function CoreServicesSection({
  coreServices,
  locale,
}: {
  coreServices: HomeDictionary["coreServices"];
  locale: Locale;
}) {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader headline={coreServices.headline} />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <Reveal delay={0} className="lg:col-span-3">
            <BentoTile title={coreServices.funnel.title} description={coreServices.funnel.description}>
              <FunnelMockup locale={locale} />
            </BentoTile>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-2">
            <BentoTile
              title={coreServices.scheduling.title}
              description={coreServices.scheduling.description}
              overlay={<SchedulingMockup locale={locale} />}
            />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            <BentoTile
              title={coreServices.integrations.title}
              description={coreServices.integrations.description}
              overlay={<IntegrationsMockup />}
            />
          </Reveal>
          <Reveal delay={180} className="lg:col-span-3">
            <BentoTile
              title={coreServices.crm.title}
              description={coreServices.crm.description}
              overlay={<CrmMockup locale={locale} />}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
