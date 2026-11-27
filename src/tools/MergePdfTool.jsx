import { useState } from 'react'
import { FileDropzone, FileList, OutputPanel, StatusMessage } from '../components/FileTools.jsx'
import { ActionBar, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button } from '../components/ui.jsx'
import { formatBytes, isPdfFile, mergePdfs, safeBaseName } from '../utils/fileTools.js'

export default function MergePdfTool() {
  const [files, setFiles] = useState([])
  const [output, setOutput] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const addFiles = (selected) => {
    const valid = selected.filter(isPdfFile)
    const rejected = selected.length - valid.length
    if (valid.length) setFiles((current) => [...current, ...valid])
    setError(rejected ? `${rejected} ${rejected === 1 ? 'file was' : 'files were'} skipped. Only PDF files are supported.` : '')
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
    if (files.length < 2) {
      setError('Add at least two PDF files to merge.')
      return
    }

    setBusy(true)
    setError('')
    setStatus('Merging PDFs…')
    try {
      const blob = await mergePdfs(files, (file, total) => setStatus(`Adding file ${file} of ${total}…`))
      setOutput({
        blob,
        name: `${safeBaseName(files[0].name)}-merged.pdf`,
        detail: `${files.length} files · ${formatBytes(blob.size)}`,
      })
    } catch (cause) {
      setError(cause?.message || 'The PDFs could not be merged. Encrypted or damaged files may need to be repaired first.')
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
            <label className="mb-2 block text-sm font-semibold">PDF files</label>
            <FileDropzone
              accept="application/pdf,.pdf"
              multiple
              onFiles={addFiles}
              title="Choose PDFs"
              hint="Add two or more PDFs, then use the arrows to set their order."
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
            emptyMessage="No PDFs added yet."
          />
        </div>
        <OutputPanel
          title="Merged document"
          output={output}
          error={error}
          busy={busy}
          status={status}
          emptyMessage="Your merged PDF will appear here."
        />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Merging…' : 'Merge PDFs'}</Button>
        <Button variant="subtle" onClick={() => { setFiles([]); setOutput(null); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>
      <StatusMessage status={busy ? status : ''} />
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Pages are copied in the order shown. Bookmarks and form data are not merged.
      </p>
    </div>
  )
}
