import { useState } from 'react'
import { FileDropzone, FileList, OutputPanel, StatusMessage } from '../components/FileTools.jsx'
import { ActionBar, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button } from '../components/ui.jsx'
import { createDocxBlob, extractPdfText, formatBytes, isPdfFile, safeBaseName } from '../utils/fileTools.js'

export default function PdfToWordTool() {
  const [file, setFile] = useState(null)
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
    setStatus('Loading the PDF reader…')
    try {
      const bytes = await file.arrayBuffer()
      const pages = await extractPdfText(bytes, (page, total) => setStatus(`Reading page ${page} of ${total}…`))
      setStatus('Building the DOCX file…')
      const blob = await createDocxBlob(pages, file.name)
      setOutput({
        blob,
        name: `${safeBaseName(file.name)}.docx`,
        detail: `${pages.length} ${pages.length === 1 ? 'page' : 'pages'} · ${formatBytes(blob.size)}`,
      })
    } catch (cause) {
      setError(cause?.message || 'The PDF could not be converted.')
      setOutput(null)
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  return (
    <div>
      <ToolGrid>
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
          <div className="mt-4">
            <FileList
              files={file ? [file] : []}
              onRemove={() => {
                setFile(null)
                setOutput(null)
                setError('')
              }}
              emptyMessage="No PDF selected."
            />
          </div>
        </div>
        <OutputPanel
          title="Editable Word document"
          output={output}
          error={error}
          busy={busy}
          status={status}
          emptyMessage="Your DOCX download will appear here."
        />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Converting…' : 'Convert to Word'}</Button>
        <Button variant="subtle" onClick={() => { setFile(null); setOutput(null); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>
      <StatusMessage status={busy ? status : ''} />
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Creates an editable, text-based DOCX. Exact page layout, images and scanned text are not preserved; scanned PDFs require OCR first.
      </p>
    </div>
  )
}
