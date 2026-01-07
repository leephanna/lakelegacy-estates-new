"use client";

import React, { useMemo, useState } from "react";

type Situation =
  | "actively_buying"
  | "researching"
  | "selling_and_buying"
  | "investing"
  | "unsure";

type Timeline =
  | "0_3"
  | "3_6"
  | "6_12"
  | "12_plus"
  | "just_browsing";

type Budget =
  | "under_500"
  | "500_750"
  | "750_1m"
  | "1m_1_5m"
  | "1_5m_2_5m"
  | "2_5m_plus";

type Priority =
  | "large_recreational"
  | "quiet_private"
  | "privacy_seclusion"
  | "fishing_hunting"
  | "max_waterfront"
  | "dock_boating"
  | "proximity_cities"
  | "year_round_access";

const ENDPOINT =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_LEAD_ENDPOINT) ||
  "";

const SITUATION_LABELS: Record<Situation, string> = {
  actively_buying: "Actively buying a lake property",
  researching: "Researching / exploring options",
  selling_and_buying: "Selling and buying",
  investing: "Investor / second home",
  unsure: "Not sure yet",
};

const TIMELINE_LABELS: Record<Timeline, string> = {
  "0_3": "0–3 months",
  "3_6": "3–6 months",
  "6_12": "6–12 months",
  "12_plus": "12+ months",
  just_browsing: "Just browsing",
};

const BUDGET_LABELS: Record<Budget, string> = {
  under_500: "Under $500K",
  "500_750": "$500K – $750K",
  "750_1m": "$750K – $1M",
  "1m_1_5m": "$1M – $1.5M",
  "1_5m_2_5m": "$1.5M – $2.5M",
  "2_5m_plus": "$2.5M+",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  large_recreational: "Large, recreational lake",
  quiet_private: "Quiet / private water",
  privacy_seclusion: "Privacy / seclusion",
  fishing_hunting: "Fishing / hunting access",
  max_waterfront: "Maximum waterfront footage",
  dock_boating: "Dock / boating infrastructure",
  proximity_cities: "Proximity to cities",
  year_round_access: "Year-round accessibility",
};

