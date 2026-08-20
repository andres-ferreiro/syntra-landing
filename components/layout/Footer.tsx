import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";

export function Footer({
  locale,
  footer,
}: {
  locale: Locale;
  footer: HomeDictionary["footer"];
}) {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
          >
            <Logo size={24} />
            Syntra
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{footer.tagline}</p>
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
          <Link
            href={footer.contactCta.href}
            className="text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            {footer.contactCta.label}
          </Link>
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Syntra. {footer.rights}</span>
      </Container>
    </footer>
  );
}
