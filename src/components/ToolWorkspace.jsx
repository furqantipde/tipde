import { useCopy } from '../hooks/useCopy.js'
import { CheckIcon, CopyIcon, DownloadIcon } from './Icons.jsx'
import { Alert, Textarea } from './ui.jsx'

export function ToolGrid({ children }) {
  return <div className="grid gap-6 lg:grid-cols-2">{children}</div>
}

export function EditorPanel({ label, value, onChange, placeholder, rows = 12, readOnly = false, footer }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold">{label}</label>
        {footer}
      </div>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        spellCheck={false}
        aria-label={label}
      />
    </div>
  )
}

export function ResultPanel({ label, value, error, emptyMessage = 'Your result will appear here.', downloadName, tone = 'error' }) {
  const { copied, copy } = useCopy()

  const download = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = downloadName || 'tipde-output.txt'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex min-h-6 items-center justify-between gap-2">
        <label className="text-sm font-semibold">{label}</label>
        {value && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => copy(value)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Copy result"
            >
              {copied ? <CheckIcon width={16} height={16} className="text-emerald-500" /> : <CopyIcon width={16} height={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            {downloadName && (
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Download result"
              >
                <DownloadIcon width={16} height={16} /> Download
              </button>
            )}
          </div>
        )}
      </div>
      {error ? (
        <Alert tone={tone}>{error}</Alert>
      ) : (
        <Textarea value={value} readOnly rows={12} placeholder={emptyMessage} aria-label={label} spellCheck={false} />
      )}
    </div>
  )
}

export function ActionBar({ children, className = '' }) {
  return <div className={`flex flex-wrap items-center gap-2 ${className}`}>{children}</div>
}
