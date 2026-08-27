import "server-only";
import type { Locale } from "@/lib/i18n";
import type { PricingDictionary } from "@/content/pricing-types";
import { es } from "@/content/pricing-dictionaries/es";
import { en } from "@/content/pricing-dictionaries/en";

const dictionaries: Record<Locale, PricingDictionary> = { es, en };

export function getPricingDictionary(locale: Locale): PricingDictionary {
  return dictionaries[locale];
}
