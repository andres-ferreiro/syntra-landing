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
  advantages: {
    headline: string;
    subhead: string;
    reach: { title: string; caption: string };
    speed: { title: string; caption: string };
    alwaysOn: { title: string; caption: string };
  };
  coreServices: {
    headline: string;
    funnel: { title: string; description: string };
    scheduling: { title: string; description: string };
    integrations: { title: string; description: string };
    crm: { title: string; description: string };
  };
  ai: {
    conversation: ChatMessage[];
  };
  howItWorks: {
    headline: string;
    steps: { title: string; description: string }[];
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
