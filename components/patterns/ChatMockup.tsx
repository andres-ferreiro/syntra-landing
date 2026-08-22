"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import type { ChatMessage } from "@/content/types";

const STATUS_LABEL: Record<Locale, string> = {
  en: "Online now",
  es: "En línea",
};

const INPUT_PLACEHOLDER: Record<Locale, string> = {
  en: "Message mandhy...",
  es: "Escribe a mandhy...",
};

const TYPING_DURATION = 1100;
const PAUSE_AFTER_AI = 700;
const PAUSE_AFTER_USER = 900;
const START_DELAY = 700;

function wait(ms: number, onTimeout: (t: ReturnType<typeof setTimeout>) => void) {
  return new Promise<void>((resolve) => {
    onTimeout(setTimeout(resolve, ms));
  });
}

export function ChatMockup({ messages, locale }: { messages: ChatMessage[]; locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? messages.length : 0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const track = (t: ReturnType<typeof setTimeout>) => timeouts.push(t);

    async function play(index: number) {
      if (cancelled || index >= messages.length) return;
      const message = messages[index];

      if (message.from === "ai") {
        setIsTyping(true);
        await wait(TYPING_DURATION, track);
        if (cancelled) return;
        setIsTyping(false);
      }

      if (cancelled) return;
      setVisibleCount(index + 1);
      await wait(message.from === "ai" ? PAUSE_AFTER_AI : PAUSE_AFTER_USER, track);
      play(index + 1);
    }

    track(setTimeout(() => play(0), START_DELAY));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [messages, reduceMotion]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount, isTyping]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-card border border-white/60 bg-white/28 shadow-card ring-1 ring-inset ring-white/40 backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="flex flex-none items-center gap-2 border-b border-white/50 px-4 py-3">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent-strong">
          AI
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-ink sm:text-sm">mandhy Assistant</p>
          <p className="flex items-center gap-1 text-[10px] text-ink-soft/70">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent-strong" />
            {STATUS_LABEL[locale]}
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-3.5">
        {messages.slice(0, visibleCount).map((message, i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-[82%] flex-none rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-[13px] ${
              message.from === "user"
                ? "self-end rounded-tr-sm bg-ink text-paper"
                : "self-start rounded-tl-sm border border-border/60 bg-white/85 text-ink"
            }`}
          >
            {message.text}
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-fit flex-none items-center gap-1 self-start rounded-2xl rounded-tl-sm border border-border/60 bg-white/85 px-3.5 py-2.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ink-soft/50"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex flex-none items-center gap-2 border-t border-white/50 px-3.5 py-3">
        <span className="flex-1 truncate rounded-full border border-border/60 bg-white/60 px-3.5 py-2 text-[11px] text-ink-soft/60 sm:text-xs">
          {INPUT_PLACEHOLDER[locale]}
        </span>
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-paper">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <path
              d="M2 6.5L11 2L6.5 11L5.3 7.2L2 6.5Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}
