import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Lake & Legacy Estates",
  description: "Digital concierge for premium lakeshore properties"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <header className="w-full border-b border-slate-800 bg-slate-950/40 backdrop-blur">
          <nav className="max-w-5xl mx-auto flex gap-4 py-4 text-sm">
            <a href="/" className="font-semibold">Home</a>
            <a href="/buyers">Buyers</a>
            <a href="/sellers">Sellers</a>
            <a href="/partners">Partners</a>
            <a href="/referral">Referral</a>
            <a href="/ping">Ping</a>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}
