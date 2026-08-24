"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isValidPhoneNumber, type Value as PhoneValue } from "react-phone-number-input";
import { trackEvent } from "@/lib/analytics";
import { CalendarEmbed } from "@/components/patterns/CalendarEmbed";
import { DirectContactLinks } from "@/components/patterns/DirectContactLinks";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneInput } from "@/components/ui/phone-input";
import { localizeHref, type Locale } from "@/lib/i18n";
import type { ContactDictionary } from "@/content/contact-types";

type Status = "idle" | "submitting" | "success" | "error";

// `field-control` (defined in globals.css) suppresses the sitewide
// `:focus-visible` outline ring specifically for these controls — the
// border-color change below is their own, sufficient focus indicator, and
// without this the ring stacks on top of it as a distracting double border.
// Width is deliberately NOT baked in here — the phone row below needs two
// different widths on the same base style, and appending a second `w-*`
// utility to override it is unreliable (which one wins depends on Tailwind's
// generated rule order, not the order the classes appear in the string —
// that's what made the dial-code select swallow the whole row earlier).
// `text-base sm:text-sm` (16px → 14px) isn't a visual choice — iOS Safari
// zooms the whole page in on focus for any input under 16px, which on a
// multi-step form means every "Continuar" tap re-triggers an unwanted zoom.
const fieldBaseClass =
  "field-control rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/60 focus-visible:border-accent-strong";
const inputClass = `${fieldBaseClass} w-full`;

const labelClass = "mb-1 block text-xs font-medium text-ink";


