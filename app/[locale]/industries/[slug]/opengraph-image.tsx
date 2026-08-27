import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { getIndustryDictionary } from "@/content/get-industry-dictionary";
import type { IndustryKey } from "@/content/industry-types";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

const INDUSTRY_KEYS: IndustryKey[] = [
  "healthcare",
  "homeServices",
  "professionalServices",
  "realEstate",
  "rentals",
  "beautyWellness",
];

function getEntry(locale: Locale, key: IndustryKey) {
  return getIndustryDictionary(locale)[key];
}

function findKeyBySlug(locale: Locale, slug: string): IndustryKey | null {
  return INDUSTRY_KEYS.find((key) => getEntry(locale, key).slug === slug) ?? null;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    INDUSTRY_KEYS.map((key) => ({ locale, slug: getEntry(locale, key).slug }))
  );
}

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const key = findKeyBySlug(locale, slug);
  if (!key) notFound();

  return new ImageResponse(await renderOgImage(getEntry(locale, key).title), size);
}
