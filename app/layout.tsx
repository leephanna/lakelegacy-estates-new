import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lake & Legacy Estates',
  description: 'Luxury lakefront real estate concierge for buyers, sellers, partners, and referrals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="nav-inner">
            <Link className="brand" href="/">
              Lake &amp; Legacy
            </Link>

            <nav className="nav-links" aria-label="Primary">
              <Link href="/buyers">Buyers</Link>
              <Link href="/sellers">Sellers</Link>
              <Link href="/partners">Partners</Link>
              <Link href="/referral">Referral</Link>
            </nav>

            <Link className="nav-cta" href="/buyers">
              Get Matched
            </Link>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div>© {new Date().getFullYear()} Lake &amp; Legacy Estates</div>
            <div className="footer-sub">Luxury lakefront concierge • Minnesota</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
