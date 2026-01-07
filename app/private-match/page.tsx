"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  situation: string;
  timeline: string;
  budget: string;
  priorities: string[];
  notes: string;
  website: string; // honeypot
};

const SITUATIONS = [
  "Researching / exploring options",
  "Actively looking (no agent yet)",
  "Working with an agent already",
  "Buying as an investment",
  "Buying as a primary/seasonal home",
];

const TIMELINES = ["ASAP (0–30 days)", "1–3 months", "3–6 months", "6–12 months", "12+ months"];

const BUDGETS = ["$750k–$1.25M", "$1.25M–$2.5M", "$2.5M+", "Not sure yet"];

const PRIORITIES = [
  "Large, recreational lake",
  "Quiet / private water",
  "Privacy / seclusion",
  "Fishing / hunting access",
  "Maximum waterfront footage",
  "Dock / boating infrastructure",
  "Proximity to cities",
  "Year-round accessibility",
];

export default function PrivateMatchPage() {
  const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    situation: "",
    timeline: "",
    budget: "",
    priorities: [],
    notes: "",
    website: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    if (!form.name || !form.email || !form.phone) return false;
    if (!form.situation || !form.timeline || !form.budget) return false;
    return true;
  }, [form]);

  function togglePriority(p: string) {
    setForm((prev) => {
      const has = prev.priorities.includes(p);
      return { ...prev, priorities: has ? prev.priorities.filter((x) => x !== p) : [...prev.priorities, p] };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Honeypot: bots fill hidden field
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
        `PRIVATE MATCH REQUEST\n\n` +
        `Situation: ${form.situation}\n` +
        `Timeline: ${form.timeline}\n` +
        `Budget: ${form.budget}\n` +
        `Lake Priorities: ${form.priorities.length ? form.priorities.join(", ") : "—"}\n\n` +
        `Notes:\n${form.notes || "—"}`;

      const payload = {
        form_kind: "private_match",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        source: typeof window !== "undefined" ? window.location.href : "",
        website: form.website, // honeypot
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
              We review your requirements within 24 hours, search for matching private opportunities, and then follow up
              with curated options.
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
          <h1 className="text-4xl font-semibold tracking-tight">Private Lake Property Match</h1>
          <p className="mt-3 max-w-2xl text-black/70">
            Tell us what you’re looking for. We’ll match you with off-market and discreet opportunities before they hit
            the public market.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left: form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              {/* Honeypot */}
              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                aria-hidden="true"
              />

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    type="email"
                    required
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Where are you in the process? *</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.situation}
                    onChange={(e) => setForm((p) => ({ ...p, situation: e.target.value }))}
                    required
                  >
                    <option value="">Select your situation...</option>
                    {SITUATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <label className="text-sm font-medium">Budget Range *</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                    value={form.budget}
                    onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                    required
                  >
                    <option value="">Select budget range...</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-sm font-medium">Lake Priorities (select all that apply)</div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {PRIORITIES.map((p) => {
                    const checked = form.priorities.includes(p);
                    return (
                      <label
                        key={p}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3"
                      >
                        <span className="text-sm">{p}</span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePriority(p)}
                          className="h-4 w-4 accent-[#b89a4f]"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                  placeholder="Any specific requirements, preferred locations, or additional details..."
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
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
                  {submitting ? "Submitting..." : "Get My Private Matches"}
                </button>
                <div className="text-sm text-black/60">
                  Prefer phone? Call <span className="font-semibold text-black">651-262-8312</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-black/50">We respect your privacy. No spam. Unsubscribe anytime.</div>
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70">
                <li>We review your requirements within 24 hours</li>
                <li>We search our private database for matching properties</li>
                <li>We send you a curated list of off-market opportunities</li>
                <li>We coordinate private showings for properties of interest</li>
              </ul>
            </div>
          </div>

          {/* Right: trust / concierge card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-black/50">Private Client Concierge</div>
              <div className="mt-2 text-lg font-semibold">Jamie McNeely</div>
              <div className="mt-1 text-sm text-black/70">Coldwell Banker — Leonhardt Team</div>

              <div className="mt-6 space-y-3 text-sm text-black/70">
                <div>✓ Verified capacity program</div>
                <div>✓ Discreet off-market inventory</div>
                <div>✓ White-glove showings & negotiation</div>
              </div>

              <div className="mt-6 rounded-xl bg-[#f7f4ef] p-4 text-sm text-black/70">
                Tip: Buyers who share 3–5 must-haves (and 1–2 dealbreakers) get faster matches.
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
