'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SellersPage() {
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
        form_kind: 'seller',
        kind: 'seller',
        leadType: 'seller',
        source: 'sellers-page',
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)',
          minHeight: '500px'
        }}
      >
        <div className="hero-content">
          <div className="badge mb-3">FOR SELLERS</div>
          <h1>Sell Your Lake Home with Confidence</h1>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 32px' }}>
            Discreet, confidential marketing for Minnesota and Wisconsin lakefront properties. Reach qualified buyers without public listing exposure.
          </p>
          <a href="#seller-form">
            <button className="btn-primary" style={{ padding: '14px 32px' }}>
              Request Consultation
            </button>
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Sell with Lake & Legacy?</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Protect your privacy while maximizing value through strategic, confidential marketing
            </p>
          </div>
          <div className="grid three">
            <div className="card">
              <h3>Confidential Marketing</h3>
              <p className="text-muted">
                Whisper campaigns and private showings protect your privacy. Only pre-qualified buyers see your property.
              </p>
            </div>
            <div className="card">
              <h3>Off-Market Network</h3>
              <p className="text-muted">
                Access our exclusive buyer network actively seeking lakefront properties. Many sales happen before public listing.
              </p>
            </div>
            <div className="card">
              <h3>Premium Positioning</h3>
              <p className="text-muted">
                Strategic pricing and presentation that attracts serious buyers and commands top-tier offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>Our Selling Process</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              A proven approach to selling luxury lakefront properties with discretion and results
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
                <h3>Confidential Consultation</h3>
                <p className="text-muted">
                  We meet privately to understand your goals, timeline, and concerns. We assess your property and discuss pricing strategy.
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
                <h3>Strategic Preparation</h3>
                <p className="text-muted">
                  Professional photography, staging recommendations, and property presentation that highlights your home's best features.
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
                <h3>Discreet Marketing</h3>
                <p className="text-muted">
                  Whisper campaigns to our buyer network, private showings by appointment only, and strategic outreach to qualified prospects.
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
                  We handle all negotiations, coordinate inspections, and guide you through closing with minimal disruption to your life.
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
            <h2>Proven Results</h2>
          </div>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">60%</div>
              <div className="stat-label">Faster Closing Times</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">90%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Confidentiality Guaranteed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24hr</div>
              <div className="stat-label">Initial Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="seller-form" className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>Request a Confidential Consultation</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Tell us about your property and we'll schedule a private consultation
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
                <label htmlFor="message">Tell us about your property</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Example: 4BR lakefront on Minnetonka, west-facing, private dock, considering sale in spring..."
                  required
                  style={{ minHeight: '120px' }}
                />
              </div>

              <div className="actions">
                <button className="btn-primary" type="submit" disabled={status === 'loading'} style={{ flex: 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Request Consultation'}
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
              • We review your property details within 24 hours • We schedule a private consultation • We provide a confidential market analysis • We discuss your selling strategy
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 style={{ color: '#ffffff' }}>Ready to Discuss Your Property?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px' }}>
            Call or text Jamie directly at 651-262-8312 for a confidential conversation
          </p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <a href="tel:651-262-8312">
              <button className="btn-primary">Call Now</button>
            </a>
            <a href="mailto:jamiemcneely@leonhardtteam.com">
              <button className="btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>
                Email Jamie
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
