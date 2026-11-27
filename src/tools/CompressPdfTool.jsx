import { useState } from 'react'
import { FileDropzone, FileList, OutputPanel, StatusMessage } from '../components/FileTools.jsx'
import { ActionBar, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Alert, Button, Field, Select } from '../components/ui.jsx'
import { compressPdfRaster, compressPdfStructure, formatBytes, isPdfFile, safeBaseName } from '../utils/fileTools.js'

export default function CompressPdfTool() {
  const [file, setFile] = useState(null)
  const [mode, setMode] = useState('image')
  const [scale, setScale] = useState(1.2)
  const [quality, setQuality] = useState(0.7)
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
    setStatus(mode === 'image' ? 'Rendering pages…' : 'Rebuilding PDF structure…')
    try {
      const candidate = mode === 'image'
        ? await compressPdfRaster(file, {
          scale,
          quality,
          onProgress: (page, total) => setStatus(`Compressing page ${page} of ${total}…`),
        })
        : await compressPdfStructure(file, () => setStatus('Optimizing PDF objects…'))

      if (candidate.size >= file.size) {
        setOutput({
          blob: file,
          name: `${safeBaseName(file.name)}-original.pdf`,
          detail: `Already optimized — kept the original ${formatBytes(file.size)} file.`,
        })
      } else {
        const saved = Math.round(((file.size - candidate.size) / file.size) * 100)
        setOutput({
          blob: candidate,
          name: `${safeBaseName(file.name)}-compressed.pdf`,
          detail: `${formatBytes(file.size)} → ${formatBytes(candidate.size)} · ${saved}% smaller`,
        })
      }
    } catch (cause) {
      setError(cause?.message || 'The PDF could not be compressed.')
      setOutput(null)
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

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
                setOutput(null)
                setError('')
              }}
              title="Choose PDF"
              hint="Drop one PDF here, or choose a file from your device."
            />
          </div>
          <FileList
            files={file ? [file] : []}
            onRemove={() => { setFile(null); setOutput(null); setError('') }}
            emptyMessage="No PDF selected."
          />
          <div className="space-y-2">
            <span className="block text-sm font-semibold">Compression mode</span>
            <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <input type="radio" name="compression-mode" checked={mode === 'image'} onChange={() => { setMode('image'); setOutput(null) }} className="mt-1 h-4 w-4 text-brand-500 focus:ring-brand-500" />
              <span>
                <span className="block text-sm font-medium">Strong (image-based)</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Rebuilds pages as JPEG images. Best size reduction, but text is no longer selectable.</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <input type="radio" name="compression-mode" checked={mode === 'structure'} onChange={() => { setMode('structure'); setOutput(null) }} className="mt-1 h-4 w-4 text-brand-500 focus:ring-brand-500" />
              <span>
                <span className="block text-sm font-medium">Structure only</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Rewrites PDF objects without rasterizing. Preserves text, but may save less space.</span>
              </span>
            </label>
          </div>
          {mode === 'image' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Render scale">
                <Select value={scale} onChange={(event) => { setScale(Number(event.target.value)); setOutput(null) }}>
                  <option value={0.8}>Smaller file (0.8×)</option>
                  <option value={1.2}>Balanced (1.2×)</option>
                  <option value={1.6}>Sharper (1.6×)</option>
                </Select>
              </Field>
              <Field label={`JPEG quality: ${Math.round(quality * 100)}%`}>
                <input
                  type="range"
                  min="0.4"
                  max="0.92"
                  step="0.02"
                  value={quality}
                  onChange={(event) => { setQuality(Number(event.target.value)); setOutput(null) }}
                  className="mt-2 w-full accent-brand-600"
                  aria-label="JPEG quality"
                />
              </Field>
            </div>
          )}
          {mode === 'image' && (
            <Alert tone="info">Image-based compression keeps the pages looking similar, but removes selectable text and vector detail.</Alert>
          )}
        </div>
        <OutputPanel
          title="Compressed PDF"
          output={output}
          error={error}
          busy={busy}
          status={status}
          emptyMessage="Your compressed PDF will appear here."
        />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Compressing…' : 'Compress PDF'}</Button>
        <Button variant="subtle" onClick={() => { setFile(null); setOutput(null); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>
      <StatusMessage status={busy ? status : ''} />
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        If the original file is smaller, Tipde keeps the original so compression never makes your download bigger.
      </p>
    </div>
  )
}
