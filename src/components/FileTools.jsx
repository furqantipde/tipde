import { useRef, useState } from 'react'
import { downloadBlob, formatBytes } from '../utils/fileTools.js'
import { DownloadIcon, TrashIcon } from './Icons.jsx'
import { Alert, Button } from './ui.jsx'

export function FileDropzone({ accept, multiple = false, onFiles, label, title, hint }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const buttonLabel = label || title || 'Choose files'

  const handleFiles = (fileList) => {
    const selected = Array.from(fileList || [])
    if (selected.length) onFiles(selected)
  }

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
        dragging
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-600/10'
          : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/50'
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        handleFiles(event.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        aria-label={buttonLabel}
        onChange={(event) => {
          handleFiles(event.target.files)
          event.target.value = ''
        }}
      />
      <Button variant="secondary" type="button" onClick={() => inputRef.current?.click()}>{buttonLabel}</Button>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{hint || 'You can also drag and drop files here.'}</p>
    </div>
  )
}

export function FileList({ files = [], onRemove, onMove, emptyMessage = 'No files selected.' }) {
  if (!files.length) {
    return <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">{emptyMessage}</div>
  }

  return (
    <ul className="space-y-2">
      {files.map((file, index) => (
        <li key={`${file.name}-${file.size}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{formatBytes(file.size)}</p>
          </div>
          {(onRemove || onMove) && (
            <div className="flex shrink-0 items-center gap-1">
              {onMove && (
                <>
                  <button
                    type="button"
                    onClick={() => onMove(index, -1)}
                    disabled={index === 0}
                    className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                    aria-label={`Move ${file.name} up`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(index, 1)}
                    disabled={index === files.length - 1}
                    className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                    aria-label={`Move ${file.name} down`}
                  >
                    ↓
                  </button>
                </>
              )}
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                  aria-label={`Remove ${file.name}`}
                >
                  <TrashIcon width={16} height={16} />
                </button>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export function OutputPanel({ title = 'Result', output, error, busy, status, emptyMessage, children }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex min-h-7 items-center justify-between gap-2">
        <label className="text-sm font-semibold">{title}</label>
        {output && (
          <Button variant="subtle" type="button" onClick={() => downloadBlob(output.blob, output.name)}>
            <DownloadIcon width={16} height={16} /> Download
          </Button>
        )}
      </div>
      {error ? (
        <Alert>{error}</Alert>
      ) : output ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="break-all text-sm font-medium text-emerald-900 dark:text-emerald-200">{output.name}</p>
          {output.detail && <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">{output.detail}</p>}
          {children}
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {busy ? status || 'Working…' : emptyMessage || 'Your result will appear here.'}
        </div>
      )}
    </div>
  )
}

export function StatusMessage({ status }) {
  if (!status) return null
  return <p className="mt-3 text-sm text-slate-600 dark:text-slate-300" role="status">{status}</p>
}
