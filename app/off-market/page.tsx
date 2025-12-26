'use client'

import { useMemo, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function OffMarketPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    lakes: '',
    budget: '',
    timeline: '',
    message: '',
    website: '', // honeypot
  })

  const workerBase = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_WORKER_URL ||
      'https://ai4u-concierge-mail.leehanna8.workers.dev'
    )
  }, [])

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    try {
      const payload = {
        form_kind: 'off_market',
        kind: 'off_market',
        leadType: 'off_market',
        source: 'off-market-page',
        origin: typeof window !== 'undefined' ? window.location.origin : '',
        name: form.name,
        email: form.email,
        phone: form.phone,
        lakes: form.lakes,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
        website: form.website, // honeypot
      }

      const res = await fetch(`${workerBase}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`Submit failed: ${res.status}`)

      setStatus('success')
      setStatusMessage(
        "You're on the Off-Market Alerts list. Watch your email — we'll send private opportunities when they appear."
      )
      setForm({
        name: '',
        email: '',
        phone: '',
        lakes: '',
        budget: '',
        timeline: '',
        message: '',
        website: '',
      })
    } catch {
      setStatus('error')
      setStatusMessage(
        'Something went wrong. Please try again — or contact us directly.'
      )
    }
  }

  return (
    <div>
      <h1>Off-Market Alerts</h1>
      <p className="lead">
        Some of the best lakefront opportunities never hit the public market.
        Join our quiet list and we'll notify you when private/off-market homes
        match your criteria.
      </p>

      <div className="card">
        <form onSubmit={onSubmit} className="grid" style={{ gap: 14 }}>
          {/* honeypot */}
          <input
            name="website"
            value={form.website}
            onChange={onChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid two">
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="grid two">
            <div>
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="Text-friendly helps for fast private showings"
              />
            </div>
            <div>
              <label htmlFor="timeline">Timeline</label>
              <input
                id="timeline"
                name="timeline"
                value={form.timeline}
                onChange={onChange}
                placeholder="Example: 0–60 days, Spring, flexible…"
                required
              />
            </div>
          </div>

          <div className="grid two">
            <div>
              <label htmlFor="lakes">Preferred lakes / areas</label>
              <input
                id="lakes"
                name="lakes"
                value={form.lakes}
                onChange={onChange}
                placeholder="Example: Minnetonka, White Bear, Prior Lake…"
                required
              />
            </div>
            <div>
              <label htmlFor="budget">Budget range</label>
              <input
                id="budget"
                name="budget"
                value={form.budget}
                onChange={onChange}
                placeholder="Example: $900k–$1.6M"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message">Must-haves & dealbreakers</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Example: west-facing, quiet bay, 4BR+, dock, low boat traffic…"
              required
            />
          </div>

          <div className="actions">
            <button
              className="btn-primary"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding you…' : 'Get Off-Market Alerts'}
            </button>
            <a
              className="btn-ghost"
              href="/"
              style={{ display: 'inline-block', padding: '12px 14px' }}
            >
              Back to Home
            </a>
          </div>

          {status !== 'idle' && (
            <div
              className={`notice ${
                status === 'success' ? 'ok' : status === 'error' ? 'bad' : ''
              }`}
            >
              {statusMessage ||
                (status === 'loading' ? 'Submitting…' : '')}
            </div>
          )}
        </form>
      </div>

      <div className="notice" style={{ marginTop: 16 }}>
        <strong style={{ color: 'rgba(255,255,255,0.92)' }}>
          How this works:
        </strong>
        <div style={{ marginTop: 8 }}>
          • Private opportunities are rare • When they appear, speed matters •
          We only send matches aligned to your criteria
        </div>
      </div>
    </div>
  )
}
