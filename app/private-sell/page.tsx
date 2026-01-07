'use client';

import { useMemo, useState } from 'react';

type SubmitStatus = 'idle' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;

  sellingSituation: string;
  timeline: string;

  propertyType: string;
  locationFocus: string; // lake/area/county/city
  approxValue: string;

  privacyLevel: string;
  showingsReadiness: string;
  motivation: string;

  notes: string;

  website: string; // honeypot
}

const SELLING_SITUATION_OPTIONS = [
  { value: '', label: 'Select your situation…' },
  { value: 'considering', label: 'Considering a sale (early stage)' },
  { value: 'ready_now', label: 'Ready to sell soon' },
  { value: 'testing_off_market', label: 'Testing discreet off-market interest' },
  { value: 'relocation', label: 'Relocation / timing-driven' },
  { value: 'estate', label: 'Estate / trust / family transition' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select timeline…' },
  { value: '0_3', label: '0–3 months' },
  { value: '3_6', label: '3–6 months' },
  { value: '6_12', label: '6–12 months' },
  { value: '12_plus', label: '12+ months' },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: '', label: 'Select property type…' },
  { value: 'lake_home', label: 'Lake home' },
  { value: 'cabin', label: 'Cabin' },
  { value: 'luxury_estate', label: 'Luxury estate' },
  { value: 'land', label: 'Lake lot / land' },
  { value: 'multi', label: 'Multi-property portfolio' },
];

const APPROX_VALUE_OPTIONS = [
  { value: '', label: 'Select estimated value…' },
  { value: 'under_750', label: 'Under $750K' },
  { value: '750_1_25', label: '$750K – $1.25M' },
  { value: '1_25_2_5', label: '$1.25M – $2.5M' },
  { value: '2_5_5', label: '$2.5M – $5M' },
  { value: '5_plus', label: '$5M+' },
];

const PRIVACY_OPTIONS = [
  { value: '', label: 'Select privacy preference…' },
  { value: 'very_discreet', label: 'Very discreet (no public marketing)' },
  { value: 'select_buyers', label: 'Quiet marketing to select qualified buyers' },
  { value: 'open_to_mls', label: 'Open to MLS later (start private first)' },
];

const SHOWINGS_OPTIONS = [
  { value: '', label: 'Select readiness…' },
  { value: 'ready', label: 'Ready for private showings soon' },
  { value: 'prep_needed', label: 'Some prep needed first' },
  { value: 'seasonal', label: 'Seasonal timing (spring/summer/fall)' },
];

const styles = {
  page: 'mx-auto w-full max-w-5xl px-4 py-10 md:py-14',
  h1: 'font-serif text-4xl md:text-6xl tracking-tight text-neutral-900',
  sub: 'mt-3 text-base md:text-lg text-neutral-700 max-w-3xl',
  card: 'mt-8 rounded-2xl border border-neutral-200 bg-white shadow-sm',
  cardInner: 'p-6 md:p-8',
  sectionTitle: 'text-sm font-semibold tracking-widest text-neutral-600 uppercase',
  grid2: 'mt-4 grid grid-cols-1 gap-4 md:grid-cols-2',
  label: 'block text-sm font-medium text-neutral-800',
  input:
    'mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400',
  select:
    'mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400',
  textarea:
    'mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 min-h-[120px]',
  hr: 'my-8 border-neutral-200',
  btnRow: 'mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
  btn:
    'inline-flex items-center justify-center rounded-xl bg-[#b89b5e] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95 active:brightness-90 disabled:opacity-60',
  fine: 'text-xs text-neutral-600',
  alertErr:
    'mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800',
  alertOk:
    'mt-4 rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm',
  okTitle: 'font-serif text-3xl md:text-4xl text-neutral-900',
  okSub: 'mt-2 text-sm md:text-base text-neutral-700',
};

function buildMessage(data: FormData) {
  const lines: string[] = [];
  lines.push('PRIVATE SELL REQUEST');
  lines.push('');
  lines.push(`Situation: ${data.sellingSituation || '-'}`);
  lines.push(`Timeline: ${data.timeline || '-'}`);
  lines.push('');
  lines.push(`Property Type: ${data.propertyType || '-'}`);
  lines.push(`Location Focus: ${data.locationFocus || '-'}`);
  lines.push(`Estimated Value: ${data.approxValue || '-'}`);
  lines.push('');
  lines.push(`Privacy Level: ${data.privacyLevel || '-'}`);
  lines.push(`Showings Readiness: ${data.showingsReadiness || '-'}`);
  lines.push('');
  if (data.motivation?.trim()) {
    lines.push('Motivation / Context:');
    lines.push(data.motivation.trim());
    lines.push('');
  }
  if (data.notes?.trim()) {
    lines.push('Additional Notes:');
    lines.push(data.notes.trim());
    lines.push('');
  }
  return lines.join('\n');
}

