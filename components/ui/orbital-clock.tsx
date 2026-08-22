"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Adapted for this project:
//   - Palette remapped from blue/slate + `dark:` variants to the site's teal
//     accent and ink tokens (this codebase is light-only).
//   - `time` starts as null and is seeded in an effect. Reading `new Date()`
//     during render would make the server and client markup disagree (hand
//     transforms + the date string), which React reports as a hydration error.
//   - The unused `orbit` keyframes block was dropped, which also removes the
//     styled-jsx dependency.
//   - The 50ms tick is skipped entirely under `prefers-reduced-motion`; the
//     clock still renders, it just doesn't sweep.
export function OrbitalClock({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [time, setTime] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = -Infinity;

    const tick = (t: number) => {
      // Throttled to ~20fps: smooth enough for a sweeping second hand without
      // re-rendering on every frame. Driven by rAF rather than setInterval so
      // it pauses automatically while the tab is hidden.
      if (t - last >= 50) {
        last = t;
        setTime(new Date());
        // Reduced motion: render the current time once, then stop.
        if (reduceMotion) return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || reduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 8, y: y * 8 });
  };

  const seconds = time ? time.getSeconds() + time.getMilliseconds() / 1000 : 0;
  const minutes = time ? time.getMinutes() + seconds / 60 : 0;
  const hours = time ? (time.getHours() % 12) + minutes / 60 : 0;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30;

  const formatDate = () =>
    time
      ? time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      : "";

  return (
    <div
      ref={containerRef}
      className={`relative flex cursor-pointer select-none items-center justify-center text-ink [--orb-center:rgba(19,21,26,0.9)] [--orb-marker-strong:rgba(19,21,26,0.55)] [--orb-marker-weak:rgba(19,21,26,0.22)] [--orb-primary:var(--color-accent-strong)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: "600px" }}
    >
      <div
        className="relative h-52 w-52 transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)` }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: isHovered
              ? "radial-gradient(circle, color-mix(in srgb, var(--orb-primary) 28%, transparent) 0%, transparent 70%)"
              : "transparent",
            transform: isHovered ? "scale(1.3)" : "scale(1)",
          }}
        />

        {/* Clock face — a tighter, quieter shadow than the site's default
            `shadow-card` (tuned for rectangular elevated mockups); a full
            spread under a round face read as a heavy halo. */}
        <div className="absolute inset-2 rounded-full border border-border bg-surface shadow-[0_6px_16px_-10px_rgba(19,21,26,0.22),0_1px_3px_-1px_rgba(19,21,26,0.06)]">
          {/* Inner subtle ring */}
          <div
            className={`absolute inset-3 rounded-full border transition-all duration-500 ${
              isHovered ? "border-accent-strong/40" : "border-ink/5"
            }`}
          />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            const isActive = Math.floor(hours) === i || Math.floor(hours) === i + 12;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);

            return (
              <div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full transition-all duration-300"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  background: isActive
                    ? "var(--orb-primary)"
                    : i % 3 === 0
                      ? "var(--orb-marker-strong)"
                      : "var(--orb-marker-weak)",
                  boxShadow: isActive
                    ? "0 0 10px color-mix(in srgb, var(--orb-primary) 70%, transparent)"
                    : "none",
                }}
              />
            );
          })}

          {/* Hour hand */}
          <div
            className="absolute bottom-1/2 left-1/2 w-1 origin-bottom rounded-full bg-ink transition-all duration-200"
            style={{ height: "28%", transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
          />

          {/* Minute hand */}
          <div
            className="absolute bottom-1/2 left-1/2 w-0.5 origin-bottom rounded-full bg-ink-soft transition-all duration-200"
            style={{ height: "36%", transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
          />

          {/* Second hand */}
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full"
            style={{
              width: "1px",
              height: "40%",
              transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              background: "var(--orb-primary)",
              boxShadow: "0 0 8px color-mix(in srgb, var(--orb-primary) 70%, transparent)",
            }}
          />

          {/* Center dot */}
          <div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full transition-all duration-300"
            style={{
              transform: "translate(-50%, -50%)",
              background: isHovered ? "var(--orb-primary)" : "var(--orb-center)",
              boxShadow: isHovered
                ? "0 0 12px color-mix(in srgb, var(--orb-primary) 80%, transparent)"
                : "none",
            }}
          />
        </div>
      </div>

      {/* Date reveal on hover */}
      <div
        className="absolute -bottom-7 left-1/2 flex w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500"
        style={{
          transform: `translateX(-50%) translateY(${isHovered ? 0 : -10}px)`,
          opacity: isHovered ? 1 : 0,
          color: "var(--orb-primary)",
        }}
      >
        {formatDate()}
      </div>
    </div>
  );
}
