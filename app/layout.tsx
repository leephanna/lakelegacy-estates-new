import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Lake & Legacy Estates — Luxury Lakefront Concierge',
  description:
    "Discreet off-market access for discerning buyers and confidential, white-glove selling for Minnesota & Wisconsin's luxury lake market.",
}

const navLink =
  'text-sm md:text-[15px] text-neutral-700 hover:text-neutral-950 transition-colors'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f6f1e8] text-neutral-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f1e8]/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-serif text-lg tracking-wide">
              Lake &amp; Legacy Estates
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link className={navLink} href="/">
                Home
              </Link>
              <Link className={navLink} href="/winter-tips">
                Winter Tips
              </Link>

              {/* Buyer funnel */}
              <Link className={navLink} href="/private-match">
                Private Match
              </Link>

              {/* Seller mirror funnel (THIS is the link you asked for) */}
              <Link className={navLink} href="/private-sell">
                Private Sell
              </Link>

              <Link className={navLink} href="/buyers">
                For Buyers
              </Link>
              <Link className={navLink} href="/sellers">
                For Sellers
              </Link>
              <Link className={navLink} href="/guides">
                Guides
              </Link>
              <Link className={navLink} href="/partner">
                Partner
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              {/* Mobile: show a simple link to Private Sell */}
              <Link
                href="/private-sell"
                className="md:hidden rounded-xl border border-black/15 bg-white/40 px-3 py-2 text-sm font-medium hover:bg-white/60"
              >
                Private Sell
              </Link>

              {/* Primary CTA */}
              <Link
                href="/private-match"
                className="rounded-xl bg-[#b79a4a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95"
              >
                Private Matches
              </Link>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-black/10 bg-[#2b2b2b] text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-3">
            <div>
              <div className="mb-3 font-semibold">Quick Links</div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link className="hover:text-white" href="/winter-tips">
                    Winter Buying Tips
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/buyers">
                    For Buyers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/sellers">
                    For Sellers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/private-match">
                    Private Lake Property Match
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/private-sell">
                    Private Sell — Confidential
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 font-semibold">Contact</div>
              <div className="space-y-2 text-sm text-white/80">
                <div>651-262-8312</div>
                <div>jamiemcneely@leonhardtteam.com</div>
              </div>
            </div>

            <div>
              <div className="mb-3 font-semibold">Legal</div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link className="hover:text-white" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 text-sm text-white/70 md:flex-row md:items-center">
              <div>© {new Date().getFullYear()} Lake &amp; Legacy Estates</div>
              <a
                href="https://ai4utech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                AI4Utech.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
