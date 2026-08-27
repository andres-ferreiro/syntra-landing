import "server-only";
import type { Locale } from "@/lib/i18n";
import type { IndustryDictionary } from "@/content/industry-types";
import { es } from "@/content/industry-dictionaries/es";
import { en } from "@/content/industry-dictionaries/en";

const dictionaries: Record<Locale, IndustryDictionary> = { es, en };

export function getIndustryDictionary(locale: Locale): IndustryDictionary {
  return dictionaries[locale];
}
