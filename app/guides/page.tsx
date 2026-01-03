import Link from 'next/link'

export default function GuidesPage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80)',
          minHeight: '400px'
        }}
      >
        <div className="hero-content">
          <h1>Free Exclusive Guides</h1>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Expert resources for luxury lakefront homebuyers and sellers
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="section section-light">
        <div className="container">
          <div className="grid two">
            <div className="card">
              <div className="badge mb-3">FOR BUYERS</div>
              <h3>Winter Homebuying Guide</h3>
              <p className="text-muted">
                Discover the insider strategies that Minnesota's most successful winter buyers use to secure exceptional properties at optimal prices.
              </p>
              <ul style={{ marginTop: '16px', marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✓ Leverage 35% less competition</li>
                <li style={{ marginBottom: '8px' }}>✓ Negotiation tactics for 3-5% savings</li>
                <li style={{ marginBottom: '8px' }}>✓ Testing winter property performance</li>
                <li style={{ marginBottom: '8px' }}>✓ Close 60% faster with motivated sellers</li>
              </ul>
              <Link href="/buyers">
                <button className="btn-primary">Request Guide</button>
              </Link>
            </div>

            <div className="card">
              <div className="badge mb-3">FOR SELLERS</div>
              <h3>Confidential Sale Guide</h3>
              <p className="text-muted">
                How to sell your luxury lake home without public listing exposure. Protect your privacy while maximizing value.
              </p>
              <ul style={{ marginTop: '16px', marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✓ Whisper campaign strategies</li>
                <li style={{ marginBottom: '8px' }}>✓ Pre-qualified buyer networks</li>
                <li style={{ marginBottom: '8px' }}>✓ Privacy protection methods</li>
                <li style={{ marginBottom: '8px' }}>✓ Premium positioning tactics</li>
              </ul>
              <Link href="/sellers">
                <button className="btn-primary">Request Guide</button>
              </Link>
            </div>

            <div className="card">
              <div className="badge mb-3">FOR BUYERS</div>
              <h3>Off-Market Access Guide</h3>
              <p className="text-muted">
                Unlock exclusive access to Minnesota's hidden lake properties before they hit public markets.
              </p>
              <ul style={{ marginTop: '16px', marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✓ Off-market property sources</li>
                <li style={{ marginBottom: '8px' }}>✓ Pre-market opportunity alerts</li>
                <li style={{ marginBottom: '8px' }}>✓ Private showing protocols</li>
                <li style={{ marginBottom: '8px' }}>✓ Competitive advantage strategies</li>
              </ul>
              <Link href="/off-market">
                <button className="btn-primary">Join Alerts</button>
              </Link>
            </div>

            <div className="card">
              <div className="badge mb-3">FOR ALL</div>
              <h3>Lake Property Valuation Guide</h3>
              <p className="text-muted">
                Understand what drives lakefront property values in Minnesota and Wisconsin luxury markets.
              </p>
              <ul style={{ marginTop: '16px', marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✓ Waterfront footage impact</li>
                <li style={{ marginBottom: '8px' }}>✓ Lake quality factors</li>
                <li style={{ marginBottom: '8px' }}>✓ Seasonal market trends</li>
                <li style={{ marginBottom: '8px' }}>✓ Comparable sales analysis</li>
              </ul>
              <Link href="/buyers">
                <button className="btn-primary">Request Guide</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="container text-center">
          <h2>Need Personalized Guidance?</h2>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            Schedule a consultation with Jamie to discuss your specific situation
          </p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <Link href="/buyers">
              <button className="btn-primary">Schedule Consultation</button>
            </Link>
            <a href="tel:651-262-8312">
              <button className="btn-ghost">Call 651-262-8312</button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
