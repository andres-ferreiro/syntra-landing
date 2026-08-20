import type { ContactDictionary } from "@/content/contact-types";

export const es: ContactDictionary = {
  meta: {
    title: "Solicitar una auditoría de negocio — Syntra",
    description:
      "Cuéntanos sobre tu negocio y te mostraremos dónde la automatización y la IA pueden recuperar oportunidades perdidas.",
  },
  hero: {
    headline: "Solicitar una auditoría de negocio",
    intro:
      "Cuéntanos un poco sobre cómo funciona tu negocio hoy. Lo revisaremos y te contactaremos con cómo podría verse un sistema conectado para ti — sin costos, sin compromiso.",
  },
  form: {
    sections: {
      contact: "Tus datos",
      business: "Tu negocio",
      needs: "Qué necesitas",
    },
    fields: {
      name: { label: "Nombre", placeholder: "Nombre completo" },
      businessName: { label: "Nombre del negocio", placeholder: "Tu negocio" },
      email: { label: "Correo", placeholder: "tu@negocio.com" },
      phone: { label: "Teléfono", placeholder: "(555) 555-5555" },
      website: { label: "Sitio web", placeholder: "https://" },
      industry: {
        label: "Industria",
        placeholder: "Selecciona tu industria",
        options: [
          { value: "local-services", label: "Servicios locales" },
          { value: "clinics-aesthetics", label: "Clínicas y estética" },
          { value: "real-estate", label: "Bienes raíces" },
          { value: "event-venues", label: "Salones de eventos" },
          { value: "restaurants", label: "Restaurantes" },
          { value: "professional-services", label: "Servicios profesionales" },
          { value: "ecommerce", label: "Ecommerce" },
          { value: "agencies", label: "Agencias" },
          { value: "other", label: "Otra" },
        ],
      },
      leadVolume: {
        label: "Volumen mensual de leads",
        placeholder: "Selecciona un rango",
        options: [
          { value: "under-20", label: "Menos de 20" },
          { value: "20-50", label: "20–50" },
          { value: "50-100", label: "50–100" },
          { value: "over-100", label: "100+" },
        ],
      },
      leadSource: {
        label: "Principal fuente de leads",
        placeholder: "Selecciona una fuente",
        options: [
          { value: "website", label: "Sitio web" },
          { value: "referrals", label: "Referidos" },
          { value: "social-media", label: "Redes sociales" },
          { value: "ads", label: "Anuncios pagados" },
          { value: "other", label: "Otra" },
        ],
      },
      currentCrm: { label: "CRM actual (si tienes)", placeholder: "ej. hojas de cálculo, ninguno, otro CRM" },
      channels: {
        label: "Canales de comunicación actuales",
        options: [
          { value: "whatsapp", label: "WhatsApp" },
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "sms", label: "SMS" },
          { value: "email", label: "Correo" },
          { value: "webchat", label: "Chat web" },
          { value: "phone", label: "Teléfono" },
        ],
      },
      mainProblem: {
        label: "¿Cuál es el principal problema ahora?",
        placeholder: "ej. los leads no reciben respuesta fuera de horario, el seguimiento se pierde…",
      },
      automationGoal: {
        label: "¿Qué te gustaría automatizar?",
        placeholder: "ej. respuesta a nuevos leads, recordatorios de citas, solicitudes de reseña…",
      },
      teamSize: {
        label: "Tamaño del equipo",
        placeholder: "Selecciona un rango",
        options: [
          { value: "1-5", label: "1–5" },
          { value: "6-20", label: "6–20" },
          { value: "21-50", label: "21–50" },
          { value: "50-plus", label: "50+" },
        ],
      },
      notes: { label: "Notas adicionales", placeholder: "¿Algo más que debamos saber?" },
    },
    requiredNote: "Los campos marcados con * son obligatorios.",
    submit: "Solicitar mi auditoría",
    submitting: "Enviando…",
    successTitle: "Solicitud recibida.",
    successBody: "Revisaremos lo que compartiste y te contactaremos pronto para agendar tu auditoría.",
    errorMessage: "Hubo un problema al enviar tu solicitud. Intenta de nuevo o contáctanos directamente.",
    validationErrorMessage: "Verifica tu número de teléfono e intenta de nuevo.",
  },
  booking: {
    prompt: "¿Prefieres solo agendar una hora en mi calendario?",
    linkLabel: "Agendar una llamada →",
    postSubmitHeadline: "¿Quieres agendar una hora ahora?",
    postSubmitIntro: "Elige una hora que te funcione — ya tenemos tus datos, no hace falta escribirlos de nuevo.",
    unavailable: "La agenda no está disponible en este momento — te contactaremos por correo o teléfono.",
  },
  directContact: {
    heading: "O contáctanos directamente",
    emailLabel: "Correo",
    phoneLabel: "Llamar",
    whatsappLabel: "WhatsApp",
    whatsappMessage: "Hola, quiero más información sobre Syntra.",
  },
  schedule: {
    meta: {
      title: "Agendar una llamada — Syntra",
      description: "Elige una hora para hablar con Syntra sobre automatizar tu negocio.",
    },
    headline: "Agendar una llamada",
    intro: "Elige una hora que te funcione. Sin formularios que llenar más allá de lo esencial.",
  },
};
