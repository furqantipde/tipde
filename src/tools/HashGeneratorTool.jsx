import { useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Alert, Button, Field, Select } from '../components/ui.jsx'
import { hashAlgorithms, hashText } from '../utils/hash.js'

export default function HashGeneratorTool() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setBusy(true)
    const result = await hashText(input, algorithm)
    if (result.ok) {
      setOutput(result.value)
      setError('')
    } else {
      setOutput('')
      setError(result.error)
    }
    setBusy(false)
  }

  return (
    <div>
      <ToolGrid>
        <EditorPanel
          label="Text to hash"
          value={input}
          onChange={(value) => { setInput(value); setOutput(''); setError('') }}
          placeholder="Type or paste text…"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => { setInput('Hello, Tipde!'); setOutput('') }}>Load example</button>}
        />
        <ResultPanel label={`${algorithm} digest`} value={output} error={error} emptyMessage="Hash will appear here." downloadName="tipde-hash.txt" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Field className="w-44" label="Algorithm">
          <Select value={algorithm} onChange={(event) => { setAlgorithm(event.target.value); setOutput(''); setError('') }} aria-label="Hash algorithm">
            {hashAlgorithms.map((name) => <option key={name} value={name}>{name}</option>)}
          </Select>
        </Field>
        <Button onClick={run} disabled={busy}>{busy ? 'Hashing…' : 'Generate hash'}</Button>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
      </ActionBar>

      <div className="mt-5">
        <Alert tone="info">Hashing runs locally with the browser Web Crypto API. SHA-1 is included for compatibility, but prefer SHA-256 or stronger for new work. A hash is not encryption.</Alert>
      </div>
    </div>
  )
}
