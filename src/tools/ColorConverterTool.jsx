import { useMemo, useState } from 'react'
import { ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { Card, Field, Input, Select } from '../components/ui.jsx'
import { hexToRgb, rgbToHex } from '../utils/colors.js'

export default function ColorConverterTool({ tool }) {
  const [mode, setMode] = useState('hex')
  const [input, setInput] = useState('')
  const result = useMemo(() => (mode === 'hex' ? hexToRgb(input) : rgbToHex(input)), [mode, input])

  return (
    <div>
      <ToolGrid>
        <Card className="p-5">
          <div className="grid gap-4">
            <Field label="Convert from">
              <Select value={mode} onChange={(event) => { setMode(event.target.value); setInput('') }} aria-label="Source format">
                <option value="hex">HEX to RGB</option>
                <option value="rgb">RGB to HEX</option>
              </Select>
            </Field>
            <Field
              label={mode === 'hex' ? 'HEX color' : 'RGB color'}
              hint={mode === 'hex' ? 'Accepts #1e40af, 1e40af or #fff.' : 'Accepts rgb(30, 64, 175).'}
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={mode === 'hex' ? '#1e40af' : 'rgb(30, 64, 175)'}
                spellCheck={false}
                aria-label={mode === 'hex' ? 'HEX color' : 'RGB color'}
              />
            </Field>
            <button type="button" className="justify-self-start text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setInput(tool.example)}>
              Load example
            </button>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: result.ok ? result.hex : 'transparent' }}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold">Live preview</p>
                <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-300">
                  {result.ok ? result.hex : 'Enter a valid color'}
                </p>
              </div>
            </div>
          </Card>
          <ResultPanel
            label={mode === 'hex' ? 'RGB result' : 'HEX result'}
            value={result.ok ? result.value : ''}
            error={result.ok ? '' : result.error}
            emptyMessage="Converted color will appear here."
            downloadName="tipde-color.txt"
          />
        </div>
      </ToolGrid>
    </div>
  )
}
