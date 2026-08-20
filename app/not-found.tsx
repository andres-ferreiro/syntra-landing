import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

// True root not-found — the only reliable catch for a genuinely unmatched
// URL when the root layout lives under a dynamic [locale] segment (nested
// not-found.tsx files only catch explicit notFound() throws, not unmatched
// routes — see Next.js docs on top-level dynamic-segment root layouts).
// No app/layout.tsx exists, so Next generates an implicit root document
// shell itself — this must NOT render its own <html>/<body> (that would
// nest a second document inside Next's own, producing invalid markup and
// a hydration mismatch). The font variable is applied to the wrapper div
// instead of <html>, since that's the only element this component owns.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export default function NotFound() {
  return (
    <div
      className={`${geistSans.variable} flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-20 text-center font-sans antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- standalone document, no next/image context needed for a 40px decorative mark */}
      <img src="/images/syntra-logo.png" alt="" width={40} height={40} />
      <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        404
      </h1>
      <p className="mt-3 text-lg text-ink-soft">
        Página no encontrada — Page not found.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/es"
          className="rounded-pill bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
        >
          Ir al inicio
        </Link>
        <Link
          href="/en"
          className="rounded-pill border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
