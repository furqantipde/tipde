import { useMemo, useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button } from '../components/ui.jsx'
import { minifyCss } from '../utils/formatters.js'

export default function CssMinifier({ tool }) {
  const [input, setInput] = useState('')
  const [keepComments, setKeepComments] = useState(true)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const savedPercent = useMemo(() => {
    if (!input || !output) return ''
    const saved = Math.max(0, Math.round((1 - output.length / input.length) * 100))
    return `${saved}% smaller`
  }, [input, output])

  const run = () => {
    const result = minifyCss(input, { keepImportantComments: keepComments })
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
          label="Input CSS"
          value={input}
          onChange={setInput}
          placeholder=".card { color: #fff; padding: 16px; }"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label="Minified CSS" value={output} error={error} emptyMessage="Minified stylesheet will appear here." downloadName="styles.min.css" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Button onClick={run}>Minify CSS</Button>
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={keepComments} onChange={(event) => setKeepComments(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500" />
          Keep important comments
        </label>
        <Button variant="subtle" onClick={() => { setInput(''); setOutput(''); setError('') }}>Clear</Button>
        {savedPercent && <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{savedPercent}</span>}
      </ActionBar>
    </div>
  )
}
