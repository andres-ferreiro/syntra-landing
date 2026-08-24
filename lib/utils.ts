import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// `clsx`/`tailwind-merge` were already project dependencies (used locally by
// `funnel-chart.tsx`'s own copy of this exact helper) — promoted here as the
// one shared `cn()` so shadcn-style primitives (button, popover, command,
// phone-input) can import it from the conventional `@/lib/utils` path
// instead of each vendoring their own.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
