import * as React from "react";
import { cn } from "@/lib/utils";

// A plain interactive <button> primitive — distinct from `CtaButton.tsx`,
// which renders a `<Link>` for navigation. This one exists for shadcn-style
// composed components (currently just the phone input's country-select
// trigger) that need a real button, not a link.
type ButtonVariant = "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors duration-200 outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  outline: "border border-border bg-surface text-ink hover:border-ink",
  ghost: "text-ink-soft hover:text-ink",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
