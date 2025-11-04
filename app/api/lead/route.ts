import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // just prove the route works
  const data = await req.json().catch(() => ({}));
  console.log("Stub lead received:", data);
  return NextResponse.json({ ok: true, message: "Lead accepted (stub). Email not enabled yet." });
}

export async function GET() {
  // make it easy to test in browser
  return NextResponse.json({ ok: true, message: "Lake & Legacy API is up." });
}
