import { OrbitalClock } from "@/components/ui/orbital-clock";

export function ClockMockup() {
  return (
    // Same slot treatment as GlobeMockup — a soft accent glow behind the
    // visual — except the clock is sized to sit fully inside the 220px box
    // rather than bleeding off it. A cropped clock face would read as broken.
    <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft)_0%,transparent_62%)]"
      />
      <OrbitalClock />
    </div>
  );
}
