import type { HomeDictionary } from "@/content/types";

export const es: HomeDictionary = {
  meta: {
    title: "mandhy: El asistente de IA de tu negocio",
    description:
      "mandhy es el asistente de IA que responde a tus clientes, agenda sus llamadas, da seguimiento a cada lead y hace crecer tu reputación.",
  },
  nav: {
    links: [
      { label: "Soluciones", href: "#services" },
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
    cta: { label: "Solicitar auditoría", href: "/contact" },
    languageSwitcherLabel: "EN",
  },
  hero: {
    headline: "mandhy es el asistente de IA de tu negocio.",
    subcopy:
      "Responde a tus clientes, agenda sus llamadas y da seguimiento a cada lead, para que nada se te escape.",
    primaryCta: { label: "Solicitar una auditoría de negocio", href: "/contact" },
    secondaryCta: { label: "Explorar soluciones", href: "#services" },
  },
  advantages: {
    headline: "Diseñado para estar donde tu negocio lo necesita.",
    subhead: "Cada industria, cada hora, sin que se te escape nada.",
    reach: {
      title: "Cada industria, cada negocio.",
      caption: "Clínicas, bienes raíces, restaurantes, salones y más, sin importar el rubro.",
    },
    speed: {
      title: "Más rápido que cualquier persona de tu equipo.",
      caption: "Mientras alguien todavía está escribiendo una respuesta, mandhy ya contestó.",
    },
    alwaysOn: {
      title: "Trabaja 24/7, para que tú no tengas que hacerlo.",
      caption: "Noches, fines de semana, festivos: mandhy nunca se desconecta.",
    },
  },
  coreServices: {
    headline: "Todo lo necesario para ganar un cliente, a cargo de mandhy.",
    funnel: {
      title: "Funnels",
      description: "Sitios y funnels diseñados para mover leads hacia una decisión.",
    },
    scheduling: {
      title: "Agenda inteligente",
      description: "mandhy agenda, confirma y envía recordatorios las 24 horas.",
    },
    integrations: {
      title: "Integraciones",
      description: "Cada canal y herramienta conectados en un solo sistema claro.",
    },
    crm: {
      title: "CRM",
      description: "Cada contacto y oportunidad organizados en un pipeline claro.",
    },
  },
  ai: {
    conversation: [
      { from: "user", text: "Hola, ¿tienen disponibilidad esta semana?" },
      {
        from: "ai",
        text: "¡Claro! Tengo espacio el jueves a las 10am o el viernes a las 3pm. ¿Cuál prefieres?",
      },
      { from: "user", text: "El jueves está perfecto." },
      { from: "ai", text: "Listo, tu cita quedó confirmada para el jueves a las 10am. Te enviaré un recordatorio antes." },
    ],
  },
  howItWorks: {
    headline: "Un proceso claro, de principio a fin.",
    steps: [
      { title: "Analizar", description: "Entendemos cómo funciona hoy tu negocio y dónde se pierden oportunidades." },
      { title: "Diseñar", description: "Diseñamos a mandhy alrededor de tu proceso real, no al revés." },
      { title: "Construir", description: "Configuramos la automatización, la IA y las integraciones de mandhy." },
      { title: "Probar", description: "Revisamos cada respuesta y flujo antes de que mandhy entre en operación." },
      { title: "Lanzar", description: "mandhy se pone a trabajar junto a tu equipo." },
      { title: "Optimizar", description: "Ajustamos a mandhy con base en resultados reales." },
    ],
  },
  faq: {
    headline: "Preguntas frecuentes",
    items: [
      {
        question: "¿mandhy reemplaza a mi equipo?",
        answer:
          "No. mandhy se encarga del trabajo repetitivo y responde a la velocidad de la IA, pero las decisiones que importan (negociación, quejas, casos sensibles) siempre pasan por una persona.",
      },
      {
        question: "¿La IA puede responder a mis clientes?",
        answer:
          "Sí. Entrenado con la información real de tu negocio, mandhy responde preguntas frecuentes, califica leads y agenda citas, escalando a una persona cuando corresponde.",
      },
      {
        question: "¿mandhy puede conectar WhatsApp?",
        answer: "Sí, junto con Instagram, Facebook, SMS, correo, chat web y teléfono: mandhy los reúne todos en un solo lugar.",
      },
      {
        question: "¿Necesito reemplazar todas mis herramientas actuales?",
        answer: "No necesariamente. mandhy se construye alrededor de tu operación actual siempre que sea posible.",
      },
      {
        question: "¿mandhy puede construir mi sitio web?",
        answer: "Sí. Construimos sitios y funnels que forman parte activa de tu proceso de ventas, funcionando junto al CRM y la automatización de mandhy.",
      },
      {
        question: "¿mandhy ayuda con las reseñas de Google?",
        answer: "Sí, mandhy automatiza las solicitudes de reseña en el momento justo. No garantizamos posiciones de búsqueda específicas.",
      },
      {
        question: "¿Esto funciona para mi industria?",
        answer: "mandhy trabaja con servicios locales, clínicas, bienes raíces, restaurantes, servicios profesionales, ecommerce y agencias, adaptándose a cómo funciona realmente cada negocio.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Cada proyecto se dimensiona según tus canales, flujos, necesidades de IA, integraciones y complejidad. Contáctanos para una evaluación.",
      },
    ],
  },
  finalCta: {
    headline: "Tu negocio no necesita más trabajo manual. Necesita a mandhy.",
    cta: { label: "Solicitar una auditoría de negocio", href: "/contact" },
  },
  footer: {
    tagline: "El asistente de IA detrás de los negocios que quieren crecer.",
    links: [
      { label: "Soluciones", href: "#services" },
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
    contactCta: { label: "Hablar con mandhy", href: "/contact" },
    rights: "Todos los derechos reservados.",
  },
};
