"use client";

import { useMemo, useRef, type RefObject } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { FlowIcon } from "@/components/patterns/FlowIcon";

type Direction = "vertical" | "horizontal";

function Connector() {
  return (
    <div className="flex h-10 w-full flex-shrink-0 items-center px-1 sm:h-auto sm:w-10">
      <div className="h-px w-full bg-border sm:h-full sm:w-full" />
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        className="hidden text-ink-soft sm:block"
      >
        <path d="M0 0L6 5L0 10" fill="currentColor" />
      </svg>
    </div>
  );
}

function VerticalFlow({ steps }: { steps: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useMemo<RefObject<HTMLDivElement | null>[]>(
    () => steps.map(() => ({ current: null })),
    [steps]
  );

  return (
    <div ref={containerRef} className="relative flex flex-col items-start gap-5">
      {steps.slice(0, -1).map((_, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={anchorRefs[index]}
          toRef={anchorRefs[index + 1]}
          curvature={0}
          pathColor="#e5e3db"
          pathWidth={2}
          pathOpacity={1}
          gradientStartColor="#22c3d1"
          gradientStopColor="#2bd9a3"
          duration={2.5}
          delay={index * 0.3}
          repeatDelay={2}
        />
      ))}
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div
            ref={(el) => {
              anchorRefs[index].current = el;
            }}
            className="z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface shadow-card"
          >
            <FlowIcon label={step} />
          </div>
          <span className="text-sm font-medium text-ink">{step}</span>
        </div>
      ))}
    </div>
  );
}

export function WorkflowDiagram({
  steps,
  direction,
}: {
  steps: string[];
  direction: Direction;
}) {
  if (direction === "vertical") {
    return <VerticalFlow steps={steps} />;
  }

  return (
    <ol className="flex flex-col items-stretch sm:flex-row sm:items-center">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-1 flex-col sm:items-center">
          <div className="w-full rounded-card border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-ink">
            {step}
          </div>
          {index < steps.length - 1 ? <Connector /> : null}
        </li>
      ))}
    </ol>
  );
}
