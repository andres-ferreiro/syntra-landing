import type { Locale } from "@/lib/i18n";

// This tool's own illustrative assumption for how much of an execution-lost
// lead is realistically recoverable with faster, more consistent follow-up.
// Not an audited third-party statistic — see the methodology copy in
// content/calculator-dictionaries, which discloses this to the visitor.
export const RECOVERABLE_FACTOR = 0.6;

export const DEFAULT_RESPONSE_TIME_THRESHOLD_HOURS = 4;

export interface CalculatorInputs {
  monthlyLeads: number;
  avgDealValue: number;
  closeRate: number; // 0-100
  lostToExecutionPct: number; // 0-100
  avgHoursToFirstContact: number; // context-only, not used in the math below
}

export interface CalculatorResults {
  currentMonthlyRevenue: number;
  leadsLostToExecution: number;
  recoverableLeads: number;
  additionalMonthlyRevenue: number;
  potentialMonthlyRevenue: number;
  annualGap: number;
  isSlowResponse: boolean;
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  monthlyLeads: 150,
  avgDealValue: 2500,
  closeRate: 20,
  lostToExecutionPct: 30,
  avgHoursToFirstContact: 12,
};

export function calculateRevenueLeak(
  inputs: CalculatorInputs,
  responseTimeThresholdHours: number = DEFAULT_RESPONSE_TIME_THRESHOLD_HOURS
): CalculatorResults {
  const currentMonthlyRevenue = inputs.monthlyLeads * (inputs.closeRate / 100) * inputs.avgDealValue;
  const leadsLostToExecution = inputs.monthlyLeads * (inputs.lostToExecutionPct / 100);
  const recoverableLeads = leadsLostToExecution * RECOVERABLE_FACTOR;
  const additionalMonthlyRevenue = recoverableLeads * (inputs.closeRate / 100) * inputs.avgDealValue;
  const potentialMonthlyRevenue = currentMonthlyRevenue + additionalMonthlyRevenue;
  const annualGap = additionalMonthlyRevenue * 12;

  return {
    currentMonthlyRevenue,
    leadsLostToExecution,
    recoverableLeads,
    additionalMonthlyRevenue,
    potentialMonthlyRevenue,
    annualGap,
    isSlowResponse: inputs.avgHoursToFirstContact > responseTimeThresholdHours,
  };
}

const CURRENCY_LOCALE: Record<Locale, string> = { es: "es-MX", en: "en-US" };

export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatWholeNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE[locale], { maximumFractionDigits: 0 }).format(value);
}
