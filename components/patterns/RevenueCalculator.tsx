"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { CalculatorResultCard } from "@/components/patterns/CalculatorResultCard";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  calculateRevenueLeak,
  formatCurrency,
  formatWholeNumber,
  DEFAULT_INPUTS,
  type CalculatorInputs,
} from "@/lib/calculator";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { CalculatorDictionary } from "@/content/calculator-types";

export function RevenueCalculator({ dict, locale }: { dict: CalculatorDictionary; locale: Locale }) {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const results = useMemo(
    () => calculateRevenueLeak(inputs, dict.inputs.responseTimeFlag.thresholdHours),
    [inputs, dict.inputs.responseTimeFlag.thresholdHours]
  );

  function setInput<K extends keyof CalculatorInputs>(key: K) {
    return (value: number) => setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            {dict.inputs.sectionLabel}
          </span>

          <div className="mt-6 flex flex-col gap-7">
            <Slider
              id="monthlyLeads"
              label={dict.inputs.monthlyLeads.label}
              value={inputs.monthlyLeads}
              min={10}
              max={1000}
              step={10}
              onChange={setInput("monthlyLeads")}
              formatValue={(v) => `${formatWholeNumber(v, locale)} ${dict.inputs.monthlyLeads.unit ?? ""}`.trim()}
            />
            <Slider
              id="avgDealValue"
              label={dict.inputs.avgDealValue.label}
              value={inputs.avgDealValue}
              min={100}
              max={50000}
              step={100}
              onChange={setInput("avgDealValue")}
              formatValue={(v) => formatCurrency(v, locale)}
            />
            <Slider
              id="closeRate"
              label={dict.inputs.closeRate.label}
              value={inputs.closeRate}
              min={1}
              max={80}
              step={1}
              onChange={setInput("closeRate")}
              formatValue={(v) => `${v}${dict.inputs.closeRate.unit ?? ""}`}
            />
            <Slider
              id="lostToExecutionPct"
              label={dict.inputs.lostToExecutionPct.label}
              value={inputs.lostToExecutionPct}
              min={0}
              max={80}
              step={1}
              onChange={setInput("lostToExecutionPct")}
              formatValue={(v) => `${v}${dict.inputs.lostToExecutionPct.unit ?? ""}`}
              helper={dict.inputs.lostToExecutionPct.helper}
            />
            <Slider
              id="avgHoursToFirstContact"
              label={dict.inputs.avgHoursToFirstContact.label}
              value={inputs.avgHoursToFirstContact}
              min={0}
              max={72}
              step={1}
              onChange={setInput("avgHoursToFirstContact")}
              formatValue={(v) => `${v}${dict.inputs.avgHoursToFirstContact.unit ?? ""}`}
              helper={results.isSlowResponse ? dict.inputs.responseTimeFlag.warningText : undefined}
            />
          </div>
        </div>

        <CalculatorResultCard results={results} dict={dict} locale={locale} />
      </div>

      <div className="mt-12 flex flex-col items-center gap-5 border-t border-border pt-10 text-center">
        <h2 className="max-w-xl text-balance text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {dict.finalCta.headline}
        </h2>
        {dict.finalCta.intro ? (
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{dict.finalCta.intro}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CtaButton
            label={dict.finalCta.primaryCta.label}
            href={localizeHref(locale, dict.finalCta.primaryCta.href)}
            size="lg"
          />
          <CtaButton
            label={dict.finalCta.secondaryCta.label}
            href={localizeHref(locale, dict.finalCta.secondaryCta.href)}
            variant="secondary"
            size="lg"
          />
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-ink-soft">{dict.disclaimer}</p>
      </div>
    </div>
  );
}
