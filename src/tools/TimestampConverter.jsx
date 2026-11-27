import { useState } from 'react'
import { ActionBar } from '../components/ToolWorkspace.jsx'
import { Alert, Button, Card, Field, Select } from '../components/ui.jsx'
import { currentTimestamp, dateToTimestamp, timestampToDate } from '../utils/datetime.js'

export default function TimestampConverter({ tool }) {
  const [mode, setMode] = useState('timestamp')
  const [unit, setUnit] = useState('seconds')
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const convert = () => {
    const outcome = mode === 'timestamp' ? timestampToDate(input, unit) : dateToTimestamp(input)
    if (outcome.ok) {
      setResult(outcome.value)
      setError('')
    } else {
      setResult(null)
      setError(outcome.error)
    }
  }

  return (
    <div>
      <Card className="p-5 sm:p-6">
        <ActionBar className="mb-6">
          <Field className="w-48" label="Convert">
            <Select value={mode} onChange={(event) => { setMode(event.target.value); setResult(null); setError('') }} aria-label="Conversion direction">
              <option value="timestamp">Timestamp → Date</option>
              <option value="date">Date → Timestamp</option>
            </Select>
          </Field>
          {mode === 'timestamp' && (
            <Field className="w-40" label="Unit">
              <Select value={unit} onChange={(event) => setUnit(event.target.value)} aria-label="Timestamp unit">
                <option value="seconds">Seconds</option>
                <option value="milliseconds">Milliseconds</option>
              </Select>
            </Field>
          )}
        </ActionBar>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="timestamp-input" className="text-sm font-semibold">
                {mode === 'timestamp' ? 'Unix timestamp' : 'Date and time'}
              </label>
              <button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => {
                if (mode === 'timestamp') setInput(String(currentTimestamp(unit)))
                else setInput('2023-11-14T22:13:20')
              }}>
                {mode === 'timestamp' ? 'Use current time' : 'Load example'}
              </button>
            </div>
            {mode === 'timestamp' ? (
              <input
                id="timestamp-input"
                type="text"
                inputMode="numeric"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="1700000000"
                className="w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              />
            ) : (
              <input
                id="timestamp-input"
                type="datetime-local"
                step="1"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950"
              />
            )}
            <ActionBar className="mt-4">
              <Button onClick={convert}>Convert</Button>
              <Button variant="subtle" onClick={() => { setInput(''); setResult(null); setError('') }}>Clear</Button>
            </ActionBar>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Result</h3>
            {error ? (
              <Alert>{error}</Alert>
            ) : result ? (
              <dl className="space-y-3 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-700">
                {mode === 'timestamp' ? (
                  <>
                    <div><dt className="text-xs text-slate-500 dark:text-slate-300">ISO 8601</dt><dd className="mt-1 break-all font-mono">{result.iso}</dd></div>
                    <div><dt className="text-xs text-slate-500 dark:text-slate-300">UTC</dt><dd className="mt-1 font-mono">{result.utc}</dd></div>
                    <div><dt className="text-xs text-slate-500 dark:text-slate-300">Local</dt><dd className="mt-1 font-mono">{result.local}</dd></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><dt className="text-xs text-slate-500 dark:text-slate-300">Seconds</dt><dd className="mt-1 font-mono">{result.seconds}</dd></div>
                      <div><dt className="text-xs text-slate-500 dark:text-slate-300">Milliseconds</dt><dd className="mt-1 font-mono">{result.milliseconds}</dd></div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div><dt className="text-xs text-slate-500 dark:text-slate-300">Seconds</dt><dd className="mt-1 font-mono text-lg">{result.seconds}</dd></div>
                    <div><dt className="text-xs text-slate-500 dark:text-slate-300">Milliseconds</dt><dd className="mt-1 font-mono text-lg">{result.milliseconds}</dd></div>
                  </div>
                )}
              </dl>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
                The conversion result will appear here.
              </div>
            )}
          </div>
        </div>
      </Card>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-300">Tipde uses your device clock and time zone; no data is sent to a server.</p>
    </div>
  )
}
