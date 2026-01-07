import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lake & Legacy Estates - Luxury Lakefront Concierge',
  description: 'Discreet off-market access for discerning buyers. Exclusive winter homebuying guidance for Minnesota & Wisconsin luxury market.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="nav-inner">
            <Link className="brand" href="/">
              Lake & Legacy Estates
            </Link>

            <nav className="nav-links" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/winter-tips">Winter Tips</Link>
              <Link href="/private-match">Private Match</Link>
              <Link href="/buyers">For Buyers</Link>
              <Link href="/sellers">For Sellers</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/partners">Partner</Link>
            </nav>

            <Link className="nav-cta" href="/private-match">
              Private Matches
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link href="/winter-tips">Winter Buying Tips</Link></li>
                  <li><Link href="/private-match">Private Lake Property Match</Link></li>
                  <li><Link href="/buyers">For Buyers</Link></li>
                  <li><Link href="/sellers">For Sellers</Link></li>
                  <li><Link href="/partners">Partner With Us</Link></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="tel:651-262-8312">651-262-8312</a></li>
                  <li><a href="mailto:jamiemcneely@leonhardtteam.com">jamiemcneely@leonhardtteam.com</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <div>© {new Date().getFullYear()} Lake & Legacy Estates</div>
              <div>
                <a href="https://ai4utech.com" target="_blank" rel="noopener noreferrer">
                  AI4Utech.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
