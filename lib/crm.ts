import "server-only";

// Contact-intake integration for the /contact qualification form.
// Configure via CRM_API_TOKEN and CRM_LOCATION_ID (see .env.local.example).

const CRM_API_BASE = "https://services.leadconnectorhq.com";
const CRM_API_VERSION = "2021-07-28";

export interface LeadPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  industry?: string;
  leadVolume?: string;
  leadSource?: string;
  currentCrm?: string;
  channels?: string[];
  mainProblem?: string;
  automationGoal?: string;
  teamSize?: string;
  notes?: string;
  locale: string;
}

export interface SubmitLeadResult {
  ok: boolean;
  error?: string;
  message?: string;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() ?? fullName;
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

// Strips formatting characters (spaces, dashes, parens, dots) that would
// otherwise inflate the string past the CRM's phone-number length check —
// keeps digits and a leading "+" only.
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return (hasLeadingPlus ? "+" : "") + digits;
}

function buildNoteBody(payload: LeadPayload): string {
  const lines = [
    `Business audit request (${payload.locale})`,
    payload.website ? `Website: ${payload.website}` : null,
    payload.industry ? `Industry: ${payload.industry}` : null,
    payload.leadVolume ? `Monthly lead volume: ${payload.leadVolume}` : null,
    payload.leadSource ? `Main lead source: ${payload.leadSource}` : null,
    payload.currentCrm ? `Current CRM: ${payload.currentCrm}` : null,
    payload.channels?.length ? `Channels: ${payload.channels.join(", ")}` : null,
    payload.teamSize ? `Team size: ${payload.teamSize}` : null,
    payload.mainProblem ? `Main problem: ${payload.mainProblem}` : null,
    payload.automationGoal ? `Wants to automate: ${payload.automationGoal}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const token = process.env.CRM_API_TOKEN;
  const locationId = process.env.CRM_LOCATION_ID;

  if (!token || !locationId) {
    console.error("[crm] CRM_API_TOKEN / CRM_LOCATION_ID are not configured.");
    return { ok: false, error: "not_configured" };
  }

  const { firstName, lastName } = splitName(payload.name);
  const phone = normalizePhone(payload.phone);

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: CRM_API_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const contactRes = await fetch(`${CRM_API_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        name: payload.name,
        email: payload.email,
        phone,
        companyName: payload.businessName,
        website: payload.website || undefined,
        source: "Website — Business Audit form",
        tags: ["website-lead", "business-audit-request"],
      }),
    });

    const contactJson = await contactRes.json().catch(() => null);

    if (!contactRes.ok) {
      console.error("[crm] contact create failed", contactRes.status, contactJson);
      if (contactRes.status >= 400 && contactRes.status < 500) {
        return {
          ok: false,
          error: "validation_error",
          message: typeof contactJson?.message === "string" ? contactJson.message : undefined,
        };
      }
      return { ok: false, error: "crm_error" };
    }

    const contactId: string | undefined = contactJson?.contact?.id;

    if (contactId) {
      const noteRes = await fetch(`${CRM_API_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: buildNoteBody(payload) }),
      });
      if (!noteRes.ok) {
        console.error("[crm] note create failed", noteRes.status, await noteRes.text());
      }
    }

    return { ok: true };
  } catch (error) {
    console.error("[crm] request failed", error);
    return { ok: false, error: "network_error" };
  }
}
