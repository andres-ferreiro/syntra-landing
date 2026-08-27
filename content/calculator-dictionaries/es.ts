import type { CalculatorDictionary } from "@/content/calculator-types";

export const es: CalculatorDictionary = {
  meta: {
    title: "Calculadora de fuga de ingresos: mandhy",
    description:
      "Descubre cuántos ingresos se te escapan cada mes cuando los leads esperan demasiado por una respuesta, y qué podrías recuperar con un seguimiento rápido y constante.",
  },
  hero: {
    headline: "¿Cuántos ingresos se te escapan por el seguimiento?",
    intro:
      "Mueve los controles según tu negocio. Estimamos lo que te está costando cada mes un seguimiento lento o inconsistente, usando únicamente tus propios números.",
  },
  inputs: {
    sectionLabel: "Tu operación",
    monthlyLeads: { label: "Leads mensuales", unit: "leads/mes" },
    avgDealValue: { label: "Valor promedio de cierre", unit: "$" },
    closeRate: { label: "Tasa de cierre actual", unit: "%" },
    lostToExecutionPct: {
      label: "% de leads que se pierden por seguimiento lento o inconsistente",
      unit: "%",
      helper: "Leads que se enfrían antes de que alguien les dé seguimiento, o se pierden después del primer mensaje.",
    },
    avgHoursToFirstContact: { label: "Horas promedio para el primer contacto", unit: "h" },
    responseTimeFlag: {
      thresholdHours: 4,
      warningText: "Eso está por encima de las 4 horas que recomendamos para el primer contacto.",
    },
  },
  results: {
    sectionLabel: "Tu diagnóstico",
    moneyLeftLabel: "Ingresos que estás dejando sobre la mesa cada mes",
    potentialRevenueLabel: "Tu ingreso mensual potencial",
    currentRevenueLabel: "Ingreso mensual actual",
    leadsLostLabel: "Leads perdidos por ejecución",
    leadsRecoverableLabel: "Leads recuperables con un sistema",
    annualGapLabel: "Brecha anual acumulada",
    perMonthSuffix: "/mes",
    perYearSuffix: "/año",
  },
  methodology: {
    headline: "Cómo lo calculamos",
    body: "Asumimos que el 60% de los leads perdidos por un seguimiento lento o inconsistente se vuelven recuperables cuando cada lead recibe una respuesta rápida y constante. Esta es una estimación propia de esta calculadora, no una cifra auditada ni de un tercero, aplicada a los números que ingresaste arriba.",
  },
  finalCta: {
    headline: "¿Quieres cerrar esa brecha?",
    intro: "Te mostramos exactamente dónde se rompe tu seguimiento y qué automatizar primero.",
    primaryCta: { label: "Solicitar mi auditoría", href: "/contact" },
    secondaryCta: { label: "Agendar una llamada", href: "/schedule" },
  },
  disclaimer:
    "Todas las cifras son estimaciones calculadas a partir de los datos que ingresas y del supuesto descrito arriba. Ilustran un escenario, no un resultado garantizado para tu negocio.",
};
