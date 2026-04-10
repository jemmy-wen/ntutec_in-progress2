export default function PartnersSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="micro-label mb-2">Trusted By</p>
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            合作夥伴
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-xl bg-stone"
            >
              <span className="text-sm text-slate-muted">Partner Logo</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-muted">
          與更多企業共創
        </p>
      </div>
    </section>
  );
}
