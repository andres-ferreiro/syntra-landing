import { formatCurrency, formatWholeNumber, type CalculatorResults } from "@/lib/calculator";
import type { CalculatorDictionary } from "@/content/calculator-types";
import type { Locale } from "@/lib/i18n";

export function CalculatorResultCard({
  results,
  dict,
  locale,
}: {
  results: CalculatorResults;
  dict: Pick<CalculatorDictionary, "results" | "methodology">;
  locale: Locale;
}) {
  const { results: copy, methodology } = dict;

  return (
    <div className="flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-card">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">{copy.sectionLabel}</span>

      <p className="mt-4 text-sm text-ink-soft">{copy.moneyLeftLabel}</p>
      <p className="mt-1 font-mono text-4xl font-semibold tracking-tight text-accent-strong sm:text-5xl">
        {formatCurrency(results.additionalMonthlyRevenue, locale)}
        <span className="ml-1 font-sans text-lg font-medium text-ink-soft">{copy.perMonthSuffix}</span>
      </p>

      <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-6">
        <div>
          <p className="text-xs text-ink-soft">{copy.currentRevenueLabel}</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink">{formatCurrency(results.currentMonthlyRevenue, locale)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-soft">{copy.potentialRevenueLabel}</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink">{formatCurrency(results.potentialMonthlyRevenue, locale)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-soft">{copy.leadsLostLabel}</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink">{formatWholeNumber(results.leadsLostToExecution, locale)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-soft">{copy.leadsRecoverableLabel}</p>
          <p className="mt-1 font-mono text-lg font-medium text-ink">{formatWholeNumber(results.recoverableLeads, locale)}</p>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between rounded-xl bg-accent-soft px-4 py-3">
        <span className="text-sm font-medium text-ink">{copy.annualGapLabel}</span>
        <span className="font-mono text-lg font-semibold text-accent-strong">
          {formatCurrency(results.annualGap, locale)}
          <span className="ml-1 font-sans text-xs font-medium text-ink-soft">{copy.perYearSuffix}</span>
        </span>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-medium text-ink">{methodology.headline}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{methodology.body}</p>
      </div>
    </div>
  );
}
