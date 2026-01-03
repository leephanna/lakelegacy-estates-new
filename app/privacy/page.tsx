import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <section className="section section-light">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>
          Last updated: January 2026
        </p>

        <div style={{ lineHeight: '1.8' }}>
          <h2>Introduction</h2>
          <p>
            Lake & Legacy Estates ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 style={{ marginTop: '32px' }}>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Property preferences and search criteria</li>
            <li>Communication preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you property listings and market updates</li>
            <li>Respond to your inquiries and requests</li>
            <li>Communicate with you about our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Other parties with your explicit consent</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 style={{ marginTop: '32px' }}>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 style={{ marginTop: '32px' }}>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 style={{ marginTop: '32px' }}>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:jamiemcneely@leonhardtteam.com" style={{ color: 'var(--gold)' }}>jamiemcneely@leonhardtteam.com</a></li>
            <li>Phone: <a href="tel:651-262-8312" style={{ color: 'var(--gold)' }}>651-262-8312</a></li>
          </ul>
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link href="/">
            <button className="btn-ghost">Return to Home</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
