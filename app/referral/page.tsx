"use client";
import { useState } from "react";

export default function ReferralPage() {
  const [status, setStatus] = useState<"idle"|"ok"|"err">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, formKind: "referral" })
    });

    if (res.ok) setStatus("ok");
    else setStatus("err");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Referral Submission</h1>
      <p className="text-slate-300/80">
        Fill this out — we&apos;ll connect you with Lake &amp; Legacy.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input name="name" required placeholder="Full name"
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <input name="email" type="email" required placeholder="Email"
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <input name="phone" placeholder="Phone"
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <textarea name="message" rows={4} placeholder="Tell us about your referral"
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <button
          type="submit"
          className="rounded bg-emerald-500 px-4 py-2 font-semibold text-slate-900">
          Send
        </button>
      </form>
      {status === "ok" && (
        <p className="text-emerald-300">Lead accepted (stub). Email not wired yet.</p>
      )}
      {status === "err" && (
        <p className="text-red-300">Something went wrong.</p>
      )}
    </div>
  );
}
