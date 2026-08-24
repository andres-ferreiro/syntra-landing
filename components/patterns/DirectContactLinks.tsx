import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_INTL } from "@/lib/site";

const linkClass = "font-medium text-ink underline decoration-border underline-offset-2 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong";

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
    <p className="text-xs text-ink-soft">
      {heading}{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
        {emailLabel}
      </a>
      {" · "}
      <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className={linkClass}>
        {phoneLabel}
      </a>
      {" · "}
      <a
        href={`https://wa.me/${CONTACT_PHONE_INTL}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {whatsappLabel}
      </a>
    </p>
  );
}
