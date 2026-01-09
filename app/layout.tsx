import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lake & Legacy Estates",
  description: "Private Client Concierge — Jamie McNeely",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Left: Private Sell CTA + Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link
                href="/private-sell"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 18px",
                  backgroundColor: "#f59e0b",
                  color: "#0a0a0a",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Private Sell
              </Link>

              <Link
                href="/"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "0.025em",
                  color: "#ffffff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Lake &amp; Legacy Estates
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" style={navLinkStyle}>Home</Link>
              <Link href="/winter-tips" style={navLinkStyle}>Winter Tips</Link>
              <Link href="/private-match" style={navLinkStyle}>Private Match</Link>
              <Link href="/buyers" style={navLinkStyle}>For Buyers</Link>
              <Link href="/sellers" style={navLinkStyle}>For Sellers</Link>
              <Link href="/guides" style={navLinkStyle}>Guides</Link>
              <Link href="/partner" style={navLinkStyle}>Partner</Link>
            </nav>

            {/* Right: Private Matches CTA */}
            <Link
              href="/private-match"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 18px",
                backgroundColor: "#f59e0b",
                color: "#0a0a0a",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Private Matches
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            marginTop: "64px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "#0a0a0a",
          }}
        >
          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "48px 24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Quick Links */}
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>
                Quick Links
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/winter-tips" style={footerLinkStyle}>Winter Buying Tips</Link>
                <Link href="/private-match" style={footerLinkStyle}>Private Lake Property Match</Link>
                <Link href="/private-sell" style={footerLinkStyle}>Private Seller Intake</Link>
                <Link href="/buyers" style={footerLinkStyle}>For Buyers</Link>
                <Link href="/sellers" style={footerLinkStyle}>For Sellers</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>
                Contact
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                <div style={{ marginBottom: "8px" }}>651-262-8312</div>
                <div>jamiemcneely@leonhardtteam.com</div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>
                Legal
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/privacy" style={footerLinkStyle}>Privacy 
