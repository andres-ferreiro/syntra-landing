export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface ChatMessage {
  from: "user" | "ai";
  text: string;
}

export interface HomeDictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: NavLink[];
    cta: Cta;
    languageSwitcherLabel: string;
  };
  hero: {
    headline: string;
    subcopy: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  problem: {
    headline: string;
    points: string[];
  };
  systemFlow: {
    headline: string;
    steps: string[];
  };
  coreServices: {
    headline: string;
    services: { title: string; description: string }[];
  };
  automationExamples: {
    headline: string;
    examples: { trigger: string; action: string }[];
  };
  ai: {
    headline: string;
    intro: string;
    capabilities: string[];
    ruleNote: string;
    conversation: ChatMessage[];
  };
  crm: {
    headline: string;
    description: string;
    stages: string[];
  };
  omnichannel: {
    headline: string;
    description: string;
    channels: string[];
  };
  reputation: {
    headline: string;
    description: string;
    points: string[];
  };
  industries: {
    headline: string;
    items: string[];
  };
  howItWorks: {
    headline: string;
    steps: { title: string; description: string }[];
  };
  benefits: {
    headline: string;
    items: string[];
  };
  faq: {
    headline: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    headline: string;
    cta: Cta;
  };
  footer: {
    tagline: string;
    links: NavLink[];
    contactCta: Cta;
    rights: string;
  };
}
