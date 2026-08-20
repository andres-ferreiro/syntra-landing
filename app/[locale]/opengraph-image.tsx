import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/get-dictionary";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "es");
  return new ImageResponse(await renderOgImage(dict.hero.headline), size);
}
