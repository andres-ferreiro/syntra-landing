import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_INTL } from "@/lib/site";

function EmailIcon() {
  return (
    <>
      <rect x="2.5" y="4" width="13" height="10" rx="1.5" />
      <path d="M3.5 5.2 9 9.5l5.5-4.3" />
    </>
  );
}

function PhoneIcon() {
  return (
    <path d="M6.5 3.5c.4 1.3.9 2.4 1.6 3.5-.6.6-.9 1-1.4 1.3.9 2 2.3 3.4 4.3 4.3.3-.5.7-.8 1.3-1.4 1.1.7 2.2 1.2 3.5 1.6v2.2c0 .8-.7 1.4-1.5 1.3-6-.7-10-4.7-10.7-10.7C3.5 4.7 4.1 4 5 4h1.5Z" />
  );
}

function WhatsappIcon() {
  return (
    <path d="M9 2a7 7 0 0 0-6 10.6L2 16l3.5-1a7 7 0 1 0 3.5-13Zm3.9 9.9c-.2.5-.9.9-1.5 1-.4.1-.9.2-2.6-.6-2.2-1-3.6-3.2-3.7-3.4-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.4.2.4.7 1.1 1.4 1.6.7.6 1.3.8 1.5.9.2.1.3.1.4 0l.5-.6c.2-.2.3-.2.5-.1l1.4.7c.2.1.3.1.4.3.1.2.1.6-.1 1.1Z" />
  );
}

function ContactPill({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2.5 rounded-pill border border-border bg-surface px-4 py-2.5 transition-colors duration-200 hover:border-ink"
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
        className="flex-shrink-0 text-accent-strong"
      >
        {icon}
      </svg>
      <span className="text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-soft"> · {value}</span>
      </span>
    </a>
  );
}

export function DirectContactLinks({
  heading,
  emailLabel,
  phoneLabel,
  whatsappLabel,
  whatsappMessage,
}: {
  heading: string;
  emailLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  whatsappMessage: string;
}) {
  return (
    <div>
      <span className="mb-2.5 block text-sm font-medium text-ink">{heading}</span>
      <div className="flex flex-wrap gap-2.5">
        <ContactPill
          href={`mailto:${CONTACT_EMAIL}`}
          icon={<EmailIcon />}
          label={emailLabel}
          value={CONTACT_EMAIL}
        />
        <ContactPill
          href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
          icon={<PhoneIcon />}
          label={phoneLabel}
          value={CONTACT_PHONE}
        />
        <ContactPill
          href={`https://wa.me/${CONTACT_PHONE_INTL}?text=${encodeURIComponent(whatsappMessage)}`}
          icon={<WhatsappIcon />}
          label={whatsappLabel}
          value={CONTACT_PHONE}
        />
      </div>
    </div>
  );
}
