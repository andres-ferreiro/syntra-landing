import "server-only";
import type { Locale } from "@/lib/i18n";
import type { CalculatorDictionary } from "@/content/calculator-types";
import { es } from "@/content/calculator-dictionaries/es";
import { en } from "@/content/calculator-dictionaries/en";

const dictionaries: Record<Locale, CalculatorDictionary> = { es, en };

export function getCalculatorDictionary(locale: Locale): CalculatorDictionary {
  return dictionaries[locale];
}
