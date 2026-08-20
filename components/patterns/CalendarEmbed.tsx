"use client";

import { useState } from "react";

// Booking-calendar embed for the /schedule page and the contact form's
// post-submit step. Configure via NEXT_PUBLIC_CALENDAR_EMBED_URL (see
// .env.local.example). Prefill param names are the common convention for
// this kind of hosted booking widget but should be verified once a real
// embed URL is wired in.
export interface CalendarPrefill {
  name?: string;
  email?: string;
  phone?: string;
}

function buildSrc(baseUrl: string, prefill?: CalendarPrefill) {
  const url = new URL(baseUrl);
  if (prefill?.name) {
    const trimmed = prefill.name.trim();
    const [firstName, ...rest] = trimmed.split(/\s+/);
    const lastName = rest.join(" ");
    // Widget param naming isn't documented, so cover the common
    // conventions (camelCase, snake_case, and short forms) — unrecognized
    // params are ignored, so this is safe to send redundantly.
    if (firstName) {
      url.searchParams.set("firstName", firstName);
      url.searchParams.set("first_name", firstName);
      url.searchParams.set("fname", firstName);
    }
    if (lastName) {
      url.searchParams.set("lastName", lastName);
      url.searchParams.set("last_name", lastName);
      url.searchParams.set("lname", lastName);
    }
    url.searchParams.set("name", trimmed);
  }
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  if (prefill?.phone) url.searchParams.set("phone", prefill.phone);
  return url.toString();
}

export function CalendarEmbed({
  prefill,
  unavailableMessage,
  className = "",
}: {
  prefill?: CalendarPrefill;
  unavailableMessage: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL;

  if (!baseUrl) {
    return (
      <div className={`rounded-card border border-border bg-surface p-8 text-sm text-ink-soft ${className}`}>
        {unavailableMessage}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-card border border-border bg-surface ${className}`}>
      {!loaded ? (
        <div className="flex h-[720px] items-center justify-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent-strong" />
        </div>
      ) : null}
      <iframe
        src={buildSrc(baseUrl, prefill)}
        onLoad={() => setLoaded(true)}
        title="Booking calendar"
        className={loaded ? "h-[720px] w-full" : "h-0 w-full"}
        frameBorder="0"
      />
    </div>
  );
}
