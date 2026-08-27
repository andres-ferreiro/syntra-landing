"use client";

import { Comfortaa } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { localizeHref, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";
import type { HomeDictionary } from "@/content/types";

// Same brand font as the "mandhy" word in the Hero headline, reused here for
// the giant background wordmark so the two brand-name treatments match.
const comfortaa = Comfortaa({ weight: "400", subsets: ["latin"] });

// The final CTA and the footer are one continuous gradient block (no
// section border between them) — the CTA sits at the top rather than
// floating mid-page, and the giant "mandhy" wordmark anchors the bottom.
// The CTA itself is skipped on /contact, /schedule, /pricing, /calculator,
// and /industries/[slug], since those pages already end with their own
// conversion action (a form, a booking widget, or a tailored CTA) —
// repeating a generic "request an audit" right below is redundant, not
// persuasive.
export function Footer({
  locale,
  finalCta,
  footer,
}: {
  locale: Locale;
  finalCta: HomeDictionary["finalCta"];
  footer: HomeDictionary["footer"];
}) {
  const pathname = usePathname();
  const hideCta =
    pathname.endsWith("/contact") ||
    pathname.endsWith("/schedule") ||
    pathname.endsWith("/pricing") ||
    pathname.endsWith("/calculator") ||
    pathname.includes("/industries/");

  return (
    <footer className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--color-accent-soft) 0%, transparent 65%), radial-gradient(55% 45% at 85% 100%, color-mix(in srgb, var(--color-mint) 20%, transparent) 0%, transparent 70%), var(--color-paper)",
        }}
      />

      {hideCta ? null : (
        <Container className="pt-20 sm:pt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
            <h2 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {finalCta.headline}
            </h2>
            <CtaButton
              label={finalCta.cta.label}
              href={localizeHref(locale, finalCta.cta.href)}
              size="lg"
            />
          </Reveal>
        </Container>
      )}

      <Container
        className={`flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-start sm:justify-between ${
          hideCta ? "mt-16 sm:mt-20" : "mt-20 sm:mt-24"
        }`}
      >
        <div className="max-w-sm">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo height={22} />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{footer.tagline}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} mandhy. {footer.rights}</span>
      </Container>

      <p
        aria-hidden
        className={`${comfortaa.className} pointer-events-none select-none whitespace-nowrap pb-[2vw] text-center text-[22vw] font-normal leading-none text-ink/[0.05] sm:text-[18vw]`}
      >
        mandhy
      </p>
    </footer>
  );
}
