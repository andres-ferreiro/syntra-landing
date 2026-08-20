import type { ContactDictionary } from "@/content/contact-types";

export const en: ContactDictionary = {
  meta: {
    title: "Request a Business Audit — Syntra",
    description:
      "Tell us about your business and we'll show you where automation and AI can recover lost opportunities.",
  },
  hero: {
    headline: "Request a Business Audit",
    intro:
      "Tell us a bit about how your business runs today. We'll review it and follow up with what a connected system could look like for you — no pricing, no obligation.",
  },
  form: {
    sections: {
      contact: "Your details",
      business: "Your business",
      needs: "What you need",
    },
    fields: {
      name: { label: "Name", placeholder: "Full name" },
      businessName: { label: "Business name", placeholder: "Your business" },
      email: { label: "Email", placeholder: "you@business.com" },
      phone: { label: "Phone", placeholder: "(555) 555-5555" },
      website: { label: "Website", placeholder: "https://" },
      industry: {
        label: "Industry",
        placeholder: "Select your industry",
        options: [
          { value: "local-services", label: "Local Services" },
          { value: "clinics-aesthetics", label: "Clinics & Aesthetics" },
          { value: "real-estate", label: "Real Estate" },
          { value: "event-venues", label: "Event Venues" },
          { value: "restaurants", label: "Restaurants" },
          { value: "professional-services", label: "Professional Services" },
          { value: "ecommerce", label: "Ecommerce" },
          { value: "agencies", label: "Agencies" },
          { value: "other", label: "Other" },
        ],
      },
      leadVolume: {
        label: "Monthly lead volume",
        placeholder: "Select a range",
        options: [
          { value: "under-20", label: "Under 20" },
          { value: "20-50", label: "20–50" },
          { value: "50-100", label: "50–100" },
          { value: "over-100", label: "100+" },
        ],
      },
      leadSource: {
        label: "Main lead source",
        placeholder: "Select a source",
        options: [
          { value: "website", label: "Website" },
          { value: "referrals", label: "Referrals" },
          { value: "social-media", label: "Social Media" },
          { value: "ads", label: "Paid Ads" },
          { value: "other", label: "Other" },
        ],
      },
      currentCrm: { label: "Current CRM (if any)", placeholder: "e.g. spreadsheets, none, another CRM" },
      channels: {
        label: "Current communication channels",
        options: [
          { value: "whatsapp", label: "WhatsApp" },
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "sms", label: "SMS" },
          { value: "email", label: "Email" },
          { value: "webchat", label: "Web Chat" },
          { value: "phone", label: "Phone" },
        ],
      },
      mainProblem: {
        label: "What's the main problem right now?",
        placeholder: "e.g. leads go unanswered after hours, follow-up falls through the cracks…",
      },
      automationGoal: {
        label: "What would you like to automate?",
        placeholder: "e.g. new lead response, appointment reminders, review requests…",
      },
      teamSize: {
        label: "Team size",
        placeholder: "Select a range",
        options: [
          { value: "1-5", label: "1–5" },
          { value: "6-20", label: "6–20" },
          { value: "21-50", label: "21–50" },
          { value: "50-plus", label: "50+" },
        ],
      },
      notes: { label: "Additional notes", placeholder: "Anything else we should know?" },
    },
    requiredNote: "Fields marked * are required.",
    submit: "Request my audit",
    submitting: "Sending…",
    successTitle: "Request received.",
    successBody: "We'll review what you shared and follow up shortly to schedule your audit.",
    errorMessage: "Something went wrong sending your request. Please try again, or reach us directly.",
    validationErrorMessage: "Please double-check your phone number and try again.",
  },
  booking: {
    prompt: "Prefer to just grab a time on my calendar?",
    linkLabel: "Book a call →",
    postSubmitHeadline: "Want to lock in a time now?",
    postSubmitIntro: "Pick a time that works for you — we've already got your details, no need to re-enter them.",
    unavailable: "Scheduling isn't available right now — we'll reach out by email or phone instead.",
  },
  directContact: {
    heading: "Or reach us directly",
    emailLabel: "Email",
    phoneLabel: "Call",
    whatsappLabel: "WhatsApp",
    whatsappMessage: "Hi, I'd like more information about Syntra.",
  },
  schedule: {
    meta: {
      title: "Book a Call — Syntra",
      description: "Pick a time to talk with Syntra about automating your business.",
    },
    headline: "Book a call",
    intro: "Pick a time that works for you. No forms to fill out here beyond the essentials.",
  },
};
