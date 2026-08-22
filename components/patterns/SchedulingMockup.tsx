"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/i18n";

// Illustrative only — a made-up month grid and booking, same rule
// ResponseTimeChart/CalendarMockup follow (no real client data exists yet).
// Positioned to bleed past the tile's bottom-right edge (clipped by the
// tile's own overflow-hidden) so it reads as "peeking out of the corner"
// rather than a normal contained card.
const MONTH_LABEL: Record<Locale, string> = { en: "September", es: "Septiembre" };
const BOOKED_LABEL: Record<Locale, string> = { en: "28 booked", es: "28 agendadas" };
const DAY_LABELS: Record<Locale, string[]> = {
  en: ["T", "W", "T", "F", "S", "S"],
  es: ["M", "X", "J", "V", "S", "D"],
};
const DATES = [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28];
const BOOKED = new Set([4, 9, 12, 17, 21, 25]);

const NOTIFICATION: Record<Locale, { title: string; time: string; when: string; detail: string }> = {
  en: { title: "New booking", time: "now", when: "Saturday · 1:00 PM", detail: "Consultation · Sarah M." },
  es: { title: "Nueva cita", time: "ahora", when: "Sábado · 1:00 PM", detail: "Consulta · Sarah M." },
};

export function SchedulingMockup({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const days = DAY_LABELS[locale];
  const notification = NOTIFICATION[locale];

  return (
    <div className="absolute inset-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Anchors both cards to the same bottom-right corner point, so the
          notification's offset is always relative to the calendar itself —
          not the tile — regardless of where the calendar sits or moves. */}
      <div className="absolute -bottom-8 -right-8 w-[320px] sm:w-[380px]">
        {/* The calendar itself retreats further into the corner on hover,
            making room for the notification instead of the two overlapping
            flatly. */}
        <motion.div
          animate={{ x: hovered ? 22 : 0, y: hovered ? 30 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 26 }}
          className="rounded-2xl border border-border bg-paper p-4 shadow-card sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">{MONTH_LABEL[locale]}</span>
            <span className="text-xs text-ink-soft">{BOOKED_LABEL[locale]}</span>
          </div>
          <div className="mt-4 grid grid-cols-6 gap-1.5">
            {days.map((d, i) => (
              <span key={`day-${i}`} className="text-center text-[10px] font-medium text-ink-soft/60">
                {d}
              </span>
            ))}
            {DATES.map((date) => {
              const booked = BOOKED.has(date);
              return (
                <span
                  key={date}
                  className={`flex h-8 items-center justify-center rounded-lg text-xs font-medium sm:h-9 ${
                    booked ? "bg-accent-strong text-paper" : "bg-surface text-ink-soft"
                  }`}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-14 -left-4 z-20 w-[250px] rounded-2xl border border-border/60 bg-surface p-5 text-ink shadow-[0_20px_40px_-16px_rgba(19,21,26,0.28)] sm:w-[280px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">{notification.title}</span>
                <span className="text-xs text-ink-soft">{notification.time}</span>
              </div>
              <p className="mt-3 text-xl font-semibold tracking-tight">{notification.when}</p>
              <p className="mt-1 text-sm text-ink-soft">{notification.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
