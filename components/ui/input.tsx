import * as React from "react";
import { cn } from "@/lib/utils";

// `field-control` (globals.css) suppresses the sitewide `:focus-visible`
// ring in favor of this border-color change — same treatment every other
// text field on the site uses (see ContactSection's `fieldBaseClass`).
export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "field-control w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/60 focus-visible:border-accent-strong disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
