import { useState } from 'react'
import { FileDropzone, FileList, OutputPanel, StatusMessage } from '../components/FileTools.jsx'
import { ActionBar, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { formatBytes, imagesToPdf, isImageFile, safeBaseName } from '../utils/fileTools.js'

export default function JpgToPdfTool() {
  const [files, setFiles] = useState([])
  const [pageSize, setPageSize] = useState('a4')
  const [margin, setMargin] = useState(24)
  const [output, setOutput] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const addFiles = (selected) => {
    const valid = selected.filter(isImageFile)
    const rejected = selected.length - valid.length
    if (valid.length) setFiles((current) => [...current, ...valid])
    setError(rejected ? `${rejected} ${rejected === 1 ? 'file was' : 'files were'} skipped. Only JPG and PNG images are supported.` : '')
    setOutput(null)
  }

  const moveFile = (index, direction) => {
    setFiles((current) => {
      const next = [...current]
      const target = index + direction
      if (target < 0 || target >= next.length) return current
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setOutput(null)
  }

  const run = async () => {
    if (!files.length) {
      setError('Add at least one image first.')
      return
    }

    setBusy(true)
    setError('')
    setStatus('Creating your PDF…')
    try {
      const blob = await imagesToPdf(files, {
        pageSize,
        margin,
        onProgress: (page, total) => setStatus(`Adding image ${page} of ${total}…`),
      })
      setOutput({
        blob,
        name: `${safeBaseName(files[0].name)}-images.pdf`,
        detail: `${files.length} ${files.length === 1 ? 'page' : 'pages'} · ${formatBytes(blob.size)}`,
      })
    } catch (cause) {
      setError(cause?.message || 'The PDF could not be created.')
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
            <label className="mb-2 block text-sm font-semibold">Images</label>
            <FileDropzone
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              onFiles={addFiles}
              title="Choose images"
              hint="JPG and PNG images are supported. Use the arrows to set page order."
            />
          </div>
          <FileList
            files={files}
            onMove={moveFile}
            onRemove={(index) => {
              setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
              setOutput(null)
              setError('')
            }}
            emptyMessage="No images added yet."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Page size">
              <Select value={pageSize} onChange={(event) => { setPageSize(event.target.value); setOutput(null) }}>
                <option value="a4">A4</option>
                <option value="letter">US Letter</option>
              </Select>
            </Field>
            <Field label="Margin (points)" hint="0 gives a full-bleed page.">
              <Select value={margin} onChange={(event) => { setMargin(Number(event.target.value)); setOutput(null) }}>
                <option value={0}>None</option>
                <option value={12}>Small</option>
                <option value={24}>Normal</option>
                <option value={36}>Large</option>
              </Select>
            </Field>
          </div>
        </div>
        <OutputPanel
          title="PDF document"
          output={output}
          error={error}
          busy={busy}
          status={status}
          emptyMessage="Your PDF download will appear here."
        />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Creating PDF…' : 'Create PDF'}</Button>
        <Button variant="subtle" onClick={() => { setFiles([]); setOutput(null); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>
      <StatusMessage status={busy ? status : ''} />
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Images are fitted inside each page automatically. Landscape images use landscape pages.
      </p>
    </div>
  )
}
