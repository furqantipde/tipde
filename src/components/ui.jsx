export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Section({ children, className = '', id }) {
  return <section id={id} className={`py-14 sm:py-20 ${className}`}>{children}</section>
}

export function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-8`}>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-200">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>}
    </div>
  )
}

const buttonBase = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:opacity-50'

const variants = {
  primary: 'bg-brand-600 px-5 py-2.5 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border border-slate-200 bg-white px-5 py-2.5 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  subtle: 'px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
  accent: 'bg-accent-500 px-5 py-2.5 text-white shadow-sm hover:bg-accent-600',
}

export function Button({ variant = 'primary', className = '', as: Component = 'button', ...props }) {
  return <Component className={`${buttonBase} ${variants[variant]} ${className}`} {...props} />
}

export function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900 ${className}`}>{children}</div>
}

export function Badge({ children, className = '' }) {
  return <span className={`inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-600/15 dark:text-brand-200 ${className}`}>{children}</span>
}

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500 dark:text-slate-300">{hint}</span>}
    </label>
  )
}

export function Select({ className = '', ...props }) {
  return (
    <select
      className={`rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full resize-y rounded-xl border border-slate-300 bg-white p-4 font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 ${className}`}
      {...props}
    />
  )
}

export function Alert({ children, tone = 'error' }) {
  const tones = {
    error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300',
    info: 'border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-200',
  }
  return <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`} role="status">{children}</div>
}
