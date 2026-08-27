import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { getIndustryDictionary } from "@/content/get-industry-dictionary";
import type { IndustryKey } from "@/content/industry-types";

const PATHS = ["", "/contact", "/schedule", "/pricing", "/calculator"];

const INDUSTRY_KEYS: IndustryKey[] = [
  "healthcare",
  "homeServices",
  "professionalServices",
  "realEstate",
  "rentals",
  "beautyWellness",
];

function industryEntries(): MetadataRoute.Sitemap {
  const dictByLocale = Object.fromEntries(LOCALES.map((l) => [l, getIndustryDictionary(l)]));

  return LOCALES.flatMap((locale) =>
    INDUSTRY_KEYS.map((key) => ({
      url: `${SITE_URL}/${locale}/industries/${dictByLocale[locale][key].slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/industries/${dictByLocale[l][key].slug}`])
        ),
      },
    }))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...industryEntries()];
}
