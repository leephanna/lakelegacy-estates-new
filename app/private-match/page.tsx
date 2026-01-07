'use client';

import { useMemo, useState } from 'react';

type SubmitStatus = 'idle' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;

  situation: string;
  timeline: string;
  budget: string;
  lakePriorities: string[];
  notes: string;

  website: string; // honeypot
}

const SITUATION_OPTIONS = [
  { value: '', label: 'Select your situation…' },
  { value: 'actively_buying', label: 'Actively buying a lake property' },
  { value: 'exploring', label: 'Exploring options / early research' },
  { value: 'selling_then_buying', label: 'Selling first, then buying' },
  { value: 'investor', label: 'Investor / second-home strategy' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select timeline…' },
  { value: '0_3', label: '0–3 months' },
  { value: '3_6', label: '3–6 months' },
  { value: '6_12', label: '6–12 months' },
  { value: '12_plus', label: '12+ months' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Select budget range…' },
  { value: '500_750', label: '$500K – $750K' },
  { value: '750_1000', label: '$750K – $1M' },
  { value: '1000_1500', label: '$1M – $1.5M' },
  { value: '1500_2000', label: '$1.5M – $2M' },
  { value: '2000_plus', label: '$2M+' },
];

const LAKE_PRIORITY_OPTIONS = [
  { value: 'large_recreational', label: 'Large, recreational lake' },
  { value: 'quiet_private', label: 'Quiet / private water' },
  { value: 'privacy_seclusion', label: 'Privacy / seclusion' },
  { value: 'fishing_hunting', label: 'Fishing / hunting access' },
  { value: 'max_waterfront', label: 'Maximum waterfront footage' },
  { value: 'dock_boating', label: 'Dock / boating infrastructure' },
  { value: 'proximity_cities', label: 'Proximity to cities' },
  { value: 'year_round', label: 'Year-round accessibility' },
];

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find(o => o.value === value)?.label || value || '—';
}

function labelsForMulti(
  options: { value: string; label: string }[],
  values: string[]
) {
  if (!values?.length) return '—';
  const map = new Map(options.map(o => [o.value, o.label]));
  return values.map(v => map.get(v) || v).join(', ');
}

export default function PrivateMatchPage() {
  const leadEndpoint = useMemo(() => {
    // If you set NEXT_PUBLIC_LEAD_ENDPOINT in Vercel, it will use it.
    // Otherwise, set it later without code changes.
    return process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '';
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    situation: '',
    timeline: '',
    budget: '',
    lakePriorities: [],
    notes: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onTogglePriority = (value: string) => {
    setFormData(prev => {
      const set = new Set(prev.lakePriorities);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, lakePriorities: Array.from(set) };
    });
  };

  const buildStructuredMessage = () => {
    const situationLabel = labelFor(SITUATION_OPTIONS, formData.situation);
    const timelineLabel = labelFor(TIMELINE_OPTIONS, formData.timeline);
    const budgetLabel = labelFor(BUDGET_OPTIONS, formData.budget);
    const prioritiesLabel = labelsForMulti(LAKE_PRIORITY_OPTIONS, formData.lakePriorities);

    const notesBlock = (formData.notes || '').trim()
      ? `\nAdditional Notes:\n${(formData.notes || '').trim()}\n`
      : `\nAdditional Notes:\n—\n`;

    return [
      'PRIVATE MATCH REQUEST',
      '',
      `Situation: ${situationLabel}`,
      `Timeline: ${timelineLabel}`,
      `Budget: ${budgetLabel}`,
      `Lake Priorities: ${prioritiesLabel}`,
      notesBlock.trimEnd(),
      '',
      '---',
      'Source: Private Lake Property Match (/private-match)',
    ].join('\n');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Honeypot: if filled, silently succeed
    if (formData.website?.trim()) {
      setSubmitStatus('success');
      return;
    }

    // Basic required validation
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus('error');
      return;
    }
    if (!formData.situation || !formData.timeline || !formData.budget) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    try {
      const message = buildStructuredMessage();

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message,
        form_kind: 'private_match',
        source: typeof window !== 'undefined' ? window.location.href : '',
        website: '', // ensure honeypot stays blank
      };

      // If leadEndpoint is not set, this will throw a clean error
      const endpoint = leadEndpoint || '';
      if (!endpoint) throw new Error('Lead endpoint not configured');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        situation: '',
        timeline: '',
        budget: '',
        lakePriorities: [],
        notes: '',
        website: '',
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh]">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm tracking-wide uppercase text-white/70">
            Private Client Concierge — Jamie McNeely
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Private Lake Property Match
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl leading-relaxed">
            Access our exclusive database of off-market lake properties. Tell us your criteria and we’ll
            surface opportunities that aren’t publicly listed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form card */}
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <form onSubmit={submit} className="p-6 md:p-8 space-y-6">
              {/* hidden honeypot */}
              <input
                className="hidden"
                type="text"
                name="website"
                value={formData.website}
                onChange={onChange}
                autoComplete="off"
                tabIndex={-1}
              />

              <div>
                <h2 className="text-xl font-semibold">Contact</h2>
                <p className="mt-1 text-white/70 text-sm">
                  We’ll reach out personally. No spam.
                </p>
              </div>

              <div className="space-y-4">
                <Field label="Full Name" required>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </Field>

                <Field label="Phone" required>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </Field>
              </div>

              <div className="pt-2 border-t border-white/10" />

              <div>
                <h3 className="text-xl font-semibold">Property Qualification</h3>
                <p className="mt-1 text-white/70 text-sm">
                  This helps us match you faster and more accurately.
                </p>
              </div>

              <div className="space-y-4">
                <Field label="Where are you in the process?" required>
                  <select
                    name="situation"
                    value={formData.situation}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  >
                    {SITUATION_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Timeline" required>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  >
                    {TIMELINE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget Range" required>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  >
                    {BUDGET_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Lake Priorities <span className="text-white/60">(select all that apply)</span>
                  </label>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {LAKE_PRIORITY_OPTIONS.map(opt => {
                      const checked = formData.lakePriorities.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => onTogglePriority(opt.value)}
                          className={[
                            'text-left rounded-lg border px-4 py-3 transition',
                            checked
                              ? 'border-white/40 bg-white/10'
                              : 'border-white/15 bg-black/25 hover:bg-white/5',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={[
                                'inline-block h-4 w-4 rounded-sm border',
                                checked ? 'bg-[#c9a34a] border-[#c9a34a]' : 'border-white/30',
                              ].join(' ')}
                            />
                            <span className="text-sm text-white/90">{opt.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="Additional Notes">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={onChange}
                    placeholder="Any specific requirements, preferred locations, or additional details…"
                    rows={5}
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </Field>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#c9a34a] text-black font-semibold py-3 px-4 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting…' : 'Get My Private Matches'}
                </button>

                <p className="mt-3 text-center text-xs text-white/60">
                  We respect your privacy. No spam. Unsubscribe anytime.
                </p>

                {submitStatus === 'success' && (
                  <p className="mt-4 text-center text-sm text-emerald-300">
                    Thanks — we’ll reach out shortly.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-center text-sm text-red-300">
                    Something went wrong. Please try again — or contact us directly.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right rail (matches your “luxury + trust” vibe) */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">What happens next</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• We review your requirements within 24 hours</li>
                <li>• We search private inventory + agent networks</li>
                <li>• You receive a curated shortlist of off-market matches</li>
                <li>• We coordinate private showings for properties of interest</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">Prefer to talk now?</h3>
              <p className="mt-2 text-sm text-white/80">
                Call or text and we’ll guide you through options quickly and discreetly.
              </p>
              <a
                href="tel:651-262-8312"
                className="mt-4 inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold hover:bg-white/5"
              >
                651-262-8312
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">Important setup</h3>
              <p className="mt-2 text-sm text-white/80">
                This form needs a lead endpoint. In Vercel, set:
              </p>
              <div className="mt-3 rounded-lg bg-black/40 border border-white/10 p-3 text-xs text-white/80">
                NEXT_PUBLIC_LEAD_ENDPOINT = https://YOUR-WORKER.workers.dev/lead
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/90">
        {label} {required ? <span className="text-[#c9a34a]">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

One critical thing

If you haven’t set it yet, do this in Vercel → Project → Settings → Environment Variables:

NEXT_PUBLIC_LEAD_ENDPOINT = https://ai4u-concierge-mail.leehanna8.workers.dev/lead (or whatever your current /lead endpoint is)

Deploy again after setting it.

Why this fixes the “doesn’t match the site” problem

Your site’s layout is already establishing the brand: black base + white text + gold CTA + soft borders.
This replacement page uses the same visual system, and avoids the common mismatch causes:

white backgrounds

default form styles

missing max-width gutters

inconsistent button styling
