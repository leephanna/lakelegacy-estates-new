// app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";         // we need process.env
export const dynamic = "force-dynamic";  // avoid any caching

// Basic CORS (browser form posts from your site)
const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, Origin",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

// Health ping
export async function GET() {
  return NextResponse.json({ ok: true, message: "Lead API wired to Worker" });
}

// Preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

type LeadPayload = {
  form_kind?: "buyer" | "seller" | "partner" | "address_unlock" | "nda" | "generic";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  let body: Partial<LeadPayload> = {};

  try {
    body = (await req.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400, headers: corsHeaders(origin) }
    );
  }

  const { form_kind = "buyer", name = "", email = "", phone = "", message = "" } = body;

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (name, email)" },
      { status: 400, headers: corsHeaders(origin) }
    );
  }

  const workerUrl = process.env.WORKER_LEAD_URL;
  if (!workerUrl) {
    return NextResponse.json(
      { ok: false, error: "WORKER_LEAD_URL not configured on Vercel" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }

  // Forward to the Worker; pass Origin through so CORS policy can validate it
  try {
    const res = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Propagate origin so Worker allow-list can see the real site origin
        ...(origin ? { Origin: origin } : {}),
      },
      body: JSON.stringify({ form_kind, name, email, phone, message }),
      // Reasonable guardrail
      cache: "no-store",
    });

    const text = await res.text();
    const maybeJson = safeJson(text);

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, upstream_status: res.status, error: "Worker call failed", details: maybeJson ?? text },
        { status: 502, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(maybeJson ?? { ok: true, sent: true }, { headers: corsHeaders(origin) });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Network error contacting Worker", details: String(e?.message || e) },
      { status: 502, headers: corsHeaders(origin) }
    );
  }
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
