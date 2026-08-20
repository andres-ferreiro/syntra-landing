import type { HomeDictionary } from "@/content/types";

export const en: HomeDictionary = {
  meta: {
    title: "Syntra — Business Automation & AI",
    description:
      "Syntra connects your lead capture, communication, CRM, AI, and automation into one system built to turn more opportunities into customers.",
  },
  nav: {
    links: [
      { label: "Solutions", href: "#services" },
      { label: "AI Automation", href: "#ai" },
      { label: "Industries", href: "#industries" },
      { label: "How it works", href: "#how-it-works" },
    ],
    cta: { label: "Request an audit", href: "/contact" },
    languageSwitcherLabel: "ES",
  },
  hero: {
    headline: "Turn more opportunities into customers with automation and AI.",
    subcopy:
      "Syntra connects your website, CRM, messaging, follow-up, appointments, and reputation into one system built around how your business actually works.",
    primaryCta: { label: "Request a Business Audit", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "#services" },
  },
  problem: {
    headline: "Your business may already be generating opportunities — and losing them at the same time.",
    points: [
      "Leads arrive from multiple channels and messages get lost.",
      "Response time is slow and nobody follows up.",
      "Missed calls are never recovered.",
      "Leads are managed by hand, in spreadsheets or inboxes.",
      "Appointment coordination is manual, and there are too many no-shows.",
      "Old leads are ignored, and satisfied customers are never asked for a review.",
    ],
  },
  systemFlow: {
    headline: "One connected system for your entire customer journey.",
    steps: [
      "Traffic",
      "Lead Capture",
      "CRM",
      "AI + Automation",
      "Follow-Up",
      "Appointment / Sale",
      "Review",
      "Reactivation",
    ],
  },
  coreServices: {
    headline: "Everything it takes to move an opportunity forward, in one place.",
    services: [
      {
        title: "Automation",
        description: "Workflows that respond, follow up, and alert your team without anyone having to remember to.",
      },
      {
        title: "AI",
        description: "Assistants trained on your real business information to answer and qualify leads.",
      },
      {
        title: "CRM",
        description: "A clear pipeline of contacts and opportunities, no more scattered spreadsheets.",
      },
      {
        title: "Websites & Funnels",
        description: "Pages that don't just look good — they move opportunities forward.",
      },
      {
        title: "Omnichannel Communication",
        description: "WhatsApp, social, SMS, email, and calls, centralized into one conversation.",
      },
      {
        title: "Appointments",
        description: "Online booking with confirmations, reminders, and no-show recovery.",
      },
      {
        title: "Reputation",
        description: "Automated review requests that turn satisfied customers into trust.",
      },
      {
        title: "Reporting & Integrations",
        description: "Clear visibility into leads, appointments, and sales, so you know what's working.",
      },
    ],
  },
  automationExamples: {
    headline: "Every moment of the process, covered automatically.",
    examples: [
      { trigger: "New Lead", action: "Instant Response" },
      { trigger: "Missed Call", action: "Automatic Message" },
      { trigger: "No Response", action: "Scheduled Follow-Up" },
      { trigger: "Appointment Booked", action: "Automatic Reminder" },
      { trigger: "No-Show", action: "Rebooking" },
      { trigger: "Service Completed", action: "Review Request" },
      { trigger: "Old Lead", action: "Reactivation" },
    ],
  },
  ai: {
    headline: "AI trained to work inside your business processes.",
    intro:
      "Syntra's assistants answer FAQs, collect information, qualify leads, recommend next steps, and book appointments — updating your CRM and triggering workflows automatically.",
    capabilities: [
      "Answers FAQs",
      "Collects lead information",
      "Qualifies opportunities",
      "Books appointments",
      "Updates the CRM",
      "Escalates to a human when needed",
    ],
    ruleNote: "AI for speed. Humans for important decisions.",
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
  crm: {
    headline: "Stop managing opportunities from inboxes and spreadsheets.",
    description:
      "Syntra organizes every contact and opportunity into a clear pipeline, with conversation history, notes, and assigned owners.",
    stages: [
      "New Lead",
      "Contacted",
      "Qualified",
      "Appointment Booked",
      "Follow-Up",
      "Won",
    ],
  },
  omnichannel: {
    headline: "Your customers message you everywhere. Your business should see everything in one place.",
    description:
      "Centralize every conversation, no matter which channel it comes from, to respond faster and keep your team coordinated.",
    channels: ["WhatsApp", "Instagram", "Facebook", "SMS", "Email", "Web Chat", "Phone"],
  },
  reputation: {
    headline: "Turn happy customers into stronger online trust.",
    description:
      "Automate review requests and follow-up reminders, so every satisfied customer helps win the next one.",
    points: [
      "Automated review requests",
      "Follow-up reminders",
      "Direct review links",
      "Testimonial collection",
    ],
  },
  industries: {
    headline: "Every system is adapted to your business's real workflow.",
    items: [
      "Local Services",
      "Clinics & Aesthetics",
      "Real Estate",
      "Event Venues",
      "Restaurants",
      "Professional Services",
      "Ecommerce",
      "Agencies",
    ],
  },
  howItWorks: {
    headline: "A clear process, start to finish.",
    steps: [
      { title: "Analyze", description: "We understand how your business runs today and where opportunities are lost." },
      { title: "Design", description: "We define the system and workflows around your real process." },
      { title: "Build", description: "We implement the automation, AI, and integrations." },
      { title: "Test", description: "We validate every workflow before it goes live." },
      { title: "Launch", description: "Your system goes into operation with your team." },
      { title: "Optimize", description: "We refine it based on real results." },
    ],
  },
  benefits: {
    headline: "What changes when your business has a connected system.",
    items: [
      "Faster response to every lead",
      "Fewer missed opportunities",
      "Less repetitive manual work",
      "Consistent follow-up",
      "Centralized conversations",
      "An organized pipeline",
      "Simpler appointment management",
      "More review opportunities",
      "Better visibility into the business",
    ],
  },
  faq: {
    headline: "Frequently Asked Questions",
    items: [
      {
        question: "Does Syntra replace my team?",
        answer:
          "No. Syntra automates repetitive work and uses AI for speed, but important decisions — negotiation, complaints, sensitive cases — always go through a person.",
      },
      {
        question: "Can AI answer my customers?",
        answer:
          "Yes, trained on your real business information: it answers FAQs, qualifies leads, and books appointments, escalating to a person when needed.",
      },
      {
        question: "Can Syntra connect WhatsApp?",
        answer: "Yes, along with Instagram, Facebook, SMS, email, web chat, and phone — all centralized.",
      },
      {
        question: "Do I need to replace all my current tools?",
        answer: "Not necessarily. We design the system around your current operation wherever possible.",
      },
      {
        question: "Can Syntra build my website?",
        answer: "Yes. We build websites and funnels that are an active part of your sales process, connected to your CRM and automation.",
      },
      {
        question: "Can Syntra help with Google reviews?",
        answer: "Yes, with automated review-request workflows. We don't guarantee specific search rankings.",
      },
      {
        question: "Does this work for my industry?",
        answer: "We work with local services, clinics, real estate, restaurants, professional services, ecommerce, and agencies, adapting each system to the real workflow of the business.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Each system is scoped based on channels, workflows, AI, integrations, complexity, and business needs. Contact us for an assessment.",
      },
    ],
  },
  finalCta: {
    headline: "Your business does not need more manual work. It needs better systems.",
    cta: { label: "Request a Business Audit", href: "/contact" },
  },
  footer: {
    tagline: "Automation and AI for businesses that want to grow.",
    links: [
      { label: "Solutions", href: "#services" },
      { label: "AI Automation", href: "#ai" },
      { label: "Industries", href: "#industries" },
      { label: "How it works", href: "#how-it-works" },
    ],
    contactCta: { label: "Talk to Syntra", href: "/contact" },
    rights: "All rights reserved.",
  },
};
