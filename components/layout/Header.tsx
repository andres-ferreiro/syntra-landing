"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";

export function Header({
  locale,
  nav,
}: {
  locale: Locale;
  nav: HomeDictionary["nav"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-paper/55 backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href={`/${locale}`} className="flex items-center">
          <Logo height={24} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={localizeHref(locale, link.href)}
              className="rounded-pill px-3.5 py-1.5 text-sm font-medium text-ink-soft backdrop-blur-md transition-colors duration-200 hover:bg-paper/45 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher locale={locale} label={nav.languageSwitcherLabel} />
          </div>
          <CtaButton label={nav.cta.label} href={localizeHref(locale, nav.cta.href)} size="md" variant="glass" />

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/40 bg-paper/30 text-ink backdrop-blur-md transition-colors duration-200 hover:bg-paper/55 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border/40 bg-paper/90 backdrop-blur-xl backdrop-saturate-150 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={localizeHref(locale, link.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base font-medium text-ink hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between px-2">
              <LanguageSwitcher locale={locale} label={nav.languageSwitcherLabel} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
