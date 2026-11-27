import { useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { formatHtml } from '../utils/formatters.js'

export default function HtmlFormatter({ tool }) {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState('2')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    const result = formatHtml(input, indent)
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
          label="Input HTML"
          value={input}
          onChange={setInput}
          placeholder="<div><h1>Hello</h1><p>Format me.</p></div>"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label="Formatted HTML" value={output} error={error} emptyMessage="Formatted markup will appear here." downloadName="formatted.html" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run}>Format HTML</Button>
        <Field className="w-32" label="Indent">
          <Select value={indent} onChange={(event) => setIndent(event.target.value)} aria-label="Indentation">
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </Select>
        </Field>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
      </ActionBar>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-300">Tip: press Ctrl + Enter to format.</p>
    </div>
  )
}
