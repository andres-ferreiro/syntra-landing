"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/i18n";

// Contacts live inside their column like a real kanban board (not floating
// over it), and moving a contact between columns is just a change in which
// column's array it's filtered into — Motion's `layout` prop measures the
// before/after position itself and animates the difference, so no manual
// pixel math for the transition. Illustrative only (no real client data);
// "Sarah M." reuses the name from the Scheduling tile's booking notification
// so the two tiles read as one lead's journey.
const STAGES: Record<Locale, string[]> = {
  en: ["New", "Contacted", "Qualified", "Won"],
  es: ["Nuevo", "Contactado", "Calificado", "Ganado"],
};

// One dot color per stage — a restrained accent per column rather than
// tinting whole surfaces, per DESIGN.md's "used sparingly" rule.
const STAGE_DOT_COLORS = ["var(--color-accent-strong)", "#8b5cf6", "#f59e0b", "var(--color-mint)"];

interface Contact {
  id: string;
  name: string;
  meta: string;
  from: number;
  to: number;
}

const CONTACTS: Record<Locale, Contact[]> = {
  en: [
    { id: "marco", name: "Marco Ruiz", meta: "Quote", from: 0, to: 1 },
    { id: "sarah", name: "Sarah M.", meta: "Consultation", from: 1, to: 2 },
    { id: "elena", name: "Elena Vidal", meta: "Demo", from: 1, to: 1 },
    { id: "diego", name: "Diego Paz", meta: "Follow-up", from: 2, to: 2 },
    { id: "laura", name: "Laura Kim", meta: "Closed", from: 3, to: 3 },
  ],
  es: [
    { id: "marco", name: "Marco Ruiz", meta: "Cotización", from: 0, to: 1 },
    { id: "sarah", name: "Sarah M.", meta: "Consulta", from: 1, to: 2 },
    { id: "elena", name: "Elena Vidal", meta: "Demo", from: 1, to: 1 },
    { id: "diego", name: "Diego Paz", meta: "Seguimiento", from: 2, to: 2 },
    { id: "laura", name: "Laura Kim", meta: "Cerrado", from: 3, to: 3 },
  ],
};

export function CrmMockup({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const stages = STAGES[locale];
  const contacts = CONTACTS[locale];

  return (
    <div className="absolute inset-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -bottom-12 left-1/2 w-[520px] -translate-x-1/2 rounded-2xl border border-border bg-paper p-5 sm:w-[640px] sm:p-6">
        <div className="grid grid-cols-4 gap-3">
          {stages.map((stage, colIndex) => (
            <div key={stage} className="flex min-h-48 flex-col gap-2 rounded-xl bg-surface p-2.5 sm:min-h-64 sm:p-3">
              <div className="flex items-center gap-1.5 px-0.5">
                <span
                  aria-hidden
                  className="size-1.5 flex-none rounded-full"
                  style={{ backgroundColor: STAGE_DOT_COLORS[colIndex] }}
                />
                <span className="text-xs font-medium text-ink-soft">{stage}</span>
              </div>
              {contacts
                .filter((c) => (hovered ? c.to : c.from) === colIndex)
                .map((c) => (
                  <motion.div
                    key={c.id}
                    layout={!reduceMotion}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="rounded-lg border border-border bg-paper p-2"
                  >
                    <p className="truncate text-[11px] font-semibold text-ink">{c.name}</p>
                    <p className="truncate text-[10px] text-ink-soft">{c.meta}</p>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
