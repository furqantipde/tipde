import { useMemo, useState } from 'react'
import { ActionBar } from '../components/ToolWorkspace.jsx'
import { Button, Card, Textarea } from '../components/ui.jsx'
import { countText } from '../utils/counters.js'

const labels = [
  { key: 'words', label: 'Words' },
  { key: 'characters', label: 'Characters' },
  { key: 'charactersNoSpaces', label: 'Characters (no spaces)' },
  { key: 'sentences', label: 'Sentences' },
  { key: 'paragraphs', label: 'Paragraphs' },
  { key: 'readingMinutes', label: 'Reading time (min)' },
]

export default function WordCounter({ tool }) {
  const [text, setText] = useState('')
  const counts = useMemo(() => countText(text), [text])

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="word-counter-input" className="text-sm font-semibold">Your text</label>
            <button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setText(tool.example)}>Load example</button>
          </div>
          <Textarea id="word-counter-input" value={text} onChange={(event) => setText(event.target.value)} rows={14} placeholder="Type or paste text here…" />
          <ActionBar className="mt-4">
            <Button variant="subtle" onClick={() => setText('')}>Clear</Button>
            <span className="text-xs text-slate-500 dark:text-slate-300">Counts update as you type.</span>
          </ActionBar>
        </div>

        <Card className="h-fit p-5">
          <h3 className="mb-4 text-sm font-semibold">Live counts</h3>
          <dl className="grid grid-cols-2 gap-3">
            {labels.map((item) => (
              <div key={item.key} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                <dt className="text-xs text-slate-500 dark:text-slate-300">{item.label}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">{counts[item.key]}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  )
}
