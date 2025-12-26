'use client'

import { useMemo, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function BuyersPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // honeypot
  })

  const workerBase = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_WORKER_URL ||
      'https://ai4u-concierge-mail.leehanna8.workers.dev'
    )
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    try {
      const payload = {
        form_kind: 'buyer',
        kind: 'buyer',
        leadType: 'buyer',
        source: 'buyers-page',
        origin: typeof window !== 'undefined' ? window.location.origin : '',
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        website: form.website, // honeypot
      }

      const res = await fetch(`${workerBase}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Lead submit failed: ${res.status}`)
      }

      setStatus('success')
      setStatusMessage(
        'Request received — check your email for confirmation. Jamie will reach out within 24 hours.'
      )
      setForm({ name: '', email: '', phone: '', message: '', website: '' })
    } catch (err) {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again — or call/text us directly.')
    }
  }

  return (
    <div>
      <h1>Buyer Discovery</h1>
      <p className="lead">
        Tell us what you're looking for. We'll match you with lakefront options (including private/off-market
        opportunities when available).
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
              <input id="name" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
          </div>

          <div className="grid two">
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} required />
            </div>
            <div>
              <label htmlFor="message">What are you looking for?</label>
              <input
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Example: 4BR, west-facing, quiet bay, under $1.2M…"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="details">Details</label>
            <textarea
              id="details"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Share must-haves, timeline, lake preferences, and anything that matters."
            />
          </div>

          <div className="actions">
            <button className="btn-primary" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send Request'}
            </button>
            <a className="btn-ghost" href="/" style={{ display: 'inline-block', padding: '12px 14px' }}>
              Back to Home
            </a>
          </div>

          {status !== 'idle' && (
            <div className={`notice ${status === 'success' ? 'ok' : status === 'error' ? 'bad' : ''}`}>
              {statusMessage || (status === 'loading' ? 'Submitting…' : '')}
            </div>
          )}
        </form>
      </div>

      <div className="notice" style={{ marginTop: 16 }}>
        <strong style={{ color: 'rgba(255,255,255,0.92)' }}>What happens next:</strong>
        <div style={{ marginTop: 8 }}>
          • We review your request • We confirm your priorities • We send curated matches • We schedule private showings
        </div>
      </div>
    </div>
  )
}
