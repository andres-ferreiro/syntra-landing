"use client";

import { cn } from "@/lib/utils";

export function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  helper,
  className,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  helper?: string;
  className?: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold tabular-nums text-ink">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="slider-control mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={formatValue(value)}
        style={{
          background: `linear-gradient(to right, var(--color-accent-strong) ${percent}%, var(--color-border) ${percent}%)`,
        }}
      />
      {helper ? <p className="mt-2 text-xs leading-relaxed text-ink-soft">{helper}</p> : null}
    </div>
  );
}
