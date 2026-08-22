import { Globe } from "@/components/ui/globe";

export function GlobeMockup() {
  return (
    // The globe is deliberately larger than this box and pushed down, so only
    // its top portion is visible and the sphere bleeds off the bottom edge —
    // the framing Magic UI's own demo uses. `overflow-hidden` does the crop.
    <div className="relative h-[220px] w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-[640px] bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft)_0%,transparent_62%)]"
      />
      <div className="absolute left-1/2 -top-16 h-[640px] w-[640px] -translate-x-1/2">
        <Globe />
      </div>
    </div>
  );
}
