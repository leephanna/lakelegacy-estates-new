import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    source: "lakelegacy-estates-clean",
    ts: Date.now()
  });
}
