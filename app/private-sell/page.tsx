"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;

  propertyAddress: string;
  lakeArea: string;
  timeline: string;
  priceExpectation: string;
  privacyLevel: string;
  notes: string;

  website: string; // honeypot
};

const TIMELINES = ["ASAP (0–30 days)", "1–3 months", "3–6 months", "6–12 months", "12+ months"];
const PRIVACY = ["Highly discreet (no signage)", "Selective marketing", "Open to public listing later", "Not sure yet"];

export default function PrivateSellPage() {
  const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    lakeArea: "",
    timeline: "",
    priceExpectation: "",
    privacyLevel: "",
    notes: "",
    website: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    if (!form.name || !form.email || !form.phone) return false;
    if (!form.propertyAddress || !form.lakeArea) return false;
    if (!form.timeline || !form.priceExpectation || !form.privacyLevel) return false;
    return true;
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.website.trim()) return;

    if (!leadEndpoint) {
      setError("Lead endpoint is not configured. Please set NEXT_PUBLIC_LEAD_ENDPOINT in Vercel.");
      return;
    }

    if (!canSubmit) {
      setError("Please complete the required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const message =
        `PRIVATE SELL REQUEST\n\n` +
        `Property: ${form.propertyAddress}\n` +
        `Lake/Area: ${form.lakeArea}\n` +
        `Timeline: ${form.timeline}\n` +
        `Price Expectation: ${form.priceExpectation}\n` +
        `Privacy Level: ${form.privacyLevel}\n\n` +
        `Notes:\n${form.notes || "—"}`;

      const payload = {
        form_kind: "private_sell",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        source: typeof window !== "undefined" ? window.location.href : "",
        website: form.website,
      };

      const res = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-[70vh] bg-[#f7f4ef]">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-black/10 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-tight">Thanks — we’ll reach out shortly</h1>
            <p className="mt-3 text-black/70">
              We’ll review your situation and discuss the most discreet path to qualified buyers.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f4ef]">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Discreet Seller Intake</h1>
          <p className="mt-3 max-w-2xl text-black/70">
            If you’re considering selling a lake property discreetly, we can match you with qualified private buyers —
            without broadcasting your listing.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                aria-hidden="true"
              />

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Property Address *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.propertyAddress}
                    onChange={(e) => setForm((p) => ({ ...p, propertyAddress: e.target.value }))}
                    placeholder="Street, City, State"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Lake / Area *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.lakeArea}
                    onChange={(e) => setForm((p) => ({ ...p, lakeArea: e.target.value }))}
                    placeholder="e.g., Minnetonka / White Bear / Brainerd"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Timeline *</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.timeline}
                    onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
                    required
                  >
                    <option value="">Select timeline...</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Price Expectation *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.priceExpectation}
                    onChange={(e) => setForm((p) => ({ ...p, priceExpectation: e.target.value }))}
                    placeholder="e.g., $1.8M–$2.2M"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Privacy Level *</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.privacyLevel}
                    onChange={(e) => setForm((p) => ({ ...p, privacyLevel: e.target.value }))}
                    required
                  >
                    <option value="">Select privacy...</option>
                    {PRIVACY.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Condition, improvements, dock, acreage, special considerations…"
                />
              </div>

              {error ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-xl bg-[#b89a4f] px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Request Discreet Seller Options"}
                </button>
                <div className="text-sm text-black/60">
                  Prefer phone? Call <span className="font-semibold text-black">651-262-8312</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-black/50">We respect privacy. No spam.</div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-black/50">Discreet Seller Path</div>
              <div className="mt-2 text-lg font-semibold">Private Buyer Network</div>
              <div className="mt-6 space-y-3 text-sm text-black/70">
                <div>✓ Pre-qualified buyer matching</div>
                <div>✓ Minimal footprint marketing</div>
                <div>✓ Confidential showings & paperwork</div>
              </div>
              <div className="mt-6 rounded-xl bg-[#f7f4ef] p-4 text-sm text-black/70">
                Tip: The best “quiet sale” outcomes happen when we align your privacy level with buyer qualification.
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
