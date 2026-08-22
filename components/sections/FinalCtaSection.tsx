import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";

export function FinalCtaSection({
  finalCta,
  locale,
}: {
  finalCta: HomeDictionary["finalCta"];
  locale: Locale;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative flex flex-col items-start gap-8 overflow-hidden rounded-card bg-ink px-8 py-14 sm:items-center sm:px-16 sm:py-20 sm:text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-25"
            style={{
              background:
                "radial-gradient(50% 60% at 15% 0%, var(--color-accent) 0%, transparent 60%), radial-gradient(45% 55% at 100% 100%, var(--color-mint) 0%, transparent 60%)",
            }}
          />
          <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            {finalCta.headline}
          </h2>
          <CtaButton
            label={finalCta.cta.label}
            href={localizeHref(locale, finalCta.cta.href)}
            variant="inverted"
            size="lg"
          />
        </Reveal>
      </Container>
    </section>
  );
}
