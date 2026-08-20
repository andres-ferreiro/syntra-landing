function ChannelIcon({ label }: { label: string }) {
  const key = label.toLowerCase();

  if (key.includes("whatsapp")) {
    return (
      <path d="M9 2a7 7 0 0 0-6 10.6L2 16l3.5-1a7 7 0 1 0 3.5-13Zm3.9 9.9c-.2.5-.9.9-1.5 1-.4.1-.9.2-2.6-.6-2.2-1-3.6-3.2-3.7-3.4-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.4.2.4.7 1.1 1.4 1.6.7.6 1.3.8 1.5.9.2.1.3.1.4 0l.5-.6c.2-.2.3-.2.5-.1l1.4.7c.2.1.3.1.4.3.1.2.1.6-.1 1.1Z" />
    );
  }
  if (key.includes("instagram")) {
    return (
      <>
        <rect x="2.5" y="2.5" width="13" height="13" rx="4" />
        <circle cx="9" cy="9" r="3.2" />
        <circle cx="13" cy="5" r="0.8" fill="currentColor" stroke="none" />
      </>
    );
  }
  if (key.includes("facebook")) {
    return <path d="M11.5 5.5h1.5V3h-2c-1.7 0-3 1.3-3 3v1.5H6.5V10H8v6h2.5v-6h1.8l.3-2.5h-2.1V6c0-.3.2-.5.5-.5Z" fill="currentColor" stroke="none" />;
  }
  if (key.includes("sms") || key.includes("mensaje")) {
    return <path d="M3 4h12v8H8l-3 3v-3H3V4Z" />;
  }
  if (key.includes("email") || key.includes("correo")) {
    return (
      <>
        <rect x="2.5" y="4" width="13" height="10" rx="1.5" />
        <path d="M3.5 5.2 9 9.5l5.5-4.3" />
      </>
    );
  }
  if (key.includes("chat")) {
    return <path d="M3 4h12v7.5H9l-3 2.5v-2.5H3V4Z" />;
  }
  return (
    <path d="M6.5 3.5c.4 1.3.9 2.4 1.6 3.5-.6.6-.9 1-1.4 1.3.9 2 2.3 3.4 4.3 4.3.3-.5.7-.8 1.3-1.4 1.1.7 2.2 1.2 3.5 1.6v2.2c0 .8-.7 1.4-1.5 1.3-6-.7-10-4.7-10.7-10.7C3.5 4.7 4.1 4 5 4h1.5Z" />
  );
}

export function IntegrationRow({ channels }: { channels: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {channels.map((channel) => (
        <li
          key={channel}
          className="flex items-center gap-2.5 rounded-pill border border-border bg-surface px-4 py-2.5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-strong"
          >
            <ChannelIcon label={channel} />
          </svg>
          <span className="text-sm font-medium text-ink">{channel}</span>
        </li>
      ))}
    </ul>
  );
}
