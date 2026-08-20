import "server-only";
import type { Locale } from "@/lib/i18n";
import type { ContactDictionary } from "@/content/contact-types";
import { es } from "@/content/contact-dictionaries/es";
import { en } from "@/content/contact-dictionaries/en";

const dictionaries: Record<Locale, ContactDictionary> = { es, en };

export function getContactDictionary(locale: Locale): ContactDictionary {
  return dictionaries[locale];
}
