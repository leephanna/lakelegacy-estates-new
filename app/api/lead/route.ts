// app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";

// Run on Node so we can read process.env safely
export const runtime = "nodejs";

// Health ping (optional)
export async function GET() {
  return NextResponse.json({ ok: true, message: "Lead API ready (Phase 2)" });
}

// CORS preflight for form posts
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

type LeadPayload = {
  form_kind: "buyer" | "seller" | "partner" | "address_unlock" | "nda" | string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;
    const { form_kind, name, email, phone = "", message = "" } = body ?? {};

    // Basic validation
    if (!form_kind || !name || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (form_kind, name, email)" },
        { status: 400 }
      );
    }

    // Forward to Cloudflare Worker
    const workerUrl =
      process.env.WORKER_LEAD_URL ||
      "https://ai4u-concierge-mail.leehanna8.workers.dev/lead";

    const forwarded = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Pass through the real page origin (helps CORS logs/debug)
        Origin:
          req.headers.get("origin") ?? "https://lakelegacy-estates-new.vercel.app",
      },
      body: JSON.stringify({ form_kind, name, email, phone, message }),
    });

    // Bubble up Worker response
    const text = await forwarded.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!forwarded.ok) {
      return NextResponse.json(
        { ok: false, status: forwarded.status, data },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