function Field({
  children,
  label,
  required,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label}
        {required ? <span className="text-accent-strong"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

// Owns the entire right-column body on /contact — not just the form — so
// the headline/secondary-CTA row can disappear once a request has been
// submitted (repeating "Agendar una llamada" above an identical button on
// the post-submit card read as redundant) and, if the visitor then opts
// into booking a time, the calendar can take over the whole column instead
// of being squeezed into a small scrolling box next to leftover content.
export function ContactSection({ dict, locale }: { dict: ContactDictionary; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorType, setErrorType] = useState<"generic" | "validation">("generic");
  const [channels, setChannels] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<
    { firstName: string; lastName: string; email: string; phone: string } | null
  >(null);
  const [showCalendar, setShowCalendar] = useState(false);
  // Controlled (not read via FormData like the other fields) because
  // `PhoneInput` owns formatting/country state itself — its `onChange`
  // already hands back a real E.164 string, so there's no more manual
  // dial-code-plus-digits concatenation to get wrong.
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const form = dict.form;
  const phoneInvalid = phoneTouched && !!phone && !isValidPhoneNumber(phone);

  // Three onboarding-style steps, one per fieldset — each fieldset is
  // `hidden` (not unmounted) so its fields stay out of the browser's native
  // validation and out of tab order on other steps, while FormData still
  // picks up every field's value at final submit regardless of which step
  // is currently shown.
  const STEP_COUNT = 3;
  const [step, setStep] = useState(0);
  // Named individually (not indexed from an array) so JSX can assign
  // `ref={step0Ref}` directly — indexing into an array of refs inside JSX
  // trips react-hooks/refs' static analysis even though nothing here reads
  // `.current` during render. The array below exists only for the
  // step-indexed lookups in effects/handlers, which run after render.
  const step0Ref = useRef<HTMLFieldSetElement>(null);
  const step1Ref = useRef<HTMLFieldSetElement>(null);
  const step2Ref = useRef<HTMLFieldSetElement>(null);
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  useLayoutEffect(() => {
    const el = stepRefs[step].current;
    if (!el) return;
    // Restart the CSS animation on every step change — the class alone
    // wouldn't retrigger on a re-render, so force a reflow between removing
    // and re-adding it.
    el.classList.remove("step-anim");
    void el.offsetWidth;
    el.classList.add("step-anim");
    // Focus the first actual field, not the fieldset itself — focusing the
    // fieldset draws the browser's own focus outline around the whole step
    // (a large, ugly box), where landing on a field is both better a11y and
    // visually just that one field's normal focus state.
    el.querySelector<HTMLElement>("input, select, textarea")?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // A stray click or Enter keypress landing right where "Continuar" just
  // was (double-clicks, or Tab-then-Enter out of the last textarea) could
  // otherwise fire the *submit* button the instant it appears in that same
  // spot — this arms it only after a brief pause so that can't happen.
  const [submitArmed, setSubmitArmed] = useState(false);
  useEffect(() => {
    if (step !== STEP_COUNT - 1) return;
    const t = setTimeout(() => setSubmitArmed(true), 500);
    return () => {
      clearTimeout(t);
      setSubmitArmed(false);
    };
  }, [step]);

  function goNext() {
    if (stepRefs[step].current?.reportValidity() === false) return;
    // `reportValidity()` only sees the native inputs in the fieldset — the
    // phone field's own "is this actually a real number" check lives in
    // `react-phone-number-input`'s `isValidPhoneNumber`, not in a DOM
    // `pattern` attribute, so it's checked separately here.
    if (step === 0) {
      setPhoneTouched(true);
      if (!phone || !isValidPhoneNumber(phone)) return;
    }
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleChannel(value: string) {
    setChannels((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== STEP_COUNT - 1) return;
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") || "");
    const lastName = String(formData.get("lastName") || "");
    const email = String(formData.get("email") || "");
    const payload = {
      name: [firstName, lastName].filter(Boolean).join(" "),
      businessName: String(formData.get("businessName") || ""),
      email,
      phone: phone ?? "",
      website: String(formData.get("website") || ""),
      industry: String(formData.get("industry") || ""),
      leadVolume: String(formData.get("leadVolume") || ""),
      leadSource: String(formData.get("leadSource") || ""),
      currentCrm: String(formData.get("currentCrm") || ""),
      channels,
      mainProblem: String(formData.get("mainProblem") || ""),
      automationGoal: String(formData.get("automationGoal") || ""),
      teamSize: String(formData.get("teamSize") || ""),
      notes: String(formData.get("notes") || ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrorType(body?.error === "validation_error" ? "validation" : "generic");
        setStatus("error");
        return;
      }

      trackEvent("contact_form_submit");
      setSubmitted({ firstName, lastName, email, phone: phone ?? "" });
      setStatus("success");
    } catch {
      setErrorType("generic");
      setStatus("error");
    }
  }

  // Booking a time takes over the whole column — no headline, no success
  // card, no repeated CTA fighting it for space, just a short header and
  // the calendar with room to breathe instead of a cramped scroll box.
  if (status === "success" && showCalendar) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setShowCalendar(false)}
          className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.5 2.5 3.5 6l4 3.5" />
          </svg>
          {form.back}
        </button>
        <h2 className="mt-2 text-xl font-medium tracking-tight text-ink">{dict.booking.postSubmitHeadline}</h2>
        <div className="mt-4">
          <CalendarEmbed prefill={submitted ?? undefined} unavailableMessage={dict.booking.unavailable} />
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <>
        <div className="rounded-card border border-border bg-surface p-5">
          <h3 className="text-base font-medium text-ink">{form.successTitle}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{form.successBody}</p>
        </div>

        {/* Booking a time is explicitly opt-in, not a forced next step. */}
        <div className="mt-5 rounded-card border border-border bg-paper p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-ink">{dict.booking.postSubmitHeadline}</h3>
                <span className="rounded-pill border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  {dict.booking.optionalLabel}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{dict.booking.postSubmitIntro}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowCalendar(true)}
              className="flex-shrink-0 rounded-pill bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-all duration-200 active:scale-[0.97] hover:bg-accent-strong"
            >
              {dict.booking.linkLabel}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <DirectContactLinks
            heading={dict.directContact.heading}
            emailLabel={dict.directContact.emailLabel}
            phoneLabel={dict.directContact.phoneLabel}
            whatsappLabel={dict.directContact.whatsappLabel}
            whatsappMessage={dict.directContact.whatsappMessage}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-balance text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {dict.hero.headline}
      </h1>
      <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-ink-soft">{dict.hero.intro}</p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <CtaButton label={dict.booking.linkLabel} href={localizeHref(locale, "/schedule")} variant="secondary" />
        <span className="text-sm text-ink-soft">{dict.booking.prompt}</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEP_COUNT}>
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-accent-strong" : "bg-border"
              }`}
            />
          ))}
        </div>

        <fieldset ref={step0Ref} hidden={step !== 0} className="flex flex-col gap-4">
          <legend className="text-base font-medium text-ink">{form.sections.contact}</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={form.fields.firstName.label} required>
              <input
                required
                name="firstName"
                placeholder={form.fields.firstName.placeholder}
                className={inputClass}
              />
            </Field>
            <Field label={form.fields.lastName.label} required>
              <input
                required
                name="lastName"
                placeholder={form.fields.lastName.placeholder}
                className={inputClass}
              />
            </Field>
            <Field label={form.fields.businessName.label} required>
              <input
                required
                name="businessName"
                placeholder={form.fields.businessName.placeholder}
                className={inputClass}
              />
            </Field>
            <Field label={form.fields.email.label} required>
              <input
                required
                type="email"
                name="email"
                placeholder={form.fields.email.placeholder}
                className={inputClass}
              />
            </Field>
            <Field label={form.fields.phone.label} required>
              <PhoneInput
                international
                defaultCountry={locale === "en" ? "US" : "MX"}
                value={phone}
                onChange={setPhone}
                onBlur={() => setPhoneTouched(true)}
                required
                name="phone"
                autoComplete="tel"
                placeholder={form.fields.phone.placeholder}
              />
              {phoneInvalid ? (
                <p className="mt-1 text-xs text-[#be123c]">{form.fields.phone.invalidMessage}</p>
              ) : null}
            </Field>
            <Field label={form.fields.website.label}>
              <input name="website" placeholder={form.fields.website.placeholder} className={inputClass} />
            </Field>
          </div>
        </fieldset>

        <fieldset ref={step1Ref} hidden={step !== 1} className="flex flex-col gap-4">
          <legend className="text-base font-medium text-ink">{form.sections.business}</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={form.fields.industry.label}>
              <select name="industry" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {form.fields.industry.placeholder}
                </option>
                {form.fields.industry.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={form.fields.teamSize.label}>
              <select name="teamSize" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {form.fields.teamSize.placeholder}
                </option>
                {form.fields.teamSize.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={form.fields.leadVolume.label}>
              <select name="leadVolume" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {form.fields.leadVolume.placeholder}
                </option>
                {form.fields.leadVolume.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={form.fields.leadSource.label}>
              <select name="leadSource" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {form.fields.leadSource.placeholder}
                </option>
                {form.fields.leadSource.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={form.fields.currentCrm.label}>
              <input
                name="currentCrm"
                placeholder={form.fields.currentCrm.placeholder}
                className={inputClass}
              />
            </Field>
          </div>

          <div>
            <span className={labelClass}>{form.fields.channels.label}</span>
            <div className="flex flex-wrap gap-2">
              {form.fields.channels.options.map((opt) => {
                const active = channels.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleChannel(opt.value)}
                    aria-pressed={active}
                    className={`rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                      active
                        ? "border-accent-strong bg-accent-soft text-accent-strong"
                        : "border-border text-ink-soft hover:border-ink"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </fieldset>

        <fieldset ref={step2Ref} hidden={step !== 2} className="flex flex-col gap-4">
          <legend className="text-base font-medium text-ink">{form.sections.needs}</legend>
          <Field label={form.fields.mainProblem.label}>
            <textarea
              name="mainProblem"
              rows={2}
              placeholder={form.fields.mainProblem.placeholder}
              className={inputClass}
            />
          </Field>
          <Field label={form.fields.automationGoal.label}>
            <textarea
              name="automationGoal"
              rows={2}
              placeholder={form.fields.automationGoal.placeholder}
              className={inputClass}
            />
          </Field>
          <Field label={form.fields.notes.label}>
            <textarea name="notes" rows={2} placeholder={form.fields.notes.placeholder} className={inputClass} />
          </Field>
        </fieldset>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">{form.requiredNote}</p>
          <div className="flex items-center gap-2.5 sm:ml-auto">
            {/* Always rendered (just hidden via visibility, not display) so
                Continue/Submit never shifts position when Back appears —
                its slot is reserved from step one. */}
            <button
              type="button"
              onClick={goBack}
              className={`rounded-pill border border-border px-5 py-2.5 text-sm font-medium text-ink transition-all duration-200 active:scale-[0.97] hover:border-ink ${
                step > 0 ? "" : "invisible"
              }`}
            >
              {form.back}
            </button>
            {step < STEP_COUNT - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-pill bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-all duration-200 active:scale-[0.97] hover:bg-accent-strong"
              >
                {form.next}
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting" || !submitArmed}
                className="rounded-pill bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-all duration-200 active:scale-[0.97] hover:bg-accent-strong disabled:opacity-60"
              >
                {status === "submitting" ? form.submitting : form.submit}
              </button>
            )}
          </div>
        </div>

        {status === "error" ? (
          <p role="alert" className="text-sm text-[#be123c]">
            {errorType === "validation" ? form.validationErrorMessage : form.errorMessage}
          </p>
        ) : null}
      </form>

      <div className="mt-8">
        <DirectContactLinks
          heading={dict.directContact.heading}
          emailLabel={dict.directContact.emailLabel}
          phoneLabel={dict.directContact.phoneLabel}
          whatsappLabel={dict.directContact.whatsappLabel}
          whatsappMessage={dict.directContact.whatsappMessage}
        />
      </div>
    </>
  );
}
