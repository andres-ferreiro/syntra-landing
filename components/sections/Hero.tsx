import { Comfortaa } from "next/font/google";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { CalendarMockup } from "@/components/patterns/CalendarMockup";
import { ChatMockup } from "@/components/patterns/ChatMockup";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { ChatMessage, HomeDictionary } from "@/content/types";

// Scoped to just the "mandhy" word in the hero headline — everything else
// on the site, including the rest of this heading, stays on Geist Sans.
const comfortaa = Comfortaa({ weight: "400", subsets: ["latin"] });

// Splits a leading "mandhy" off the headline so the brand name can carry its
// own font/color — every headline in both locales opens with it by
// convention (see BRAND.md), but this degrades gracefully if that changes.
function HeroHeadline({ text }: { text: string }) {
  const brand = "mandhy";
  if (!text.toLowerCase().startsWith(brand)) {
    return <>{text}</>;
  }
  return (
    <>
      <span className={`${comfortaa.className} font-normal text-accent-strong`}>
        {text.slice(0, brand.length)}
      </span>
      {text.slice(brand.length)}
    </>
  );
}

export function Hero({
  hero,
  locale,
  chatMessages,
}: {
  hero: HomeDictionary["hero"];
  locale: Locale;
  chatMessages: ChatMessage[];
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] bg-[radial-gradient(55%_45%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%),radial-gradient(28%_20%_at_68%_34%,color-mix(in_srgb,var(--color-mint)_28%,transparent)_0%,transparent_100%)]"
      />

      <Container className="flex flex-col items-center gap-7 pt-24 text-center sm:pt-32">
        <h1 className="max-w-3xl text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <HeroHeadline text={hero.headline} />
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {hero.subcopy}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton
            label={hero.primaryCta.label}
            href={localizeHref(locale, hero.primaryCta.href)}
            size="lg"
          />
          <CtaButton
            label={hero.secondaryCta.label}
            href={localizeHref(locale, hero.secondaryCta.href)}
            variant="secondary"
            size="lg"
          />
        </div>
      </Container>

      <Container>
        <div className="relative mx-auto mt-14 h-[440px] max-w-5xl sm:mt-16 sm:h-[460px] lg:h-[540px]">
          <div className="absolute left-1/2 top-0 h-80 w-[97%] -translate-x-1/2 sm:h-[380px] sm:w-[92%] lg:h-[440px] lg:w-[860px]">
            <CalendarMockup locale={locale} />
          </div>
          <div className="absolute right-0 top-[24%] h-72 w-[78%] sm:right-[2%] sm:top-[16%] sm:h-80 sm:w-72 lg:top-[9%] lg:h-[440px] lg:w-[340px]">
            <ChatMockup messages={chatMessages} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
