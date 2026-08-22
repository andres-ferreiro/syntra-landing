import { FunnelChart } from "@/components/ui/funnel-chart";
import type { Locale } from "@/lib/i18n";

// Illustrative only — round, made-up numbers with no claimed source, same
// rule ResponseTimeChart follows (PRODUCT.md bans presenting fabricated
// stats as fact). Stages mirror the classic site/funnel conversion path a
// "Funnels" service card would visualize, not a real client's data.
const STAGES = [
  { key: "visitors", value: 1000 },
  { key: "leads", value: 480 },
  { key: "booked", value: 260 },
  { key: "customers", value: 150 },
] as const;

const LABELS: Record<Locale, Record<(typeof STAGES)[number]["key"], string>> = {
  en: {
    visitors: "Visitors",
    leads: "Leads",
    booked: "Booked",
    customers: "Customers",
  },
  es: {
    visitors: "Visitantes",
    leads: "Leads",
    booked: "Citas agendadas",
    customers: "Clientes",
  },
};

// A single teal-to-mint sweep (accent-strong → accent → mint) instead of a
// multi-hue rainbow, per DESIGN.md's "one restrained accent color" rule.
const RAMP = ["#0f7a83", "#14929c", "#22c3d1", "#27d1bd", "#2bd9a3"];

export function FunnelMockup({ locale }: { locale: Locale }) {
  const labels = LABELS[locale];

  const data = STAGES.map((stage, i) => ({
    label: labels[stage.key],
    value: stage.value,
    gradient: [
      { offset: "0%", color: RAMP[i] },
      { offset: "100%", color: RAMP[Math.min(i + 1, RAMP.length - 1)] },
    ],
  }));

  return (
    <div className="flex h-full w-full items-center">
      <FunnelChart data={data} layers={3} className="w-full" />
    </div>
  );
}
