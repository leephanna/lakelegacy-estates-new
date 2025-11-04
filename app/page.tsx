export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Lake &amp; Legacy Estates
      </h1>
      <p className="text-slate-200/80">
        Digital concierge for high-end lake properties. Start with the path that
        matches you best.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/buyers" className="rounded-xl border border-slate-800 p-4">
          <h2 className="font-semibold mb-1">I&apos;m a Buyer</h2>
          <p className="text-sm text-slate-300/80">Tell us what you&apos;re looking for.</p>
        </a>
        <a href="/sellers" className="rounded-xl border border-slate-800 p-4">
          <h2 className="font-semibold mb-1">I&apos;m a Seller</h2>
          <p className="text-sm text-slate-300/80">Get concierge-level marketing.</p>
        </a>
        <a href="/partners" className="rounded-xl border border-slate-800 p-4">
          <h2 className="font-semibold mb-1">I&apos;m a Partner</h2>
          <p className="text-sm text-slate-300/80">Join the ecosystem.</p>
        </a>
      </div>
    </section>
  );
}
