import type { Cta } from "@/content/types";

export interface CalculatorSliderCopy {
  label: string;
  unit?: string;
  helper?: string;
}

export interface CalculatorDictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    intro: string;
  };
  inputs: {
    sectionLabel: string;
    monthlyLeads: CalculatorSliderCopy;
    avgDealValue: CalculatorSliderCopy;
    closeRate: CalculatorSliderCopy;
    lostToExecutionPct: CalculatorSliderCopy;
    avgHoursToFirstContact: CalculatorSliderCopy;
    responseTimeFlag: { thresholdHours: number; warningText: string };
  };
  results: {
    sectionLabel: string;
    moneyLeftLabel: string;
    potentialRevenueLabel: string;
    currentRevenueLabel: string;
    leadsLostLabel: string;
    leadsRecoverableLabel: string;
    annualGapLabel: string;
    perMonthSuffix: string;
    perYearSuffix: string;
  };
  methodology: {
    headline: string;
    body: string;
  };
  finalCta: {
    headline: string;
    intro?: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  disclaimer: string;
}
