// app/api/lead/route.ts (Phase 2 — forward to Worker)
import { NextResponse } from "next/server";

const ENDPOINT =
  process.env.WORKER_ENDPOINT ??
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://ai4u-concierge-mail.leehanna8.workers.dev/lead";

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}));
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: res.ok, worker: { status: res.status, data } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Forwarding failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Lead API ready (Phase 2)" });
}
