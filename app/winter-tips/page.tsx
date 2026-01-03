import Link from 'next/link'

export default function WinterTipsPage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1920&q=80)',
          minHeight: '400px'
        }}
      >
        <div className="hero-content">
          <h1>Winter Homebuying Tips</h1>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Expert strategies for buying Minnesota and Wisconsin lakefront properties in winter
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>Why Winter is the Best Time to Buy</h2>
          <p className="lead">
            While most buyers wait for spring, savvy homebuyers know that winter offers unique advantages in the Minnesota and Wisconsin luxury lake market.
          </p>

          <div className="card" style={{ marginTop: '32px' }}>
            <h3>Key Advantages</h3>
            <ul style={{ marginTop: '16px', lineHeight: '1.8' }}>
              <li><strong>35% Less Competition:</strong> Fewer buyers means more negotiating power and better selection</li>
              <li><strong>3-5% Price Savings:</strong> Motivated sellers often accept lower offers during winter months</li>
              <li><strong>60% Faster Closings:</strong> Less competition means faster processing and fewer delays</li>
              <li><strong>True Property Assessment:</strong> See how the home performs in harsh winter conditions</li>
              <li><strong>Off-Market Opportunities:</strong> Access to exclusive listings not available in peak season</li>
            </ul>
          </div>

          <div className="card" style={{ marginTop: '32px' }}>
            <h3>Winter Property Inspection Checklist</h3>
            <ul style={{ marginTop: '16px', lineHeight: '1.8' }}>
              <li>Heating system performance and efficiency</li>
              <li>Insulation quality and heat retention</li>
              <li>Ice dam prevention and roof condition</li>
              <li>Driveway and walkway snow management</li>
              <li>Lake access and winter recreation options</li>
              <li>Moisture control and ventilation</li>
            </ul>
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <h3>Ready to Start Your Winter Home Search?</h3>
            <p className="text-muted" style={{ marginBottom: '24px' }}>
              Let Jamie guide you through the process with expert local knowledge
            </p>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <Link href="/buyers">
                <button className="btn-primary">Start Your Search</button>
              </Link>
              <Link href="/guides">
                <button className="btn-ghost">Download Free Guide</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
