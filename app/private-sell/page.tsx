"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function PrivateSellPage() {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Honeypot
  const [website, setWebsite] = useState("");

  // Seller specifics
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Lakefront Home");
  const [timeline, setTimeline] = useState("1–3 months");
  const [priceRange, setPriceRange] = useState("$1.0M–$2.0M");
  const [occupancy, setOccupancy] = useState("Owner-occupied");
  const [privacyPrefs, setPrivacyPrefs] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const privacyOptions = useMemo(
    () => [
      "No yard sign",
      "No public listing (off-market only)",
      "Showings by appointment only",
      "Neighbor discretion",
      "Anonymous marketing (no address online)",
      "Limited buyer pool (pre-qualified only)",
    ],
    []
  );

  function togglePrivacy(option: string) {
    setPrivacyPrefs((prev) =>
      prev.includes(option) ? prev.filter((x) => x !== option) : [...prev, option]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot: if filled, silently accept (bots)
    if (website?.trim()) {
      setStatus("success");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      setErrorMsg(
        "Lead endpoint is not configured. Please set NEXT_PUBLIC_LEAD_ENDPOINT in Vercel and redeploy."
      );
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus("error");
      setErrorMsg("Please complete Full Name, Email, and Phone.");
      return;
    }

    setStatus("submitting");

    const message =
      [
        "PRIVATE SELLER INTAKE",
        "",
        `Property Address: ${address || "(not provided)"}`,
        `Property Type: ${propertyType}`,
        `Timeline: ${timeline}`,
        `Estimated Range: ${priceRange}`,
        `Occupancy: ${occupancy}`,
        `Privacy Preferences: ${privacyPrefs.length ? privacyPrefs.join(", ") : "(none selected)"}`,
        "",
        "Additional Notes:",
        notes || "(none)",
      ].join("\n");

    const payload = {
      form_kind: "private_sell",
      name,
      email,
      phone,
      message,
      source:
        typeof window !== "undefined" ? window.location.href : "https://lakelegacy-estates-new.vercel.app/private-sell",
      website: "", // honeypot field
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Lead submit failed: ${res.status} ${res.statusText} ${txt}`.trim());
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong submitting the form.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 shadow-xl">
          <h1 className="text-4xl font-semibold tracking-tight">Thanks — we’ll reach out shortly</h1>
          <p className="mt-4 text-white/70">
            We’ll review your privacy preferences and follow up with a discreet next step plan.
          </p>
          <div className="mt-8 text-sm text-white/60">
            Prefer phone? Call <span className="font-semibold text-white">651-262-8312</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl md:p-10">
          <h1 className="text-5xl font-semibold tracking-tight">Private Seller Intake</h1>
          <p className="mt-4 text-white/70">
            Share the basics and your privacy preferences. We’ll build a discreet strategy and (if desired)
            quietly match with qualified buyers before any public marketing.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {/* Honeypot */}
            <div className="hidden">
              <label className="text-sm">Website</label>
              <input value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-white/80">Full Name *</label>
                <input
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-amber-400/70"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Email *</label>
                <input
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-amber-400/70"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-white/80">Phone *</label>
                <input
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-amber-400/70"
                  placeholder="(###) ###-####"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Property Address</label>
                <input
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-amber-400/70"
                  placeholder="Street / City (optional)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-white/80">Property Type</label>
                <select
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white outline-none focus:border-amber-400/70"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>Lakefront Home</option>
                  <option>Luxury Cabin</option>
                  <option>Estate / Compound</option>
                  <option>Farm / Acreage</option>
                  <option>Lot / Buildable</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/80">Timeline *</label>
                <select
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white outline-none focus:border-amber-400/70"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                >
                  <option>ASAP</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Exploring options</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-white/80">Estimated Range</label>
                <select
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white outline-none focus:border-amber-400/70"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option>$750K–$1.0M</option>
                  <option>$1.0M–$2.0M</option>
                  <option>$2.0M–$3.5M</option>
                  <option>$3.5M+</option>
                  <option>Not sure</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/80">Occupancy</label>
                <select
                  className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white outline-none focus:border-amber-400/70"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)}
                >
                  <option>Owner-occupied</option>
                  <option>Seasonal / second home</option>
                  <option>Tenant-occupied</option>
                  <option>Vacant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-white/80">Privacy Preferences (select all that apply)</label>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {privacyOptions.map((opt) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 bg-neutral-950/30 px-4 py-3 hover:border-white/20"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-amber-400"
                      checked={privacyPrefs.includes(opt)}
                      onChange={() => togglePrivacy(opt)}
                    />
                    <span className="text-sm text-white/85">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-white/80">Additional Notes</label>
              <textarea
                className="mt-2 w-full rounded-md border border-white/10 bg-neutral-950/60 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-amber-400/70"
                rows={5}
                placeholder="Anything we should know (lake, privacy needs, showings, special features, constraints)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {status === "error" && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 font-semibold text-neutral-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Submitting..." : "Request Private Seller Strategy"}
              </button>
              <div className="text-sm text-white/60">
                Prefer phone? Call <span className="font-semibold text-white">651-262-8312</span>
              </div>
            </div>

            <div className="text-xs text-white/50">
              We respect your privacy. No spam. Unsubscribe anytime.
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl md:p-10">
          <h2 className="text-xl font-semibold">What happens next</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>• We confirm your privacy requirements</li>
            <li>• We prepare a discreet pricing + positioning plan</li>
            <li>• If desired, we quietly match with qualified buyers</li>
            <li>• No public marketing unless you approve</li>
          </ul>

          <div className="mt-8 rounded-xl border border-white/10 bg-neutral-950/40 p-5">
            <div className="text-sm font-semibold">Backend status</div>
            <div className="mt-2 text-sm text-white/70">
              Lead endpoint:{" "}
              <span className={endpoint ? "text-emerald-300" : "text-red-300"}>
                {endpoint ? "Configured" : "Not configured"}
              </span>
            </div>
            {!endpoint && (
              <div className="mt-3 text-xs text-white/55">
                Set <code className="text-white">NEXT_PUBLIC_LEAD_ENDPOINT</code> in Vercel and redeploy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
