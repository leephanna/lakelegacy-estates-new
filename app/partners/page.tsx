'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function PartnersPage() {
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
        form_kind: 'partner',
        kind: 'partner',
        leadType: 'partner',
        source: 'partners-page',
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80)',
          minHeight: '500px'
        }}
      >
        <div className="hero-content">
          <div className="badge mb-3">PARTNERSHIP OPPORTUNITIES</div>
          <h1>Partner with Lake & Legacy Estates</h1>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 32px' }}>
            Join our network of real estate professionals, lenders, and service providers serving Minnesota and Wisconsin luxury homebuyers.
          </p>
          <a href="#partner-form">
            <button className="btn-primary" style={{ padding: '14px 32px' }}>
              Explore Partnership
            </button>
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Partner with Us?</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Collaborate to deliver exceptional service and grow your business
            </p>
          </div>
          <div className="grid three">
            <div className="card">
              <h3>Quality Referrals</h3>
              <p className="text-muted">
                Access to pre-qualified luxury homebuyers and sellers actively seeking Minnesota and Wisconsin lakefront properties.
              </p>
            </div>
            <div className="card">
              <h3>Collaborative Network</h3>
              <p className="text-muted">
                Join a trusted ecosystem of professionals committed to excellence and client satisfaction.
              </p>
            </div>
            <div className="card">
              <h3>Mutual Growth</h3>
              <p className="text-muted">
                Build long-term relationships that benefit your business and our shared clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>Partnership Opportunities</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              We collaborate with professionals across the real estate ecosystem
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
                <h3>Real Estate Agents</h3>
                <p className="text-muted">
                  Refer clients seeking lakefront properties or collaborate on co-listings. We handle off-market opportunities and luxury positioning.
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
                <h3>Mortgage Lenders</h3>
                <p className="text-muted">
                  Connect with qualified buyers pre-approved for luxury lake properties. We ensure smooth transactions and timely closings.
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
                <h3>Service Providers</h3>
                <p className="text-muted">
                  Home inspectors, attorneys, contractors, and other professionals serving luxury homebuyers and sellers.
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
                <h3>Technology Partners</h3>
                <p className="text-muted">
                  PropTech, CRM, marketing automation, and other technology solutions that enhance the homebuying experience.
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
            <h2>Built on Trust & Results</h2>
          </div>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">90%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">60%</div>
              <div className="stat-label">Faster Closing Times</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Professional Integrity</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24hr</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2>Start a Conversation</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Tell us about your business and how we can collaborate
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
                <label htmlFor="message">Tell us about your partnership interest</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Example: I'm a mortgage lender specializing in luxury properties and would like to discuss referral opportunities..."
                  required
                  style={{ minHeight: '120px' }}
                />
              </div>

              <div className="actions">
                <button className="btn-primary" type="submit" disabled={status === 'loading'} style={{ flex: 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Submit Partnership Inquiry'}
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
              • We review your partnership inquiry within 24 hours • We schedule an introductory call • We discuss collaboration opportunities • We establish a partnership agreement
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 style={{ color: '#ffffff' }}>Ready to Collaborate?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px' }}>
            Call or text Jamie directly at 651-262-8312 to discuss partnership opportunities
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