export default function PrivateMatchPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [situation, setSituation] = useState<Situation | "">("");
  const [timeline, setTimeline] = useState<Timeline | "">("");
  const [budget, setBudget] = useState<Budget | "">("");
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [notes, setNotes] = useState("");

  // honeypot
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const sourceUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/private-match`;
  }, []);

  function togglePriority(p: Priority) {
    setPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function buildStructuredMessage() {
    const lines: string[] = [];
    lines.push("PRIVATE MATCH REQUEST");
    lines.push("");
    lines.push(`Situation: ${situation ? SITUATION_LABELS[situation] : ""}`);
    lines.push(`Timeline: ${timeline ? TIMELINE_LABELS[timeline] : ""}`);
    lines.push(`Budget: ${budget ? BUDGET_LABELS[budget] : ""}`);

    const pr = priorities.map((p) => PRIORITY_LABELS[p]);
    lines.push(`Lake Priorities: ${pr.length ? pr.join(", ") : ""}`);

    lines.push("");
    lines.push("Additional Notes:");
    lines.push(notes?.trim() ? notes.trim() : "(none)");
    lines.push("");
    lines.push("---");
    lines.push("Source: Private Lake Property Match (/private-match)");

    return lines.join("\n");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // basic validation
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please complete your name, email, and phone.");
      return;
    }
    if (!situation || !timeline || !budget) {
      setErrorMsg("Please answer the required qualification questions.");
      return;
    }
    if (!ENDPOINT) {
      setErrorMsg(
        "Lead endpoint is not configured. Please set NEXT_PUBLIC_LEAD_ENDPOINT in Vercel."
      );
      return;
    }

    // honeypot trip
    if (website.trim().length > 0) {
      setSuccess(true);
      return;
    }

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: buildStructuredMessage(),
      form_kind: "private_match",
      source: sourceUrl || "",
      website: "",
    };

    try {
      setSubmitting(true);

      const res = await fetch(ENDPOINT, {
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
      setErrorMsg(
        "Something went wrong. Please try again — or contact us directly."
      );
      // Optional: uncomment for debugging
      // console.error("Private Match submit error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  // Small, self-contained styling that still plays nicely with your global styles.
  // (This prevents the “plain page” look even if global form classes are minimal.)
  const ui = {
    page: {
      background: "#f7f6f3",
      minHeight: "calc(100vh - 140px)",
      padding: "48px 0",
    } as React.CSSProperties,
    wrap: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "0 18px",
    } as React.CSSProperties,
    card: {
      background: "rgba(255,255,255,0.72)",
      border: "1px solid rgba(15, 23, 42, 0.10)",
      borderRadius: 18,
      boxShadow: "0 12px 40px rgba(15, 23, 42, 0.06)",
      overflow: "hidden",
    } as React.CSSProperties,
    header: {
      padding: "34px 28px 10px 28px",
      borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
    } as React.CSSProperties,
    h1: {
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
      fontSize: 44,
      lineHeight: 1.05,
      letterSpacing: "0.5px",
      margin: 0,
      color: "#0f172a",
    } as React.CSSProperties,
    sub: {
      marginTop: 10,
      color: "rgba(15, 23, 42, 0.72)",
      fontSize: 16,
      maxWidth: 720,
    } as React.CSSProperties,
    body: {
      padding: "26px 28px 30px 28px",
    } as React.CSSProperties,
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
    } as React.CSSProperties,
    grid1: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 14,
    } as React.CSSProperties,
    label: {
      display: "block",
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "rgba(15, 23, 42, 0.70)",
      marginBottom: 6,
    } as React.CSSProperties,
    input: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(15, 23, 42, 0.18)",
      background: "rgba(255,255,255,0.9)",
      outline: "none",
      fontSize: 15,
    } as React.CSSProperties,
    select: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(15, 23, 42, 0.18)",
      background: "rgba(255,255,255,0.9)",
      outline: "none",
      fontSize: 15,
    } as React.CSSProperties,
    textarea: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(15, 23, 42, 0.18)",
      background: "rgba(255,255,255,0.9)",
      outline: "none",
      fontSize: 15,
      minHeight: 110,
      resize: "vertical",
    } as React.CSSProperties,
    divider: {
      height: 1,
      background: "rgba(15, 23, 42, 0.08)",
      margin: "18px 0",
    } as React.CSSProperties,
    sectionTitle: {
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
      fontSize: 22,
      margin: "6px 0 8px 0",
      color: "#0f172a",
    } as React.CSSProperties,
    checkGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      paddingTop: 6,
    } as React.CSSProperties,
    checkItem: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 10px",
      borderRadius: 12,
      border: "1px solid rgba(15, 23, 42, 0.10)",
      background: "rgba(255,255,255,0.65)",
    } as React.CSSProperties,
    checkLabel: {
      color: "rgba(15, 23, 42, 0.82)",
      fontSize: 14,
      lineHeight: 1.25,
    } as React.CSSProperties,
    ctaRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 14,
      flexWrap: "wrap",
    } as React.CSSProperties,
    cta: {
      background: "#c9a961",
      color: "#111827",
      border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: 14,
      padding: "12px 18px",
      fontWeight: 700,
      cursor: "pointer",
    } as React.CSSProperties,
    ctaDisabled: {
      opacity: 0.65,
      cursor: "not-allowed",
    } as React.CSSProperties,
    privacy: {
      marginTop: 10,
      fontSize: 13,
      color: "rgba(15, 23, 42, 0.62)",
    } as React.CSSProperties,
    error: {
      marginTop: 10,
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(220, 38, 38, 0.25)",
      background: "rgba(220, 38, 38, 0.06)",
      color: "rgba(127, 29, 29, 0.95)",
      fontSize: 14,
    } as React.CSSProperties,
    success: {
      padding: "36px 28px",
      textAlign: "center",
    } as React.CSSProperties,
  };

  return (
    <div style={ui.page}>
      <div style={ui.wrap}>
        <div style={ui.card}>
          {success ? (
            <div style={ui.success}>
              <h1 style={{ ...ui.h1, fontSize: 40 }}>Thanks — we&apos;ll reach out shortly</h1>
              <p style={{ ...ui.sub, margin: "12px auto 0 auto" }}>
                We review your requirements within 24 hours, search for matching private
                opportunities, and then follow up with curated options.
              </p>
            </div>
          ) : (
            <>
              <div style={ui.header}>
                <h1 style={ui.h1}>Private Lake Property Match</h1>
                <p style={ui.sub}>
                  Access our exclusive database of off-market lake properties. Tell us your criteria
                  and we&apos;ll bring you opportunities before they hit the public market.
                </p>
              </div>

              <div style={ui.body}>
                <form onSubmit={onSubmit}>
                  {/* Honeypot (hidden) */}
                  <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                    <label>
                      Website
                      <input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div style={ui.grid2}>
                    <div>
                      <label style={ui.label}>Full Name *</label>
                      <input
                        style={ui.input}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label style={ui.label}>Email *</label>
                      <input
                        style={ui.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        inputMode="email"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label style={ui.label}>Phone *</label>
                    <input
                      style={ui.input}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      inputMode="tel"
                    />
                  </div>

                  <div style={ui.divider} />

                  <h2 style={ui.sectionTitle}>Property Qualification</h2>

                  <div style={ui.grid2}>
                    <div>
                      <label style={ui.label}>Where are you in the process? *</label>
                      <select
                        style={ui.select}
                        value={situation}
                        onChange={(e) => setSituation(e.target.value as any)}
                      >
                        <option value="">Select your situation…</option>
                        <option value="actively_buying">{SITUATION_LABELS.actively_buying}</option>
                        <option value="researching">{SITUATION_LABELS.researching}</option>
                        <option value="selling_and_buying">
                          {SITUATION_LABELS.selling_and_buying}
                        </option>
                        <option value="investing">{SITUATION_LABELS.investing}</option>
                        <option value="unsure">{SITUATION_LABELS.unsure}</option>
                      </select>
                    </div>

                    <div>
                      <label style={ui.label}>Timeline *</label>
                      <select
                        style={ui.select}
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value as any)}
                      >
                        <option value="">Select timeline…</option>
                        <option value="0_3">{TIMELINE_LABELS["0_3"]}</option>
                        <option value="3_6">{TIMELINE_LABELS["3_6"]}</option>
                        <option value="6_12">{TIMELINE_LABELS["6_12"]}</option>
                        <option value="12_plus">{TIMELINE_LABELS["12_plus"]}</option>
                        <option value="just_browsing">{TIMELINE_LABELS.just_browsing}</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label style={ui.label}>Budget Range *</label>
                    <select
                      style={ui.select}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value as any)}
                    >
                      <option value="">Select budget range…</option>
                      <option value="under_500">{BUDGET_LABELS.under_500}</option>
                      <option value="500_750">{BUDGET_LABELS["500_750"]}</option>
                      <option value="750_1m">{BUDGET_LABELS["750_1m"]}</option>
                      <option value="1m_1_5m">{BUDGET_LABELS["1m_1_5m"]}</option>
                      <option value="1_5m_2_5m">{BUDGET_LABELS["1_5m_2_5m"]}</option>
                      <option value="2_5m_plus">{BUDGET_LABELS["2_5m_plus"]}</option>
                    </select>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label style={ui.label}>Lake Priorities (select all that apply)</label>
                    <div style={ui.checkGrid}>
                      {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => {
                        const checked = priorities.includes(p);
                        return (
                          <label key={p} style={ui.checkItem}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => togglePriority(p)}
                              style={{ width: 18, height: 18, accentColor: "#c9a961" }}
                            />
                            <span style={ui.checkLabel}>{PRIORITY_LABELS[p]}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <label style={ui.label}>Additional Notes</label>
                    <textarea
                      style={ui.textarea}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific requirements, preferred locations, or additional details…"
                    />
                  </div>

                  {errorMsg ? <div style={ui.error}>{errorMsg}</div> : null}

                  <div style={ui.ctaRow}>
                    <button
                      type="submit"
                      style={{
                        ...ui.cta,
                        ...(submitting ? ui.ctaDisabled : {}),
                      }}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Get My Private Matches"}
                    </button>

                    <div style={{ fontSize: 13, color: "rgba(15,23,42,0.70)" }}>
                      Prefer phone? Call{" "}
                      <a href="tel:6512628312" style={{ color: "#0f172a", fontWeight: 700 }}>
                        651-262-8312
                      </a>
                    </div>
                  </div>

                  <div style={ui.privacy}>
                    We respect your privacy. No spam. Unsubscribe anytime.
                  </div>

                  <div style={ui.divider} />

                  <h2 style={ui.sectionTitle}>What happens next</h2>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(15,23,42,0.78)" }}>
                    <li style={{ marginBottom: 8 }}>We review your requirements within 24 hours</li>
                    <li style={{ marginBottom: 8 }}>
                      We search our private database for matching properties
                    </li>
                    <li style={{ marginBottom: 8 }}>
                      We send you a curated list of off-market opportunities
                    </li>
                    <li>We coordinate private showings for properties of interest</li>
                  </ul>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
