'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

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
    <>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80)',
          minHeight: '500px'
        }}
      >
        <div className="hero-content">
          <div className="badge mb-3">FOR BUYERS</div>
          <h1>Find Your Dream Lake Home</h1>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 32px' }}>
            Exclusive access to Minnesota and Wisconsin's finest lakefront properties, including off-market opportunities you won't find anywhere else.
          </p>
          <a href="#buyer-form">
            <button className="btn-primary" style={{ padding: '14px 32px' }}>
              Start Your Search
            </button>
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Work With Jamie?</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Get access to exclusive opportunities and expert guidance throughout your homebuying journey
            </p>
          </div>
          <div className="grid three">
            <div className="card">
              <h3>Off-Market Access</h3>
              <p className="text-muted">
                See properties before they hit the public market. Many of our best deals never appear on MLS.
              </p>
            </div>
            <div className="card">
              <h3>Local Expertise</h3>
              <p className="text-muted">
                Deep knowledge of Minnesota and Wisconsin lake communities, property values, and seasonal considerations.
              </p>
            </div>
            <div className="card">
              <h3>White-Glove Service</h3>
              <p className="text-muted">
                Personalized attention from initial search through closing. We handle the details so you can focus on your future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>How It Works</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              A simple, proven process to find and secure your perfect lake property
            </p>
          </div>
          <div className="grid two">
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--gold)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h3>Discovery Call</h3>
                <p className="text-muted">
                  We start with a conversation to understand your vision, must-haves, timeline, and budget. This helps us curate the right opportunities.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--gold)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h3>Curated Matches</h3>
                <p className="text-muted">
                  Receive hand-selected properties that match your criteria, including exclusive off-market listings and pre-market opportunities.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--gold)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h3>Private Showings</h3>
                <p className="text-muted">
                  Tour properties at your convenience. We coordinate access, provide market insights, and help you evaluate each opportunity.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--gold)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                4
              </div>
              <div>
                <h3>Negotiation & Closing</h3>
                <p className="text-muted">
                  We negotiate on your behalf to secure the best terms, then guide you through inspections, financing, and closing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Trusted by Discerning Buyers</h2>
          </div>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">35%</div>
              <div className="stat-label">Less Competition in Winter</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3-5%</div>
              <div className="stat-label">Average Price Savings</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">60%</div>
              <div className="stat-label">Faster Closing Times</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">90%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="buyer-form" className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>Start Your Search Today</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Tell us what you're looking for and we'll match you with the perfect lakefront properties
            </p>
          </div>

          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={onSubmit} className="grid" style={{ gap: 24 }}>
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

              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} required />
              </div>

              <div>
                <label htmlFor="message">What are you looking for?</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Example: 4BR lakefront home on quiet bay, west-facing, under $1.2M, flexible timeline..."
                  required
                  style={{ minHeight: '120px' }}
                />
              </div>

              <div className="actions">
                <button className="btn-primary" type="submit" disabled={status === 'loading'} style={{ flex: 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Send Request'}
                </button>
                <Link href="/">
                  <button type="button" className="btn-ghost">
                    Back to Home
                  </button>
                </Link>
              </div>

              {status !== 'idle' && (
                <div className={`notice ${status === 'success' ? 'ok' : status === 'error' ? 'bad' : ''}`}>
                  {statusMessage || (status === 'loading' ? 'Submitting…' : '')}
                </div>
              )}
            </form>
          </div>

          <div className="notice" style={{ marginTop: 24, maxWidth: '800px', margin: '24px auto 0' }}>
            <strong>What happens next:</strong>
            <div style={{ marginTop: 8 }}>
              • We review your request within 24 hours • We schedule a discovery call • We send curated property matches • We coordinate private showings
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 style={{ color: '#ffffff' }}>Prefer to Talk First?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px' }}>
            Call or text Jamie directly at 651-262-8312
          </p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <a href="tel:651-262-8312">
              <button className="btn-primary">Call Now</button>
            </a>
            <Link href="/off-market">
              <button className="btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>
                Join Off-Market Alerts
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
