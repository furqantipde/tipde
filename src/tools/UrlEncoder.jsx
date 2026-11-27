import { useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { urlDecode, urlEncode } from '../utils/encoders.js'

export default function UrlEncoder({ tool }) {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    const result = mode === 'encode' ? urlEncode(input) : urlDecode(input)
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
          label={mode === 'encode' ? 'Text to encode' : 'Encoded text to decode'}
          value={input}
          onChange={setInput}
          placeholder="hello world & friends"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label={mode === 'encode' ? 'Encoded output' : 'Decoded output'} value={output} error={error} emptyMessage="Result will appear here." downloadName="tipde-output.txt" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Field className="w-40" label="Mode">
          <Select value={mode} onChange={(event) => { setMode(event.target.value); setOutput(''); setError('') }} aria-label="Conversion mode">
            <option value="encode">Encode component</option>
            <option value="decode">Decode component</option>
          </Select>
        </Field>
        <Button onClick={run}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
      </ActionBar>
    </div>
  )
}
