import { useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { base64Decode, base64Encode } from '../utils/encoders.js'

export default function Base64Tool({ tool }) {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    const result = mode === 'encode' ? base64Encode(input) : base64Decode(input)
    if (result.ok) {
      setOutput(result.value)
      setError('')
    } else {
      setOutput('')
      setError(result.error)
    }
  }

  return (
    <div onKeyDown={(event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        run()
      }
    }}>
      <ToolGrid>
        <EditorPanel
          label={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          value={input}
          onChange={setInput}
          placeholder={mode === 'encode' ? 'Hello, Tipde! 👋' : 'SGVsbG8sIFRpcGRlISDwn5aN'}
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label={mode === 'encode' ? 'Base64 output' : 'Decoded text'} value={output} error={error} emptyMessage="Result will appear here." downloadName="tipde-output.txt" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Field className="w-40" label="Mode">
          <Select value={mode} onChange={(event) => { setMode(event.target.value); setOutput(''); setError('') }} aria-label="Conversion mode">
            <option value="encode">Encode to Base64</option>
            <option value="decode">Decode from Base64</option>
          </Select>
        </Field>
        <Button onClick={run}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
      </ActionBar>
    </div>
  )
}
