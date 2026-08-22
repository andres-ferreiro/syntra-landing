export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Dictionary-provided hrefs (e.g. "/contact") are locale-agnostic since
// content is shared across languages; every real page route lives under
// /[locale], so internal paths need the current locale prefixed at render
// time. Anchors and external/protocol links point at something already
// resolvable on the current page and must pass through unchanged.
export function localizeHref(locale: Locale, href: string): string {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  return `/${locale}${href}`;
}
