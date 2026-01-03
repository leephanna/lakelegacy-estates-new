import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80)',
          minHeight: '600px'
        }}
      >
        <div className="hero-content">
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 56px)' }}>
            LAKE & LEGACY ESTATES
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '16px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
            Private Client Concierge — Jamie McNeely
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 'normal', marginBottom: '16px' }}>
            Discreet Off-Market Access<br />for Discerning Buyers
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', color: 'rgba(255,255,255,0.9)' }}>
            Exclusive winter homebuying guidance for Minnesota & Wisconsin's luxury market
          </p>
          <p style={{ fontSize: '16px', marginBottom: '32px', color: 'rgba(255,255,255,0.85)' }}>
            Coldwell Banker - Leonhardt Team
          </p>
          <div className="actions" style={{ justifyContent: 'center', marginBottom: '32px' }}>
            <Link href="/buyers">
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
                Private Client Intake
              </button>
            </Link>
            <Link href="/off-market">
              <button className="btn-secondary" style={{ padding: '12px 30px', fontSize: '16px', color: '#fff', borderColor: '#fff' }}>
                Confidential Preview Access
              </button>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            <span>✓ Verified Capacity Program</span>
            <span>✓ Off-Market Inventory</span>
            <span>✓ 651-262-8312</span>
          </div>
        </div>
      </section>

      {/* Winter Homebuying Guide Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
          <div className="grid two" style={{ alignItems: 'center' }}>
            <div>
              <div className="badge mb-3">Exclusive Resource</div>
              <h2>Winter Homebuying Guide</h2>
              <p className="lead">
                Discover the insider strategies that Minnesota's most successful winter buyers use to secure exceptional properties at optimal prices.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                  <span>How to leverage 35% less competition</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                  <span>Negotiation tactics for 3-5% price savings</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                  <span>Testing winter property performance</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                  <span>Closing 60% faster with motivated sellers</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                  <span>Off-market opportunity identification</span>
                </li>
              </ul>
              <Link href="/guides">
                <button className="btn-primary">Access the Guide</button>
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80" 
                alt="Family viewing winter home"
                style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'var(--bronze)',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: 1 }}>2025</div>
                <div style={{ fontSize: '14px' }}>Edition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How I Can Help You Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>How I Can Help You</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Expert real estate services tailored to Minnesota and Wisconsin homebuyers and sellers
            </p>
          </div>
          <div className="grid three">
            <div className="card">
              <h3>Off-Market Property Access</h3>
              <p className="text-muted">
                Exclusive access to private listings and off-market opportunities before they reach the public market.
              </p>
              <Link href="/buyers">
                <button className="btn-ghost mt-3">Learn More</button>
              </Link>
            </div>
            <div className="card">
              <h3>Private Client Service</h3>
              <p className="text-muted">
                Discreet, white-glove homebuying service for discerning clients seeking Minnesota or Wisconsin properties.
              </p>
              <Link href="/buyers">
                <button className="btn-ghost mt-3">Get Started</button>
              </Link>
            </div>
            <div className="card">
              <h3>Confidential Sale Services</h3>
              <p className="text-muted">
                Discreet marketing and whisper campaigns for sellers seeking privacy and qualified buyers only.
              </p>
              <Link href="/sellers">
                <button className="btn-ghost mt-3">List Your Home</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container">
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

      {/* Free Exclusive Guides Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Free Exclusive Guides</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Access our private client resources for luxury lake property buyers and sellers
            </p>
          </div>
          <div className="grid two">
            <div className="card">
              <h3>The Confidential Sale Guide</h3>
              <p className="text-muted">
                How to sell your luxury lake home without public listing exposure. Protect your privacy while maximizing value.
              </p>
              <Link href="/guides">
                <button className="btn-primary mt-3">Download Free Guide</button>
              </Link>
            </div>
            <div className="card">
              <h3>Off-Market Access Guide</h3>
              <p className="text-muted">
                Unlock exclusive access to Minnesota's hidden lake properties before they hit public markets.
              </p>
              <Link href="/guides">
                <button className="btn-primary mt-3">Download Free Guide</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container text-center">
          <h2>Partner With Jamie</h2>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            Are you a real estate professional, lender, or service provider? Let's collaborate to serve Minnesota and Wisconsin homebuyers better.
          </p>
          <Link href="/partners">
            <button className="btn-primary">Explore Partnership Opportunities</button>
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 style={{ color: '#ffffff' }}>Ready to Start Your Home Search?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Contact Jamie today to discover why winter is the perfect time to find your dream home in Minnesota or Wisconsin.
          </p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <Link href="/buyers">
              <button className="btn-primary">Schedule a Consultation</button>
            </Link>
            <a href="tel:651-262-8312">
              <button className="btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>
                Call 651-262-8312
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
