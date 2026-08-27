import type { ChatMessage, Cta } from "@/content/types";

export interface IndustryEntry {
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  intro: string;
  sampleConversation: ChatMessage[];
  painPoints: string[];
  adaptation: { headline: string; body: string };
  faq: { question: string; answer: string }[];
  finalCta: { headline: string; cta: Cta };
}

export type IndustryKey =
  | "healthcare"
  | "homeServices"
  | "professionalServices"
  | "realEstate"
  | "rentals"
  | "beautyWellness";

export type IndustryDictionary = Record<IndustryKey, IndustryEntry>;
