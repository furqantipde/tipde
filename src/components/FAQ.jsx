export default function FAQ({ items = [], title = 'Frequently asked questions' }) {
  if (!items.length) return null
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-5 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {items.map((item, index) => (
          <details key={item.q} className="group px-5 py-4" open={index === 0}>
            <summary className="cursor-pointer list-none font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-brand-500 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
