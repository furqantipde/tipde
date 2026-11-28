import { useMemo, useState } from 'react'
import { ActionBar, EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Button, Field, Select } from '../components/ui.jsx'
import { convertCase } from '../utils/textCase.js'

const styles = [
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'snake', label: 'snake_case' },
  { value: 'kebab', label: 'kebab-case' },
  { value: 'constant', label: 'CONSTANT_CASE' },
  { value: 'title', label: 'Title Case' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'uppercase', label: 'UPPERCASE' },
]

export default function TextCaseTool({ tool }) {
  const [input, setInput] = useState('')
  const [style, setStyle] = useState('camel')
  const output = useMemo(() => convertCase(input, style), [input, style])

  return (
    <div>
      <ToolGrid>
        <EditorPanel
          label="Input text"
          value={input}
          onChange={setInput}
          placeholder="hello world"
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>Load example</button>}
        />
        <ResultPanel label={`Result · ${styles.find((item) => item.value === style)?.label}`} value={output} emptyMessage="Converted text will appear here." downloadName="tipde-text-case.txt" />
      </ToolGrid>

      <ActionBar className="mt-5">
        <Field className="w-56" label="Target case">
          <Select value={style} onChange={(event) => setStyle(event.target.value)} aria-label="Target case">
            {styles.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </Select>
        </Field>
        <Button variant="subtle" onClick={() => setInput('')}>Clear</Button>
        <span className="text-xs text-slate-500 dark:text-slate-300">Conversion updates as you type and stays in your browser.</span>
      </ActionBar>
    </div>
  )
}
