import type { PricingDictionary } from "@/content/pricing-types";

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-strong"
    >
      <path d="M3.5 9.5 7 13l7.5-8" />
    </svg>
  );
}

// The light-theme equivalent of the classic dark "cost of doing it
// piecemeal" comparison table — same structure (category rows, a market-
// reference price column, a checkmark column), just built on this site's
// paper/ink palette instead of the usual dark SaaS-comparison look, per
// DESIGN.md's light-only rule. Every category maps to a capability
// PRODUCT.md already confirms mandhy offers — nothing here is a service
// mandhy doesn't actually provide.
export function ValueComparisonTable({ dict }: { dict: PricingDictionary["valueComparison"] }) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-border">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border bg-surface px-5 py-3 sm:px-7">
        <span className="text-xs font-medium text-ink-soft">{/* category column has no header label */}</span>
        <span className="text-right text-xs font-medium text-ink-soft">{dict.elsewhereColumnLabel}</span>
        <span className="w-16 text-right text-xs font-medium text-accent-strong sm:w-20">
          {dict.mandhyColumnLabel}
        </span>
      </div>

      {dict.rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 sm:px-7"
        >
          <div>
            <p className="text-sm font-medium text-ink">{row.label}</p>
            {row.caption ? <p className="text-xs text-ink-soft">{row.caption}</p> : null}
          </div>
          <span className="text-right text-sm text-ink-soft">{row.elsewhereRange}</span>
          <span className="flex w-16 justify-end sm:w-20">
            <CheckIcon />
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between gap-4 bg-accent-soft px-5 py-4 sm:px-7">
        <span className="text-sm font-medium text-ink">mandhy</span>
        <span className="text-sm font-medium text-accent-strong">{dict.includedLabel}</span>
      </div>
    </div>
  );
}
