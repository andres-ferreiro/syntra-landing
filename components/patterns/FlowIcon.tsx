function IconPaths({ label }: { label: string }) {
  const key = label.toLowerCase();

  if (key.includes("traf") || key.includes("tráf")) {
    return <path d="M3 14.5 8 4l2 5 2-3 3 8.5M3 14.5h12" />;
  }
  if (key.includes("lead") || key.includes("captaci")) {
    return (
      <>
        <path d="M3 4h12v7.5H8l-3 2.5v-2.5H3V4Z" />
        <circle cx="6.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="9" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="11.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
      </>
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
  if (key.includes("ia") || key.includes("ai") || key.includes("automat")) {
    return <path d="M9 2.5 10.3 6.7 14.5 8 10.3 9.3 9 13.5 7.7 9.3 3.5 8 7.7 6.7 9 2.5Z" />;
  }
  if (key.includes("seguimiento") || key.includes("follow")) {
    return (
      <>
        <path d="M3 4h12v7.5H8l-3 2.5v-2.5H3V4Z" />
        <path d="M6 7h6M6 9h4" />
      </>
    );
  }
  if (key.includes("cita") || key.includes("venta") || key.includes("appointment") || key.includes("sale")) {
    return (
      <>
        <rect x="3" y="3.5" width="12" height="11" rx="1.5" />
        <path d="M3 7h12M6 2.5v2M12 2.5v2" />
        <path d="M6.5 10.2 8.2 11.8 11.5 8.5" />
      </>
    );
  }
  if (key.includes("reseña") || key.includes("resena") || key.includes("review")) {
    return <path d="M9 2.8 11 6.9l4.5.6-3.3 3.1.8 4.5L9 12.9l-4 2.2.8-4.5-3.3-3.1 4.5-.6L9 2.8Z" />;
  }
  if (key.includes("reactivaci") || key.includes("reactivation")) {
    return <path d="M9 3.5a5.5 5.5 0 1 1-5.2 3.7M3.5 3.5v3.7h3.7" />;
  }
  return <circle cx="9" cy="9" r="2" />;
}

export function FlowIcon({ label }: { label: string }) {
  return (
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
      <IconPaths label={label} />
    </svg>
  );
}
