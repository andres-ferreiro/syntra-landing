import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n";
import { getCalculatorDictionary } from "@/content/get-calculator-dictionary";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getCalculatorDictionary(isLocale(locale) ? locale : "es");
  return new ImageResponse(await renderOgImage(dict.hero.headline), size);
}
