import type { PricingDictionary } from "@/content/pricing-types";

export const en: PricingDictionary = {
  meta: {
    title: "Pricing: mandhy",
    description:
      "Three scopes depending on what your business needs today. No public price list — every plan is scoped with you in a free audit.",
  },
  hero: {
    headline: "A scope for every stage of your business.",
    intro:
      "Every project is sized around your channels, flows, AI needs, and integrations — that's why we don't publish a flat rate. These are the three most common starting points; we scope the right one together in your audit.",
  },
  noPriceListNote: "No published rates — quoted to fit your business.",
  recommendedLabel: "Recommended",
  tiers: [
    {
      name: "Core",
      description: "Get the conversation with your customers organized and stop losing leads.",
      features: [
        "AI chatbot that replies for you, trained on your real business info",
        "One shared inbox for WhatsApp, Instagram, Facebook, SMS, and web chat",
        "CRM connected to every conversation and lead",
        "Appointment booking, confirmations, and reminders",
      ],
      cta: { label: "Request my audit", href: "/contact" },
    },
    {
      name: "Growth",
      description: "Automate the follow-up you're currently doing by hand.",
      recommended: true,
      features: [
        "Everything in Core",
        "Automations built around your actual sales and follow-up flow",
        "Lead follow-up and no-show reminders with zero manual work",
        "Websites and funnel pages built to move leads toward a decision",
      ],
      cta: { label: "Request my audit", href: "/contact" },
    },
    {
      name: "Complete",
      description: "The full system: conversion and reputation in one place.",
      features: [
        "Everything in Growth",
        "Google review and reputation management, automated",
        "Every channel and tool connected into one system",
        "Performance reporting across the whole pipeline",
      ],
      cta: { label: "Request my audit", href: "/contact" },
    },
  ],
  valueComparison: {
    headline: "All of this, without stacking separate tools.",
    intro:
      "Putting this together yourself means paying for and managing several different subscriptions, each with its own login, none of them talking to each other.",
    elsewhereColumnLabel: "Separately (market reference)",
    mandhyColumnLabel: "mandhy",
    includedLabel: "Included",
    rows: [
      { label: "AI chatbot", elsewhereRange: "$50–100 USD/mo" },
      {
        label: "Multi-channel inbox",
        caption: "WhatsApp, Instagram, Facebook, SMS, web chat",
        elsewhereRange: "$30–60 USD/mo",
      },
      { label: "CRM and lead management", elsewhereRange: "$40–70 USD/mo" },
      { label: "Scheduling and appointments", caption: "confirmations included", elsewhereRange: "$30–50 USD/mo" },
      { label: "Website and funnel builder", caption: "landing pages included", elsewhereRange: "$30–80 USD/mo" },
      { label: "Review and reputation management", caption: "Google", elsewhereRange: "$40–60 USD/mo" },
      {
        label: "A tool to connect it all",
        caption: "Zapier/Make-style",
        elsewhereRange: "$30–50 USD/mo",
      },
    ],
    footnote:
      "Reference market prices, not exact quotes — they vary by provider. With mandhy, all of this lives in one connected system, with no separate logins and no extra tool just to wire them together.",
  },
  calculatorTeaser: {
    headline: "Not sure what slow follow-up is costing you right now?",
    cta: { label: "Calculate your revenue leak", href: "/calculator" },
  },
  finalCta: {
    headline: "Not sure which scope you need? We figure that out in the audit.",
    cta: { label: "Request my audit", href: "/contact" },
  },
};
