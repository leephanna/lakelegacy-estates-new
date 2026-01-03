import Link from 'next/link'

export default function TermsPage() {
  return (
    <section className="section section-light">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>Terms of Service</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>
          Last updated: January 2026
        </p>

        <div style={{ lineHeight: '1.8' }}>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Lake & Legacy Estates website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 style={{ marginTop: '32px' }}>Use of Services</h2>
          <p>
            Our services are provided for the purpose of connecting buyers, sellers, and partners in the luxury lakefront real estate market. You agree to use our services only for lawful purposes and in accordance with these Terms.
          </p>

          <h2 style={{ marginTop: '32px' }}>Real Estate Representation</h2>
          <p>
            Lake & Legacy Estates operates under Coldwell Banker - Leonhardt Team. All real estate transactions are subject to applicable state and federal laws, regulations, and licensing requirements.
          </p>

          <h2 style={{ marginTop: '32px' }}>Information Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any property listings, market data, or other information provided through our services.
          </p>

          <h2 style={{ marginTop: '32px' }}>Confidentiality</h2>
          <p>
            We maintain strict confidentiality regarding all client information and property details. However, you acknowledge that certain information may need to be shared with relevant parties (such as other real estate professionals, lenders, or inspectors) to facilitate transactions.
          </p>

          <h2 style={{ marginTop: '32px' }}>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of Lake & Legacy Estates or its content suppliers and is protected by copyright and other intellectual property laws.
          </p>

          <h2 style={{ marginTop: '32px' }}>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Lake & Legacy Estates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
          </p>

          <h2 style={{ marginTop: '32px' }}>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Lake & Legacy Estates, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these Terms.
          </p>

          <h2 style={{ marginTop: '32px' }}>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Minnesota, without regard to its conflict of law provisions.
          </p>

          <h2 style={{ marginTop: '32px' }}>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>

          <h2 style={{ marginTop: '32px' }}>Contact Information</h2>
          <p>
            If you have questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:jamiemcneely@leonhardtteam.com" style={{ color: 'var(--gold)' }}>jamiemcneely@leonhardtteam.com</a></li>
            <li>Phone: <a href="tel:651-262-8312" style={{ color: 'var(--gold)' }}>651-262-8312</a></li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
          </p>
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
