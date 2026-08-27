import { CtaButton } from "@/components/ui/CtaButton";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { PricingTier } from "@/content/pricing-types";

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 flex-shrink-0 text-accent-strong"
    >
      <path d="M3.5 9.5 7 13l7.5-8" />
    </svg>
  );
}

// Scope tiers, not a price list — no dollar amount is shown anywhere here
// (see DESIGN.md's Content Rules). The middle tier gets a "Recomendado"
// badge as an editorial signal from mandhy about its own structure, not a
// popularity stat, so it doesn't run into the no-fabricated-evidence rule.
export function PricingCard({
  tier,
  locale,
  recommendedLabel,
}: {
  tier: PricingTier;
  locale: Locale;
  recommendedLabel: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-card border p-7 ${
        tier.recommended ? "border-accent-strong shadow-card" : "border-border"
      }`}
    >
      {tier.recommended ? (
        <span className="mb-4 inline-flex w-fit items-center rounded-pill bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">
          {recommendedLabel}
        </span>
      ) : null}
      <h3 className="text-xl font-medium tracking-tight text-ink">{tier.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tier.description}</p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <CtaButton
          label={tier.cta.label}
          href={localizeHref(locale, tier.cta.href)}
          variant={tier.recommended ? "primary" : "secondary"}
          size="md"
        />
      </div>
    </div>
  );
}
