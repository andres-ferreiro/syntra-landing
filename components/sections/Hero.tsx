import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import type { HomeDictionary } from "@/content/types";

export function Hero({ hero }: { hero: HomeDictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]"
      />
      <Container className="flex flex-col items-start gap-8 py-24 sm:py-32">
        <h1 className="max-w-3xl text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {hero.subcopy}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton label={hero.primaryCta.label} href={hero.primaryCta.href} size="lg" />
          <CtaButton
            label={hero.secondaryCta.label}
            href={hero.secondaryCta.href}
            variant="secondary"
            size="lg"
          />
        </div>
      </Container>
    </section>
  );
}
