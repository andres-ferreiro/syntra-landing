import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverted";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-200 focus-visible:outline-offset-4 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent-strong shadow-card hover:-translate-y-0.5",
  secondary:
    "border border-border text-ink hover:border-ink hover:-translate-y-0.5",
  inverted:
    "bg-paper text-ink hover:bg-accent-soft shadow-card hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function CtaButton({
  label,
  href,
  variant = "primary",
  size = "md",
  icon,
}: {
  label: string;
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {label}
      {icon}
    </Link>
  );
}
