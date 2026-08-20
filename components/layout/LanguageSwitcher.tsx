"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const target = locale === "es" ? "en" : "es";
  const rest = pathname.replace(/^\/(es|en)/, "");
  const href = `/${target}${rest}`;

  return (
    <Link
      href={href}
      className="rounded-pill border border-border px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink"
      aria-label={`Switch language to ${target}`}
    >
      {label}
    </Link>
  );
}
