import type { HomeDictionary } from "@/content/types";

export const en: HomeDictionary = {
  meta: {
    title: "mandhy: Your Business's AI Assistant",
    description:
      "mandhy is the AI assistant that answers your customers, books their calls, follows up on every lead, and keeps your reputation growing.",
  },
  nav: {
    links: [
      { label: "Solutions", href: "#services" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Request an audit", href: "/contact" },
    languageSwitcherLabel: "ES",
  },
  hero: {
    headline: "mandhy is your business's AI assistant.",
    subcopy:
      "It answers your customers, books their calls, and follows up on every lead, so nothing slips through.",
    primaryCta: { label: "Request a Business Audit", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "#services" },
  },
  advantages: {
    headline: "Built to work everywhere your business does.",
    subhead: "Every industry, every hour, without missing a beat.",
    reach: {
      title: "Every industry, every business.",
      caption: "Clinics, real estate, restaurants, salons, and more, whatever your business.",
    },
    speed: {
      title: "Faster than any human on your team.",
      caption: "While someone's still typing a reply, mandhy already answered.",
    },
    alwaysOn: {
      title: "Working 24/7, so you don't have to.",
      caption: "Nights, weekends, holidays: mandhy never clocks out.",
    },
  },
  coreServices: {
    headline: "Everything it takes to win a customer, handled by mandhy.",
    funnel: {
      title: "Funnels",
      description: "Websites and funnels built to move leads toward a decision.",
    },
    scheduling: {
      title: "Smart Scheduling",
      description: "mandhy books, confirms, and sends reminders around the clock.",
    },
    integrations: {
      title: "Integrations",
      description: "Every channel and tool connected into one clear system.",
    },
    crm: {
      title: "CRM",
      description: "Every contact and opportunity organized in one clear pipeline.",
    },
  },
  ai: {
    conversation: [
      { from: "user", text: "Hi, do you have availability this week?" },
      {
        from: "ai",
        text: "Sure! I have an opening Thursday at 10am or Friday at 3pm. Which works better?",
      },
      { from: "user", text: "Thursday works great." },
      { from: "ai", text: "You're booked for Thursday at 10am. I'll send you a reminder beforehand." },
    ],
  },
  howItWorks: {
    headline: "A clear process, start to finish.",
    steps: [
      { title: "Analyze", description: "We learn how your business runs today, and where opportunities slip through." },
      { title: "Design", description: "We shape mandhy around your real process, not the other way around." },
      { title: "Build", description: "We set up mandhy's automation, AI, and integrations." },
      { title: "Test", description: "We check every response and workflow before mandhy goes live." },
      { title: "Launch", description: "mandhy goes to work alongside your team." },
      { title: "Optimize", description: "We refine mandhy based on real results." },
    ],
  },
  faq: {
    headline: "Frequently Asked Questions",
    items: [
      {
        question: "Does mandhy replace my team?",
        answer:
          "No. mandhy handles the repetitive work and responds at AI speed, but the decisions that matter (negotiation, complaints, sensitive cases) always go to a person.",
      },
      {
        question: "Can AI answer my customers?",
        answer:
          "Yes. Trained on your real business information, mandhy answers FAQs, qualifies leads, and books appointments, escalating to a person whenever it should.",
      },
      {
        question: "Can mandhy connect WhatsApp?",
        answer: "Yes, along with Instagram, Facebook, SMS, email, web chat, and phone: mandhy brings them all into one place.",
      },
      {
        question: "Do I need to replace all my current tools?",
        answer: "Not necessarily. mandhy is built around your current operation wherever possible.",
      },
      {
        question: "Can mandhy build my website?",
        answer: "Yes. We build websites and funnels that are an active part of your sales process, working alongside mandhy's CRM and automation.",
      },
      {
        question: "Can mandhy help with Google reviews?",
        answer: "Yes, mandhy automates review requests at the right moment. We don't guarantee specific search rankings.",
      },
      {
        question: "Does this work for my industry?",
        answer: "mandhy works with local services, clinics, real estate, restaurants, professional services, ecommerce, and agencies, adapted to how each business actually runs.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Every engagement is scoped around your channels, workflows, AI needs, integrations, and complexity. Contact us for an assessment.",
      },
    ],
  },
  finalCta: {
    headline: "Your business doesn't need more manual work. It needs mandhy.",
    cta: { label: "Request a Business Audit", href: "/contact" },
  },
  footer: {
    tagline: "The AI assistant behind businesses that want to grow.",
    links: [
      { label: "Solutions", href: "#services" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    contactCta: { label: "Talk to mandhy", href: "/contact" },
    rights: "All rights reserved.",
  },
};
