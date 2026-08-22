"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/i18n";

const START_HOUR = 7;
const HOURS = [7, 8, 9, 10, 11, 12, 13];
const NOW_HOUR = 9.75;

const DAY_LABELS: Record<Locale, string[]> = {
  en: ["MON", "TUE", "WED", "THU", "FRI"],
  es: ["LUN", "MAR", "MIÉ", "JUE", "VIE"],
};

const DATE_RANGE_LABEL: Record<Locale, string> = {
  en: "16 – 20 Feb",
  es: "16 – 20 feb",
};

const TODAY_LABEL: Record<Locale, string> = {
  en: "Today",
  es: "Hoy",
};

const VIEW_LABELS: Record<Locale, string[]> = {
  en: ["Day", "Week", "Month"],
  es: ["Día", "Semana", "Mes"],
};

const DATES = [16, 17, 18, 19, 20];

const APPOINTMENT_COLORS = [
  { tint: "rgba(34, 195, 209, 0.16)", border: "rgba(34, 195, 209, 0.35)", text: "#0f7a83" },
  { tint: "rgba(139, 92, 246, 0.14)", border: "rgba(139, 92, 246, 0.3)", text: "#6d28d9" },
  { tint: "rgba(245, 158, 11, 0.16)", border: "rgba(245, 158, 11, 0.32)", text: "#b45309" },
  { tint: "rgba(43, 217, 163, 0.18)", border: "rgba(43, 217, 163, 0.35)", text: "#0f7a5c" },
  { tint: "rgba(251, 113, 133, 0.14)", border: "rgba(251, 113, 133, 0.32)", text: "#be123c" },
];

const APPOINTMENTS: { day: number; name: string; start: number; duration: number; color: number }[] = [
  { day: 0, name: "Ruddy Brill", start: 7, duration: 1, color: 0 },
  { day: 0, name: "Olivia Grant", start: 9.5, duration: 1.5, color: 3 },
  { day: 1, name: "Design Review", start: 9, duration: 1, color: 1 },
  { day: 1, name: "Product Roadmap", start: 10.5, duration: 1.5, color: 2 },
  { day: 2, name: "Sprint Planning", start: 8, duration: 1.5, color: 2 },
  { day: 2, name: "Bug Triage", start: 11.5, duration: 1, color: 4 },
  { day: 3, name: "Client Call", start: 8.5, duration: 0.5, color: 0 },
  { day: 3, name: "Design System", start: 11, duration: 1, color: 1 },
  { day: 4, name: "John Woods", start: 8, duration: 1, color: 4 },
  { day: 4, name: "Lucy Bell", start: 10.5, duration: 1, color: 1 },
];

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className="text-ink-soft/60">
      <path
        d={direction === "left" ? "M4.5 1L2 3.5L4.5 6" : "M2.5 1L5 3.5L2.5 6"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarMockup({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const days = DAY_LABELS[locale];
  const views = VIEW_LABELS[locale];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-card border border-white/60 bg-white/22 shadow-card ring-1 ring-inset ring-white/40 backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="flex flex-none items-center justify-between gap-2 border-b border-white/50 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="rounded-full border border-ink/10 bg-white/60 px-2 py-0.5 text-[9px] font-medium text-ink-soft sm:text-[11px]">
            {TODAY_LABEL[locale]}
          </span>
          <div className="flex items-center gap-1.5">
            <ChevronIcon direction="left" />
            <ChevronIcon direction="right" />
          </div>
          <span className="text-[11px] font-medium text-ink-soft sm:text-sm">
            {DATE_RANGE_LABEL[locale]}
          </span>
        </div>

        <div className="hidden items-center gap-0.5 rounded-full border border-ink/10 bg-white/50 p-0.5 sm:flex">
          {views.map((view, i) => (
            <span
              key={view}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium ${
                i === 1 ? "bg-white text-ink shadow-sm" : "text-ink-soft/70"
              }`}
            >
              {view}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-none border-b border-white/40">
        <div className="w-8 flex-none sm:w-11" />
        <div className="grid flex-1 grid-cols-3 sm:grid-cols-5">
          {days.map((label, dayIdx) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-0.5 py-1.5 sm:py-2 ${
                dayIdx >= 3 ? "hidden sm:flex" : "flex"
              }`}
            >
              <span className="text-[8.5px] font-medium tracking-wide text-ink-soft/70 sm:text-[10px]">
                {label}
              </span>
              <span className="text-[11px] font-semibold text-ink sm:text-xs">{DATES[dayIdx]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex w-8 flex-none flex-col sm:w-11 [--row-h:30px] sm:[--row-h:38px] lg:[--row-h:46px]">
          {HOURS.map((hour) => (
            <div key={hour} className="flex justify-end pr-1 sm:pr-1.5" style={{ height: "var(--row-h)" }}>
              <span className="-translate-y-1/2 text-[7.5px] text-ink-soft/60 sm:text-[9px]">{hour}h</span>
            </div>
          ))}
        </div>

        <div className="relative flex-1 [--row-h:30px] sm:[--row-h:38px] lg:[--row-h:46px]">
          <div className="pointer-events-none absolute inset-0 flex flex-col">
            {HOURS.map((hour) => (
              <div key={hour} className="border-t border-ink/[0.06] first:border-t-0" style={{ height: "var(--row-h)" }} />
            ))}
          </div>

          <div
            className="pointer-events-none absolute left-0 right-0 z-10 flex items-center"
            style={{ top: `calc(var(--row-h) * ${NOW_HOUR - START_HOUR})` }}
          >
            <span className="-ml-[3px] h-1.5 w-1.5 flex-none rounded-full bg-accent-strong" />
            <span className="h-px flex-1 bg-accent-strong/50" />
          </div>

          <div className="relative grid h-full grid-cols-3 divide-x divide-ink/[0.06] sm:grid-cols-5">
            {days.map((label, dayIdx) => (
              <div
                key={label}
                className={`relative ${dayIdx >= 3 ? "hidden sm:block" : "block"}`}
              >
                {APPOINTMENTS.filter((a) => a.day === dayIdx).map((appt, i) => {
                  const color = APPOINTMENT_COLORS[appt.color];
                  return (
                    <motion.div
                      key={appt.name}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4 + (dayIdx * 2 + i) * 0.05,
                      }}
                      className="absolute left-0.5 right-0.5 overflow-hidden rounded-md border px-1 py-0.5 shadow-[0_1px_2px_rgba(19,21,26,0.06)] backdrop-blur-sm sm:left-1 sm:right-1 sm:px-1.5 sm:py-1"
                      style={{
                        top: `calc(var(--row-h) * ${appt.start - START_HOUR})`,
                        height: `calc(var(--row-h) * ${appt.duration} - 2px)`,
                        backgroundColor: color.tint,
                        borderColor: color.border,
                      }}
                    >
                      <p
                        className="truncate text-[8px] font-medium leading-tight sm:text-[10px]"
                        style={{ color: color.text }}
                      >
                        {appt.name}
                      </p>
                      {appt.duration > 0.75 ? (
                        <p className="truncate text-[7px] leading-tight text-ink-soft/80 sm:text-[8.5px]">
                          {String(Math.floor(appt.start)).padStart(2, "0")}:
                          {appt.start % 1 === 0 ? "00" : "30"}
                        </p>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
