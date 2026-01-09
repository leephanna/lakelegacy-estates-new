import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lake & Legacy Estates",
  description: "Private Client Concierge — Jamie McNeely",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/winter-tips", label: "Winter Tips" },
  { href: "/private-match", label: "Private Match" },
  { href: "/private-sell", label: "Private Sell" },
  { href: "/buyers", label: "For Buyers" },
  { href: "/sellers", label: "For Sellers" },
  { href: "/guides", label: "Guides" },
  { href: "/partner", label: "Partner" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        {/* Top bar */}
        <div className="border-b border-white/10 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            
            {/* Left: Private Sell CTA + Logo */}
            <div className="flex items-center gap-4">
              <Link
                href="/private-sell"
                className="inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition"
              >
                Private Sell
              </Link>
              
              <Link href="/" className="flex items-baseline gap-3">
                <span className="text-lg font-semibold tracking-wide">
                  Lake &amp; Legacy Estates
                </span>
                <span className="hidden text-xs text-white/60 lg:inline">
                  Private Client Concierge — Jamie McNeely
                </span>
              </Link>
            </div>

            {/* Desktop nav + Right CTA */}
            <div className="hidden items-center gap-5 md:flex">
              <nav className="flex items-center gap-5">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/75 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/private-match"
                className="ml-2 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition"
              >
                Private Matches
              </Link>
            </div>
          </div>

          {/* Mobile nav (simple, always visible) */}
          <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-3">
              <Link
                href="/private-sell"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                Private Sell
              </Link>
              <Link
                href="/private-match"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                Private Matches
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 bg-neutral-950">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-white">Quick Links</div>
              <div className="mt-3 space-y-2 text-sm">
                <Link className="block text-white/70 hover:text-white" href="/winter-tips">
                  Winter Buying Tips
                </Link>
                <Link className="block text-white/70 hover:text-white" href="/private-match">
                  Private Lake Property Match
                </Link>
                <Link className="block text-white/70 hover:text-white" href="/private-sell">
                  Private Seller Intake
                </Link>
                <Link className="block text-white/70 hover:text-white" href="/buyers">
                  For Buyers
                </Link>
                <Link className="block text-white/70 hover:text-white" href="/sellers">
                  For Sellers
                </Link>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Contact</div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <div>651-262-8312</div>
                <div>jamiemcneely@leonhardtteam.com</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Legal</div>
              <div className="mt-3 space-y-2 text-sm">
                <Link className="block text-white/70 hover:text-white" href="/privacy">
                  Privacy Policy
                </Link>
                <Link className="block text-white/70 hover:text-white" href="/terms">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-white/50">
              <div>© {new Date().getFullYear()} Lake &amp; Legacy Estates</div>
              <div>AI4Utech.com</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