export default function PrivateSellPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',

    sellingSituation: '',
    timeline: '',

    propertyType: '',
    locationFocus: '',
    approxValue: '',

    privacyLevel: '',
    showingsReadiness: '',
    motivation: '',

    notes: '',
    website: '',
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NOTE: In Next.js, NEXT_PUBLIC_* env vars are inlined at build time.
  const leadEndpoint = useMemo(() => {
    return (process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '').trim();
  }, []);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.sellingSituation &&
      form.timeline &&
      form.propertyType &&
      form.approxValue &&
      form.privacyLevel
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    // honeypot hit -> pretend success (bot gets no signal)
    if (form.website?.trim()) {
      setStatus('success');
      return;
    }

    if (!leadEndpoint) {
      setStatus('error');
      setErrorMsg(
        'Lead endpoint is not configured. Please set NEXT_PUBLIC_LEAD_ENDPOINT in Vercel.'
      );
      return;
    }

    if (!canSubmit) {
      setStatus('error');
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        form_kind: 'private_sell',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: buildMessage(form),
        source:
          typeof window !== 'undefined' ? window.location.href : 'private-sell',
        website: '', // keep empty (honeypot already checked)
      };

      const res = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed: ${res.status}`);
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(
        err?.message?.slice(0, 240) ||
          'Something went wrong. Please try again, or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.alertOk}>
          <div className={styles.okTitle}>Thanks — we’ll reach out shortly</div>
          <div className={styles.okSub}>
            We’ll review your goals, confirm privacy preferences, and follow up
            with a discreet plan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Private Seller Intake</h1>
      <p className={styles.sub}>
        Share the basics and your privacy preferences. We’ll build a discreet
        strategy and (if desired) quietly match with qualified buyers before any
        public marketing.
      </p>

      <div className={styles.card}>
        <div className={styles.cardInner}>
          <form onSubmit={onSubmit}>
            <div className={styles.sectionTitle}>Contact</div>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className={styles.label}>
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className={styles.label}>
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  className={styles.input}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(###) ###-####"
                  autoComplete="tel"
                />
              </div>

              {/* honeypot (hidden) */}
              <div className="hidden">
                <label className={styles.label}>Website</label>
                <input
                  className={styles.input}
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  placeholder="Leave blank"
                />
              </div>
            </div>

            <div className={styles.hr} />

            <div className={styles.sectionTitle}>Seller Profile</div>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>
                  Where are you in the process?{' '}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  className={styles.select}
                  value={form.sellingSituation}
                  onChange={(e) =>
                    setForm({ ...form, sellingSituation: e.target.value })
                  }
                >
                  {SELLING_SITUATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.label}>
                  Timeline <span className="text-red-600">*</span>
                </label>
                <select
                  className={styles.select}
                  value={form.timeline}
                  onChange={(e) =>
                    setForm({ ...form, timeline: e.target.value })
                  }
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.hr} />

            <div className={styles.sectionTitle}>Property Basics</div>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>
                  Property Type <span className="text-red-600">*</span>
                </label>
                <select
                  className={styles.select}
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm({ ...form, propertyType: e.target.value })
                  }
                >
                  {PROPERTY_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.label}>
                  Estimated Value <span className="text-red-600">*</span>
                </label>
                <select
                  className={styles.select}
                  value={form.approxValue}
                  onChange={(e) =>
                    setForm({ ...form, approxValue: e.target.value })
                  }
                >
                  {APPROX_VALUE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={styles.label}>
                  Lake / Area / County (optional)
                </label>
                <input
                  className={styles.input}
                  value={form.locationFocus}
                  onChange={(e) =>
                    setForm({ ...form, locationFocus: e.target.value })
                  }
                  placeholder="e.g., Minnetonka / White Bear / Prior Lake / Brainerd Lakes / etc."
                />
              </div>
            </div>

            <div className={styles.hr} />

            <div className={styles.sectionTitle}>Privacy & Strategy</div>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>
                  Privacy Preference <span className="text-red-600">*</span>
                </label>
                <select
                  className={styles.select}
                  value={form.privacyLevel}
                  onChange={(e) =>
                    setForm({ ...form, privacyLevel: e.target.value })
                  }
                >
                  {PRIVACY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.label}>
                  Showings Readiness (optional)
                </label>
                <select
                  className={styles.select}
                  value={form.showingsReadiness}
                  onChange={(e) =>
                    setForm({ ...form, showingsReadiness: e.target.value })
                  }
                >
                  {SHOWINGS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={styles.label}>
                  Motivation / context (optional)
                </label>
                <textarea
                  className={styles.textarea}
                  value={form.motivation}
                  onChange={(e) =>
                    setForm({ ...form, motivation: e.target.value })
                  }
                  placeholder="Anything we should know? (timing, privacy, constraints, ideal outcome)"
                />
              </div>

              <div className="md:col-span-2">
                <label className={styles.label}>Additional notes (optional)</label>
                <textarea
                  className={styles.textarea}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Upgrades, dock/lakeshore, unique features, restrictions, etc."
                />
              </div>
            </div>

            {status === 'error' && (
              <div className={styles.alertErr}>{errorMsg}</div>
            )}

            <div className={styles.btnRow}>
              <button
                type="submit"
                className={styles.btn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Request Private Sell Strategy'}
              </button>

              <div className={styles.fine}>
                Prefer phone? Call <strong>651-262-8312</strong>
                <div className="mt-1">We respect privacy. No spam. Unsubscribe anytime.</div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl text-neutral-800">
        <h2 className="font-serif text-2xl">What happens next</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-2">
          <li>We confirm privacy level and timeline within 24 hours</li>
          <li>We propose a discreet strategy (private-first vs. staged marketing)</li>
          <li>We match with qualified buyers where appropriate</li>
          <li>We coordinate next steps (prep, pricing, and private showings)</li>
        </ul>
      </div>
    </div>
  );
}
