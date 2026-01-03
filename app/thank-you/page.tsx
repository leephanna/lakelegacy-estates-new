import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <section className="section section-light">
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '120px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✓</div>
        <h1>Thank You!</h1>
        <p className="lead" style={{ margin: '24px auto 32px' }}>
          Your request has been received. Jamie will review your information and reach out within 24 hours.
        </p>
        <p className="text-muted" style={{ marginBottom: '48px' }}>
          Check your email for a confirmation message. If you don't see it, please check your spam folder.
        </p>
        
        <div className="card" style={{ textAlign: 'left', marginBottom: '48px' }}>
          <h3>What Happens Next?</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '20px' }}>1</span>
              <span>We review your request and confirm your priorities</span>
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '20px' }}>2</span>
              <span>Jamie reaches out within 24 hours to schedule a call</span>
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '20px' }}>3</span>
              <span>We discuss your goals and create a personalized plan</span>
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '20px' }}>4</span>
              <span>We get to work finding or selling your perfect property</span>
            </li>
          </ul>
        </div>

        <div className="actions" style={{ justifyContent: 'center', marginBottom: '32px' }}>
          <Link href="/">
            <button className="btn-primary">Return to Home</button>
          </Link>
          <Link href="/guides">
            <button className="btn-ghost">Browse Free Guides</button>
          </Link>
        </div>

        <div style={{ marginTop: '48px', padding: '24px', background: 'var(--bg-cream)', borderRadius: '8px' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600' }}>Need to reach us immediately?</p>
          <p className="text-muted">
            Call or text Jamie at <a href="tel:651-262-8312" style={{ color: 'var(--gold)', fontWeight: '600' }}>651-262-8312</a>
          </p>
        </div>
      </div>
    </section>
  )
}
