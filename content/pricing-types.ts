export interface PricingTier {
  name: string;
  description: string;
  recommended?: boolean;
  features: string[];
  cta: { label: string; href: string };
}

export interface ValueComparisonRow {
  label: string;
  caption?: string;
  elsewhereRange: string;
}

export interface PricingDictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    intro: string;
  };
  noPriceListNote: string;
  recommendedLabel: string;
  tiers: PricingTier[];
  valueComparison: {
    headline: string;
    intro: string;
    elsewhereColumnLabel: string;
    mandhyColumnLabel: string;
    includedLabel: string;
    rows: ValueComparisonRow[];
    footnote: string;
  };
  calculatorTeaser?: {
    headline: string;
    cta: { label: string; href: string };
  };
  finalCta: {
    headline: string;
    cta: { label: string; href: string };
  };
}
