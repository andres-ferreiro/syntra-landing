import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import { getDictionary } from "@/content/get-dictionary";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function buildPageMetadata(
  locale: Locale,
  {
    title,
    description,
    path,
    localizedPaths,
  }: { title: string; description: string; path: string; localizedPaths?: Partial<Record<Locale, string>> }
): Metadata {
  const canonicalPath = `/${locale}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${localizedPaths?.[l] ?? path}`])),
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return buildPageMetadata(locale, {
    title: dict.meta.title,
    description: dict.meta.description,
    path: "",
  });
}
