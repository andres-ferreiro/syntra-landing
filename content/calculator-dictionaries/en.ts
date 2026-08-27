import type { CalculatorDictionary } from "@/content/calculator-types";

export const en: CalculatorDictionary = {
  meta: {
    title: "Revenue Leak Calculator: mandhy",
    description:
      "See how much revenue slips away every month when leads wait too long for a reply, and what a faster, consistent follow-up system could recover.",
  },
  hero: {
    headline: "How much revenue is slipping through your follow-up?",
    intro:
      "Move the sliders to match your business. We'll estimate what slow or inconsistent follow-up is costing you every month, based only on your own numbers.",
  },
  inputs: {
    sectionLabel: "Your operation",
    monthlyLeads: { label: "Monthly leads", unit: "leads/mo" },
    avgDealValue: { label: "Average deal value", unit: "$" },
    closeRate: { label: "Current close rate", unit: "%" },
    lostToExecutionPct: {
      label: "% of leads lost to slow or inconsistent follow-up",
      unit: "%",
      helper: "Leads that go cold before anyone follows up, or fall through the cracks after the first message.",
    },
    avgHoursToFirstContact: { label: "Average hours to first contact", unit: "h" },
    responseTimeFlag: {
      thresholdHours: 4,
      warningText: "That's above the 4-hour window we recommend for first contact.",
    },
  },
  results: {
    sectionLabel: "Your diagnosis",
    moneyLeftLabel: "Revenue you're leaving on the table every month",
    potentialRevenueLabel: "Your potential monthly revenue",
    currentRevenueLabel: "Current monthly revenue",
    leadsLostLabel: "Leads lost to execution",
    leadsRecoverableLabel: "Leads recoverable with a system",
    annualGapLabel: "Accumulated annual gap",
    perMonthSuffix: "/mo",
    perYearSuffix: "/yr",
  },
  methodology: {
    headline: "How we calculate this",
    body: "We assume 60% of leads lost to slow or inconsistent follow-up become recoverable once every lead gets a fast, consistent response. That's this calculator's own illustrative estimate, not an audited or third-party statistic, applied to the numbers you entered above.",
  },
  finalCta: {
    headline: "Want to close that gap?",
    intro: "We'll show you exactly where your follow-up breaks down and what to automate first.",
    primaryCta: { label: "Request my audit", href: "/contact" },
    secondaryCta: { label: "Book a call", href: "/schedule" },
  },
  disclaimer:
    "All figures are estimates calculated from the inputs you provide and the assumption described above. They illustrate a scenario, not a guaranteed outcome for your business.",
};
