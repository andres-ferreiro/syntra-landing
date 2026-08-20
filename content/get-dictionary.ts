import "server-only";
import type { Locale } from "@/lib/i18n";
import type { HomeDictionary } from "@/content/types";
import { es } from "@/content/dictionaries/es";
import { en } from "@/content/dictionaries/en";

const dictionaries: Record<Locale, HomeDictionary> = { es, en };

export function getDictionary(locale: Locale): HomeDictionary {
  return dictionaries[locale];
}
