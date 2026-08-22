'use client';

import { useReducedMotion } from 'motion/react';
import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/line-charts-1';
import type { Locale } from '@/lib/i18n';

const COPY: Record<Locale, { mandhy: string; human: string; fast: string; slow: string; days: string[] }> = {
  en: {
    mandhy: 'mandhy',
    human: 'A person on your team',
    fast: 'Answered instantly',
    slow: 'Still waiting',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  es: {
    mandhy: 'mandhy',
    human: 'Una persona de tu equipo',
    fast: 'Respondido al instante',
    slow: 'Sigue esperando',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  },
};

// Illustrative only — the y-axis is intentionally unlabeled and the tooltip
// shows a qualitative state rather than a duration, because no real response
// data exists yet and PRODUCT.md bans presenting fabricated metrics as fact.
//
// Higher = answered faster, so mandhy rides along the top with the gradient
// filling the card beneath it, and a person's line stays low and erratic.
// (An earlier version plotted raw response *time*, which put mandhy's line on
// the floor — technically correct but it read as "less".)
//
// Two constraints on these numbers:
//   - mandhy climbs from left to right, broken only by shallow dips, and ends
//     on its high point.
//   - the human series is deliberately NOT the inverse of mandhy. An earlier
//     version was exactly anti-correlated (mandhy peaked wherever the human
//     dipped), which made the two lines read as one mirrored shape. This one
//     has its own rhythm and no trend.
// mandhy's floor (50) also stays above the human ceiling (42) so they never
// cross.
const RAW = [
  { mandhy: 50, human: 36 },
  { mandhy: 64, human: 42 },
  { mandhy: 58, human: 20 },
  { mandhy: 78, human: 30 },
  { mandhy: 72, human: 24 },
  { mandhy: 104, human: 34 },
];

function ChartLabel({ label, color, small }: { label: string; color: string; small?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={small ? 'size-2 rounded-full border-[3px] bg-surface' : 'size-3 rounded-full border-4 bg-surface'}
        style={{ borderColor: color }}
      />
      <span className="text-ink-soft">{label}</span>
    </div>
  );
}

// Declared at module scope (as in the source component) — a tooltip defined
// inside the render body would be a new component type every render.
// Recharts clones this element with `active`/`payload`/`label`.
function CustomTooltip({
  active,
  payload,
  label,
  copy,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
  label?: string;
  copy?: (typeof COPY)[Locale];
}) {
  if (!active || !payload?.length || !copy) return null;

  return (
    <div className="min-w-[150px] rounded-lg border border-border bg-surface p-3 shadow-card">
      <div className="mb-2 text-xs font-medium tracking-wide text-ink-soft">{label}</div>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-xs">
            <ChartLabel
              label={entry.dataKey === 'mandhy' ? copy.mandhy : copy.human}
              color={entry.color}
            />
            <span className="font-medium text-ink">
              {entry.dataKey === 'mandhy' ? copy.fast : copy.slow}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResponseTimeChart({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const copy = COPY[locale];

  const chartConfig = {
    mandhy: { label: copy.mandhy, color: 'var(--color-accent-strong)' },
    human: { label: copy.human, color: 'var(--color-ink-soft)' },
  } satisfies ChartConfig;

  const data = RAW.map((d, i) => ({ ...d, day: copy.days[i] }));

  return (
    // Fixed to the same 220px slot GlobeMockup and ClockMockup use, so all
    // three advantage-card visuals occupy identical space regardless of
    // content — chart + legend are sized to fit inside it rather than
    // overflowing into the card's caption area below. The legend sits above
    // the chart, small, so the chart itself reads as the dominant element
    // and lands flush at the bottom of the slot.
    <div className="flex h-[220px] w-full flex-col justify-end gap-2">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px]">
        <ChartLabel label={copy.mandhy} color="var(--color-accent-strong)" small />
        <ChartLabel label={copy.human} color="var(--color-ink-soft)" small />
      </div>
      <ChartContainer
        config={chartConfig}
        className="h-[180px] w-full [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
      >
        <ComposedChart data={data} margin={{ top: 16, right: 24, left: 24, bottom: 4 }}>
          <defs>
            <linearGradient id="mandhyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-mandhy)" stopOpacity={0.26} />
              <stop offset="100%" stopColor="var(--color-mandhy)" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" horizontal vertical={false} />

          {/* Hidden, but it fixes the framing: the padded domain keeps mandhy
              pinned near the top with headroom instead of clipping the stroke,
              and tickCount drives how many grid rules are drawn. */}
          <YAxis hide domain={[0, 115]} tickCount={4} />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--color-ink-soft)' }}
            tickMargin={12}
            interval={0}
          />

          <ChartTooltip
            content={<CustomTooltip copy={copy} />}
            cursor={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
          />

          {/* A person on the team — dashed, erratic, low. */}
          <Line
            type="linear"
            dataKey="human"
            stroke="var(--color-human)"
            strokeOpacity={0.4}
            strokeWidth={1.75}
            strokeDasharray="4 4"
            isAnimationActive={!reduceMotion}
            animationDuration={900}
            dot={{
              fill: 'var(--color-surface)',
              strokeWidth: 1.75,
              r: 3.5,
              stroke: 'var(--color-human)',
              strokeOpacity: 0.4,
              // Without this the dot circles inherit the line's dash pattern
              // and render as broken arcs.
              strokeDasharray: '0',
            }}
          />

          {/* mandhy — solid and dominant along the top, gradient beneath. */}
          <Area
            type="linear"
            dataKey="mandhy"
            stroke="var(--color-mandhy)"
            strokeWidth={2.5}
            fill="url(#mandhyGradient)"
            isAnimationActive={!reduceMotion}
            animationDuration={900}
            animationBegin={150}
            dot={{
              fill: 'var(--color-surface)',
              strokeWidth: 2.5,
              r: 4,
              stroke: 'var(--color-mandhy)',
            }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
