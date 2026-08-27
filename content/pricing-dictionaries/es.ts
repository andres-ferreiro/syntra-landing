import type { PricingDictionary } from "@/content/pricing-types";

export const es: PricingDictionary = {
  meta: {
    title: "Precios: mandhy",
    description:
      "Tres alcances según lo que tu negocio necesita hoy. Sin lista de precios pública — cada plan se ajusta contigo en una auditoría gratuita.",
  },
  hero: {
    headline: "Un alcance para cada etapa de tu negocio.",
    intro:
      "Cada proyecto se dimensiona según tus canales, flujos, necesidades de IA e integraciones — por eso no publicamos una tarifa fija. Estos son los tres puntos de partida más comunes; lo ajustamos juntos en tu auditoría.",
  },
  noPriceListNote: "Sin costos publicados — cotización a la medida de tu negocio.",
  recommendedLabel: "Recomendado",
  tiers: [
    {
      name: "Base",
      description: "Para ordenar la conversación con tus clientes y dejar de perder leads.",
      features: [
        "Chatbot con IA que responde por ti, entrenado con la información real de tu negocio",
        "Una sola bandeja para WhatsApp, Instagram, Facebook, SMS y chat web",
        "CRM conectado a cada conversación y lead",
        "Agenda, confirmación y recordatorios de citas",
      ],
      cta: { label: "Solicitar mi auditoría", href: "/contact" },
    },
    {
      name: "Crecimiento",
      description: "Para automatizar el seguimiento que hoy haces a mano.",
      recommended: true,
      features: [
        "Todo lo de Base",
        "Automatizaciones a la medida de tu flujo de ventas y seguimiento",
        "Recordatorios de seguimiento e inasistencias sin intervención manual",
        "Sitios web y funnels diseñados para mover leads hacia una decisión",
      ],
      cta: { label: "Solicitar mi auditoría", href: "/contact" },
    },
    {
      name: "Integral",
      description: "El sistema completo: conversión y reputación en un solo lugar.",
      features: [
        "Todo lo de Crecimiento",
        "Gestión de reseñas y reputación en Google, automatizada",
        "Cada canal y herramienta conectados en un solo sistema",
        "Reportes de desempeño de todo el pipeline",
      ],
      cta: { label: "Solicitar mi auditoría", href: "/contact" },
    },
  ],
  valueComparison: {
    headline: "Todo esto, sin sumar herramientas sueltas.",
    intro:
      "Armar esto mismo por tu cuenta significa pagar y administrar varias suscripciones distintas, con logins separados y sin que se hablen entre sí.",
    elsewhereColumnLabel: "Por separado (referencia de mercado)",
    mandhyColumnLabel: "mandhy",
    includedLabel: "Incluido",
    rows: [
      { label: "Chatbot con IA", elsewhereRange: "$50–100 USD/mes" },
      {
        label: "Bandeja multicanal",
        caption: "WhatsApp, Instagram, Facebook, SMS, chat web",
        elsewhereRange: "$30–60 USD/mes",
      },
      { label: "CRM y gestión de leads", elsewhereRange: "$40–70 USD/mes" },
      { label: "Agenda y citas", caption: "incluye confirmaciones", elsewhereRange: "$30–50 USD/mes" },
      { label: "Sitios web y funnels", caption: "incluye landing pages", elsewhereRange: "$30–80 USD/mes" },
      { label: "Gestión de reseñas y reputación", caption: "Google", elsewhereRange: "$40–60 USD/mes" },
      {
        label: "Herramienta para conectar todo",
        caption: "tipo Zapier o Make",
        elsewhereRange: "$30–50 USD/mes",
      },
    ],
    footnote:
      "Precios de referencia del mercado, no cotizaciones exactas — varían según el proveedor que elijas. Con mandhy, todo esto vive conectado en un solo sistema, sin logins separados ni una herramienta aparte solo para unirlos.",
  },
  calculatorTeaser: {
    headline: "¿No sabes cuánto te está costando ahora mismo un seguimiento lento?",
    cta: { label: "Calcula tu fuga de ingresos", href: "/calculator" },
  },
  finalCta: {
    headline: "¿No estás seguro cuál alcance necesitas? Lo resolvemos en la auditoría.",
    cta: { label: "Solicitar mi auditoría", href: "/contact" },
  },
};
