import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { submitLead, type LeadPayload } from "@/lib/crm";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: Partial<LeadPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const required = ["name", "businessName", "email", "phone", "locale"] as const;
  for (const field of required) {
    if (!isNonEmptyString(body[field])) {
      return NextResponse.json(
        { ok: false, error: "missing_field", field },
        { status: 400 }
      );
    }
  }

  const result = await submitLead(body as LeadPayload);

  if (!result.ok) {
    const status = result.error === "validation_error" ? 400 : 502;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
