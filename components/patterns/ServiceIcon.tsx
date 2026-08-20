function IconPaths({ title }: { title: string }) {
  const key = title.toLowerCase();

  if (key.includes("automat")) {
    return <path d="M9 3.5a5.5 5.5 0 1 1-5.2 3.7M3.5 3.5v3.7h3.7" />;
  }
  if (key === "ai" || key === "ia") {
    return (
      <path d="M9 2.5 10.3 6.7 14.5 8 10.3 9.3 9 13.5 7.7 9.3 3.5 8 7.7 6.7 9 2.5Z M14 12l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" />
    );
  }
  if (key.includes("crm")) {
    return (
      <>
        <rect x="3" y="3.5" width="12" height="4" rx="1.2" />
        <rect x="3" y="10.5" width="7.5" height="4" rx="1.2" />
      </>
    );
  }
  if (key.includes("web") || key.includes("funnel") || key.includes("sitios")) {
    return (
      <>
        <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" />
        <path d="M2.5 6.7h13" />
        <circle cx="4.6" cy="5.1" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="6.4" cy="5.1" r="0.5" fill="currentColor" stroke="none" />
        <path d="M6.5 9.3 9 13.5l2.5-4.2H6.5Z" />
      </>
    );
  }
  if (key.includes("omnichannel") || key.includes("comunicaci")) {
    return (
      <>
        <path d="M3 4h9v6.5H8l-3 2.5v-2.5H3V4Z" />
        <circle cx="6" cy="7" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="9" cy="7" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="12" cy="7" r="0.6" fill="currentColor" stroke="none" />
      </>
    );
  }
  if (key.includes("cita") || key.includes("appointment")) {
    return (
      <>
        <rect x="3" y="3.5" width="12" height="11" rx="1.5" />
        <path d="M3 7h12M6 2.5v2M12 2.5v2" />
        <path d="M6.5 10.2 8.2 11.8 11.5 8.5" />
      </>
    );
  }
  if (key.includes("reputa")) {
    return <path d="M9 2.8 11 6.9l4.5.6-3.3 3.1.8 4.5L9 12.9l-4 2.2.8-4.5-3.3-3.1 4.5-.6L9 2.8Z" />;
  }
  return (
    <>
      <path d="M3 14.5V9M8 14.5V5M13 14.5V7.5" />
      <path d="M2.5 14.5h13" />
    </>
  );
}

export function ServiceIcon({ title }: { title: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-strong"
    >
      <IconPaths title={title} />
    </svg>
  );
}
