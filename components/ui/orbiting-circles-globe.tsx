"use client";

import type { CSSProperties, ReactNode } from "react";

// Adapted from Shadcn Space's "Orbiting Circles 02" pattern
// (shadcnspace.com/components/orbiting-circles): multiple rings of icons
// orbiting a center piece, bottom-anchored so only the upper half is ever in
// frame. The upstream version centers a Pro "ParticleSphereAnimation"
// component whose source isn't public; this version takes `center` as a
// plain ReactNode instead, so callers can drop in anything (here, this
// project's own cobe-based dot-globe). Icon content is also a ReactNode
// prop rather than a hardcoded <img>, so callers control how each icon
// renders (this project uses next/image throughout).
export interface OrbitRing {
  /** Tailwind size classes for the ring's diameter, e.g. "w-56 h-56 md:w-72 md:h-72". */
  size: string;
  duration: number;
  icons: { content: ReactNode; angle: number }[];
}

export function OrbitingCirclesGlobe({
  center,
  orbits,
  className,
}: {
  center: ReactNode;
  orbits: OrbitRing[];
  className?: string;
}) {
  return (
    <div className={`relative flex h-full w-full justify-center overflow-hidden ${className ?? ""}`}>
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-36 -translate-x-1/2 translate-y-1/2 sm:w-48">
        {center}
      </div>

      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({ ...ic, angle: ic.angle + 180 })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute left-1/2 top-0 -ml-6 flex h-1/2 origin-bottom flex-col items-center justify-start"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as CSSProperties
                }
              >
                <div
                  className="relative z-10 -mt-6 rounded-full border border-border bg-surface p-2.5 shadow-card sm:p-3"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as CSSProperties
                  }
                >
                  {iconData.content}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
