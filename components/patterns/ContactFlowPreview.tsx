"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Calendar/CRM icon paths are the site's existing hand-drawn line-icon
// language, lifted verbatim from the pre-revamp FlowIcon.tsx (git history
// c08555f). WhatsApp uses the site's real logo asset (public/images/
// whatsapp-icon.webp, already used in IntegrationsMockup.tsx) rather than a
// hand-drawn glyph — a real brand mark reads better than an approximation
// of one, the same reasoning the reference this was adapted from applied by
// using actual Gmail/Calendar icons instead of generic shapes.
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3.5" width="12" height="11" rx="1.5" />
      <path d="M3 7h12M6 2.5v2M12 2.5v2" />
      <path d="M6.5 10.2 8.2 11.8 11.5 8.5" />
    </svg>
  );
}

function CrmIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3.5" width="12" height="4" rx="1.2" />
      <rect x="3" y="10.5" width="7.5" height="4" rx="1.2" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2.5c-2 0-3.5 1.6-3.5 3.5v2c0 .8-.3 1.5-.9 2.1L3.5 11h11l-1.1-.9c-.6-.6-.9-1.3-.9-2.1v-2c0-1.9-1.5-3.5-3.5-3.5Z" />
      <path d="M7.3 13.2a1.7 1.7 0 0 0 3.4 0" />
    </svg>
  );
}

// Per-action badge styling — a distinct soft-tinted rounded square per
// integration, matching the reference's colorful app-icon look, instead of
// one repeated plain circle. Calendar stays on-brand teal; CRM keeps its
// violet (precedented by CrmMockup's STAGE_DOT_COLORS using the same
// #8b5cf6 for its "Contacted" stage); the team-notify bell gets the
// reference's blue. WhatsApp is the one exception: the site's real logo
// asset, not an icon.
const ACTION_BADGES = [
  { Icon: CalendarIcon, bg: "var(--color-accent-soft)", fg: "var(--color-accent-strong)" },
  { Icon: CrmIcon, bg: "#ede9fe", fg: "#7c3aed" },
  { kind: "whatsapp" as const },
  { Icon: BellIcon, bg: "#dbeafe", fg: "#3b82f6" },
];

function ActionBadge({ index }: { index: number }) {
  const badge = ACTION_BADGES[index];
  if (!badge || "kind" in badge) {
    return (
      <span
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: "#efeeea" }}
      >
        <Image src="/images/whatsapp-icon.webp" alt="" aria-hidden width={26} height={26} />
      </span>
    );
  }
  const { Icon, bg, fg } = badge;
  return (
    <span
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: bg, color: fg }}
    >
      <Icon />
    </span>
  );
}

interface Action {
  label: string;
  category: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-shrink-0 transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export function ContactFlowPreview({
  chat,
  actionsSummary,
  actions,
}: {
  chat: { user: string; ai: string };
  actionsSummary: string;
  actions: Action[];
}) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="w-full max-w-md rounded-card border border-border bg-surface p-6 shadow-card sm:p-7"
    >
      {/* The moment mandhy answers — two chat bubbles, staggered in once on
          mount rather than a looping typing sequence (this panel is a
          static snapshot, not a demo). Blue (accent-strong) stays reserved
          for icons only — the AI bubble is a plain tinted surface, not a
          blue one, per "white section, blue only for accents". */}
      <div className="flex flex-col gap-2.5">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-sm leading-relaxed text-paper"
        >
          {chat.user}
        </motion.p>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.95 }}
          className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-border bg-paper px-4 py-2.5 text-sm leading-relaxed text-ink"
        >
          {chat.ai}
        </motion.p>
      </div>

      <div className="my-5 h-px bg-border" />

      {/* Then everything that reply quietly triggered — collapsed by
          default in the reference this was adapted from, but opened by
          default here since this is a passive marketing panel, not an
          interactive log a visitor is expected to click into. */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 text-ink-soft transition-colors duration-200 hover:text-ink"
      >
        <span className="flex items-center -space-x-2">
          {actions.map((action, i) => (
            <span
              key={action.category}
              style={{ zIndex: i, rotate: i % 2 === 0 ? "-6deg" : "6deg" }}
              className="rounded-xl ring-2 ring-surface"
            >
              <ActionBadge index={i} />
            </span>
          ))}
        </span>
        <span className="text-sm font-medium">{actionsSummary}</span>
        <ChevronIcon open={expanded} />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "mt-4 max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ol className="flex flex-col">
          {actions.map((action, i) => (
            <li key={action.category} className="flex items-stretch gap-3">
              <div className="flex flex-col items-center self-stretch">
                <ActionBadge index={i} />
                {i < actions.length - 1 ? (
                  <span className="my-1.5 w-px flex-1 bg-border" style={{ minHeight: "0.75rem" }} />
                ) : null}
              </div>
              <div className={i < actions.length - 1 ? "pb-7" : ""}>
                <p className="text-sm font-medium text-ink">{action.label}</p>
                <p className="text-xs text-ink-soft">{action.category}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
