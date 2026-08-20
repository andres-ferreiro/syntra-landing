"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CalendarEmbed } from "@/components/patterns/CalendarEmbed";
import type { ContactDictionary } from "@/content/contact-types";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-accent-strong";

const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function Field({ children, label, required }: { children: React.ReactNode; label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required ? <span className="text-accent-strong"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function ContactForm({ dict, locale }: { dict: ContactDictionary; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorType, setErrorType] = useState<"generic" | "validation">("generic");
  const [channels, setChannels] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<{ name: string; email: string; phone: string } | null>(
    null
  );
  const form = dict.form;

  function toggleChannel(value: string) {
    setChannels((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const payload = {
      name,
      businessName: String(formData.get("businessName") || ""),
      email,
      phone,
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
      setSubmitted({ name, email, phone });
      setStatus("success");
    } catch {
      setErrorType("generic");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-8">
        <div className="rounded-card border border-border bg-surface p-8">
          <h3 className="text-xl font-medium text-ink">{form.successTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{form.successBody}</p>
        </div>

        <div>
          <h3 className="text-xl font-medium text-ink">{dict.booking.postSubmitHeadline}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dict.booking.postSubmitIntro}</p>
          <CalendarEmbed
            className="mt-5"
            prefill={submitted ?? undefined}
            unavailableMessage={dict.booking.unavailable}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-ink">{form.sections.contact}</legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={form.fields.name.label} required>
            <input required name="name" placeholder={form.fields.name.placeholder} className={inputClass} />
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
            <input
              required
              type="tel"
              name="phone"
              maxLength={20}
              placeholder={form.fields.phone.placeholder}
              className={inputClass}
            />
          </Field>
          <Field label={form.fields.website.label}>
            <input name="website" placeholder={form.fields.website.placeholder} className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-ink">{form.sections.business}</legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  className={`rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
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

      <fieldset className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-ink">{form.sections.needs}</legend>
        <Field label={form.fields.mainProblem.label}>
          <textarea
            name="mainProblem"
            rows={3}
            placeholder={form.fields.mainProblem.placeholder}
            className={inputClass}
          />
        </Field>
        <Field label={form.fields.automationGoal.label}>
          <textarea
            name="automationGoal"
            rows={3}
            placeholder={form.fields.automationGoal.placeholder}
            className={inputClass}
          />
        </Field>
        <Field label={form.fields.notes.label}>
          <textarea name="notes" rows={2} placeholder={form.fields.notes.placeholder} className={inputClass} />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-soft">{form.requiredNote}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-pill bg-ink px-7 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          {status === "submitting" ? form.submitting : form.submit}
        </button>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-[#be123c]">
          {errorType === "validation" ? form.validationErrorMessage : form.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
