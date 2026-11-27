import { useEffect, useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { formatJson, minifyJson } from '../utils/formatters.js'

export default function JsonFormatter({ tool }) {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState('2')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setStatus('')
      return
    }
    const result = formatJson(input, indent)
    setStatus(result.ok ? 'Valid JSON' : 'Invalid JSON')
  }, [input, indent])

  const run = (mode) => {
    const result = mode === 'minify' ? minifyJson(input) : formatJson(input, indent)
    if (result.ok) {
      setOutput(result.value)
      setError('')
    } else {
      setOutput('')
      setError(result.error)
    }
  }

  const onKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      run('format')
    }
  }

  return (
    <div onKeyDown={onKeyDown}>
      <ToolGrid>
        <EditorPanel
          label="Input JSON"
          value={input}
          onChange={setInput}
          placeholder='{"name":"Tipde","active":true}'
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => { setInput(tool.example); setOutput(''); setError('') }}>Load example</button>}
        />
        <ResultPanel label="Output" value={output} error={error} emptyMessage="Formatted or minified JSON will appear here." downloadName="formatted.json" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={() => run('format')}>Format JSON</Button>
        <Button variant="secondary" onClick={() => run('minify')}>Minify</Button>
        <Button variant="secondary" onClick={() => run('validate')}>Validate</Button>
        <Field className="w-32" label="Indent">
          <Select value={indent} onChange={(event) => setIndent(event.target.value)} aria-label="Indentation">
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </Select>
        </Field>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError(''); setStatus('') }}>Clear</Button>
      </ActionBar>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-300">
        {status && <span className={status === 'Valid JSON' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>● {status}</span>}
        <span>Tip: press Ctrl + Enter to format.</span>
      </div>
    </div>
  )
}
