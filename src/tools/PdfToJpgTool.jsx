import { useState } from 'react'
import { FileDropzone, FileList, OutputPanel, StatusMessage } from '../components/FileTools.jsx'
import { ActionBar, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { DownloadIcon } from '../components/Icons.jsx'
import { downloadBlob, formatBytes, isPdfFile, pdfPagesToZip, renderPdfPages, safeBaseName } from '../utils/fileTools.js'

export default function PdfToJpgTool() {
  const [file, setFile] = useState(null)
  const [scale, setScale] = useState(1.5)
  const [quality, setQuality] = useState(0.85)
  const [pages, setPages] = useState([])
  const [output, setOutput] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    if (!file) {
      setError('Choose a PDF file first.')
      return
    }
    if (!isPdfFile(file)) {
      setError('Please choose a PDF file.')
      return
    }

    setBusy(true)
    setError('')
    setStatus('Rendering pages…')
    try {
      const rendered = await renderPdfPages(await file.arrayBuffer(), {
        scale,
        quality,
        onProgress: (page, total) => setStatus(`Rendering page ${page} of ${total}…`),
      })
      setStatus('Building the ZIP archive…')
      const baseName = safeBaseName(file.name)
      const zip = await pdfPagesToZip(rendered, baseName)
      setPages(rendered)
      setOutput({
        blob: zip,
        name: `${baseName}-images.zip`,
        detail: `${rendered.length} ${rendered.length === 1 ? 'page' : 'pages'} · ${formatBytes(zip.size)}`,
      })
    } catch (cause) {
      setError(cause?.message || 'The PDF pages could not be rendered.')
      setOutput(null)
      setPages([])
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  const pageName = (page) => `${safeBaseName(file?.name)}-page-${String(page.number).padStart(2, '0')}.jpg`

  return (
    <div>
      <ToolGrid>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">PDF file</label>
            <FileDropzone
              accept="application/pdf,.pdf"
              onFiles={(selected) => {
                setFile(selected[0])
                setPages([])
                setOutput(null)
                setError('')
              }}
              title="Choose PDF"
              hint="Drop one PDF here, or choose a file from your device."
            />
          </div>
          <FileList
            files={file ? [file] : []}
            onRemove={() => { setFile(null); setPages([]); setOutput(null); setError('') }}
            emptyMessage="No PDF selected."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Image size">
              <Select value={scale} onChange={(event) => { setScale(Number(event.target.value)); setOutput(null); setPages([]) }}>
                <option value={1}>Standard (1×)</option>
                <option value={1.5}>High (1.5×)</option>
                <option value={2}>Very high (2×)</option>
              </Select>
            </Field>
            <Field label={`JPEG quality: ${Math.round(quality * 100)}%`}>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={quality}
                onChange={(event) => { setQuality(Number(event.target.value)); setOutput(null); setPages([]) }}
                className="mt-2 w-full accent-brand-600"
                aria-label="JPEG quality"
              />
            </Field>
          </div>
        </div>
        <OutputPanel
          title="JPG images"
          output={output}
          error={error}
          busy={busy}
          status={status}
          emptyMessage="Your JPG downloads will appear here."
        >
          {pages.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">Download individual pages</p>
              <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                {pages.map((page) => (
                  <button
                    key={page.number}
                    type="button"
                    onClick={() => downloadBlob(page.blob, pageName(page))}
                    className="flex w-full items-center justify-between gap-3 rounded-lg bg-white/70 px-3 py-2 text-left text-xs text-emerald-900 hover:bg-white dark:bg-slate-950/40 dark:text-emerald-200 dark:hover:bg-slate-950/70"
                  >
                    <span>Page {page.number}</span>
                    <span className="flex items-center gap-2">
                      {formatBytes(page.blob.size)}
                      <DownloadIcon width={14} height={14} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </OutputPanel>
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Converting…' : 'Convert to JPG'}</Button>
        <Button variant="subtle" onClick={() => { setFile(null); setPages([]); setOutput(null); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>
      <StatusMessage status={busy ? status : ''} />
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Pages are rendered as JPEG images. Download the ZIP for all pages, or pick individual pages below.
      </p>
    </div>
  )
}
