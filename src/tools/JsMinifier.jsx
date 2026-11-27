import { useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button } from '../components/ui.jsx'
import { minifyJavaScript } from '../utils/formatters.js'

export default function JsMinifier({ tool }) {
  const [input, setInput] = useState('')
  const [compress, setCompress] = useState(true)
  const [mangle, setMangle] = useState(true)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setBusy(true)
    const result = await minifyJavaScript(input, { compress, mangle })
    setBusy(false)
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
          label="Input JavaScript"
          value={input}
          onChange={setInput}
          placeholder="function greet(name) { return 'Hello, ' + name; }"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label="Minified JavaScript" value={output} error={error} emptyMessage="Minified code will appear here." downloadName="bundle.min.js" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run} disabled={busy}>{busy ? 'Minifying…' : 'Minify JavaScript'}</Button>
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={compress} onChange={(event) => setCompress(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500" />
          Compress
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={mangle} onChange={(event) => setMangle(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500" />
          Mangle names
        </label>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
      </ActionBar>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-300">Minification uses Terser, loaded only when you run this tool.</p>
    </div>
  )
}
