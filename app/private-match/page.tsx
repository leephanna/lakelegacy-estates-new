'use client'

import { useMemo, useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  situation: string
  timeline: string
  budget: string
  lakePriorities: string[]
  notes: string
  website: string // honeypot
}

const SITUATION_OPTIONS = [
  { value: 'actively_buying', label: 'Actively buying a lake property' },
  { value: 'researching', label: 'Researching / exploring options' },
  { value: 'upgrade', label: 'Upgrading / relocating' },
  { value: 'investor', label: 'Investor / second-home strategy' },
]

const TIMELINE_OPTIONS = [
  { value: '0_3', label: '0–3 months' },
  { value: '3_6', label: '3–6 months' },
  { value: '6_12', label: '6–12 months' },
  { value: '12_plus', label: '12+ months' },
]

const BUDGET_OPTIONS = [
  { value: 'under_750', label: 'Under $750k' },
  { value: '750_1m', label: '$750k – $1M' },
  { value: '1m_1_5m', label: '$1M – $1.5M' },
  { value: '1_5m_2_5m', label: '$1.5M – $2.5M' },
  { value: '2_5m_plus', label: '$2.5M+' },
]

const LAKE_PRIORITY_OPTIONS = [
  { value: 'large_recreational', label: 'Large, recreational lake' },
  { value: 'quiet_private', label: 'Quiet / private water' },
  { value: 'privacy_acreage', label: 'Privacy / acreage' },
  { value: 'sunset_west', label: 'West-facing / sunset views' },
  { value: 'dock_boat', label: 'Dock / boating requirements' },
  { value: 'newer_modern', label: 'Newer / modern build' },
  { value: 'legacy_cabin', label: 'Legacy cabin / classic charm' },
  { value: 'proximity_city', label: 'Proximity to city / airport' },
]

function labelFor(list: { value: string; label: string }[], value: string) {
  return list.find((x) => x.value === value)?.label ?? value
}

export default function PrivateMatchPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    situation: '',
    timeline: '',
    budget: '',
    lakePriorities: [],
    notes: '',
    website: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = useMemo(() => {
    // Optional override; otherwise fall back to your existing worker URL (or a relative /api route if you add one later)
    return (
      process.env.NEXT_PUBLIC_LEAD_ENDPOINT ||
      'https://ai4u-concierge-mail.leehanna8.workers.dev/lead'
    )
  }, [])

  const structuredMessage = useMemo(() => {
    const situationLabel = form.situation
      ? labelFor(SITUATION_OPTIONS, form.situation)
      : ''
    const timelineLabel = form.timeline ? labelFor(TIMELINE_OPTIONS, form.timeline) : ''
    const budgetLabel = form.budget ? labelFor(BUDGET_OPTIONS, form.budget) : ''
    const prioritiesLabel =
      form.lakePriorities.length > 0
        ? form.lakePriorities.map((v) => labelFor(LAKE_PRIORITY_OPTIONS, v)).join(', ')
        : ''

    return [
      'PRIVATE MATCH REQUEST',
      '',
      situationLabel ? `Situation: ${situationLabel}` : null,
      timelineLabel ? `Timeline: ${timelineLabel}` : null,
      budgetLabel ? `Budget: ${budgetLabel}` : null,
      prioritiesLabel ? `Lake Priorities: ${prioritiesLabel}` : null,
      '',
      form.notes?.trim() ? 'Additional Notes:' : null,
      form.notes?.trim() ? form.notes.trim() : null,
      '',
      '---',
      'Source: Private Lake Property Match (/private-match)',
    ]
      .filter(Boolean)
      .join('\n')
  }, [form])

  function togglePriority(value: string) {
    setForm((prev) => {
      const exists = prev.lakePriorities.includes(value)
      return {
        ...prev,
        lakePriorities: exists
          ? prev.lakePriorities.filter((v) => v !== value)
          : [...prev.lakePriorities, value],
      }
    })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Honeypot: if filled, silently succeed
    if (form.website) {
      setSuccess(true)
      return
    }

    // Basic required fields
    if (!form.name || !form.email || !form.phone) {
      setError('Please complete name, email, and phone.')
      return
    }
    if (!form.situation || !form.timeline || !form.budget) {
      setError('Please answer situation, timeline, and budget.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: structuredMessage,
        form_kind: 'private_match',
        source:
          typeof window !== 'undefined'
            ? `${window.location.origin}/private-match`
            : '/private-match',
        website: '',
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Lead submit failed (${res.status}). ${text}`.trim())
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg-cream)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="grid two" style={{ alignItems: 'start', gap: 28 }}>
            <div>
              <div className="badge mb-3">Confidential</div>
              <h1 style={{ marginBottom: 10 }}>Private Lake Property Match</h1>
              <p className="muted" style={{ maxWidth: 520 }}>
                Tell us what you’re looking for — Jamie will follow up with private matches, including
                select off-market opportunities.
              </p>
              <div style={{ marginTop: 18 }} className="card">
                <div className="card-title">What happens next</div>
                <ul className="card-list">
                  <li>• We review your request within 1 business day</li>
                  <li>• Jamie confirms your criteria + next steps</li>
                  <li>• You receive private matches when they fit</li>
                </ul>
              </div>
            </div>

            <div className="card">
              {success ? (
                <div>
                  <div className="card-title">Thanks — we'll reach out shortly</div>
                  <p className="muted" style={{ marginTop: 8 }}>
                    If you'd like to speak sooner, call{' '}
                    <a href="tel:6512628312" style={{ textDecoration: 'underline' }}>
                      651-262-8312
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="card-title">Request Private Matches</div>

                  <div className="field">
                    <label>Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Phone *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(###) ###-####"
                      required
                    />
                  </div>

                  {/* Honeypot */}
                  <div style={{ display: 'none' }}>
                    <label>Website</label>
                    <input
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="Leave blank"
                    />
                  </div>

                  <div className="field">
                    <label>Where are you in the process? *</label>
                    <select
                      value={form.situation}
                      onChange={(e) => setForm({ ...form, situation: e.target.value })}
                      required
                    >
                      <option value="">Select…</option>
                      {SITUATION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Timeline *</label>
                    <select
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      required
                    >
                      <option value="">Select…</option>
                      {TIMELINE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Budget *</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      required
                    >
                      <option value="">Select…</option>
                      {BUDGET_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Lake Priorities (choose any)</label>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {LAKE_PRIORITY_OPTIONS.map((o) => {
                        const checked = form.lakePriorities.includes(o.value)
                        return (
                          <label
                            key={o.value}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => togglePriority(o.value)}
                            />
                            <span className="muted">{o.label}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="field">
                    <label>Anything else we should know?</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Ex: West-facing on Minnetonka, must have private dock…"
                      rows={4}
                    />
                  </div>

                  {error ? (
                    <div style={{ marginTop: 10, color: '#b42318' }}>{error}</div>
                  ) : null}

                  <button
                    className="btn btn-gold"
                    type="submit"
                    disabled={submitting}
                    style={{ width: '100%', marginTop: 14 }}
                  >
                    {submitting ? 'Submitting…' : 'Get My Private Matches'}
                  </button>

                  <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
                    We respect your privacy. No spam. Unsubscribe anytime.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

After applying the patch, do this checklist (this is what fixes the 404)

Confirm the route exists locally:

app/private-match/page.tsx exists exactly (spelling + hyphen + lowercase)

Commit + push:

git status
