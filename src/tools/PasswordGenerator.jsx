import { useEffect, useState } from 'react'
import { ActionBar } from '../components/ToolWorkspace.jsx'
import { Alert, Button, Card, Field } from '../components/ui.jsx'
import { useCopy } from '../hooks/useCopy.js'
import { CheckIcon, CopyIcon } from '../components/Icons.jsx'
import { generatePassword, passwordStrength } from '../utils/generators.js'

const options = [
  { key: 'lower', label: 'Lowercase', hint: 'a–z' },
  { key: 'upper', label: 'Uppercase', hint: 'A–Z' },
  { key: 'digits', label: 'Digits', hint: '0–9' },
  { key: 'symbols', label: 'Symbols', hint: '!@#$…' },
]

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [settings, setSettings] = useState({ lower: true, upper: true, digits: true, symbols: true, excludeSimilar: false })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { copied, copy } = useCopy()

  const generate = () => {
    try {
      setPassword(generatePassword({ length, ...settings }))
      setError('')
    } catch (caught) {
      setPassword('')
      setError(caught.message)
    }
  }

  useEffect(() => {
    generate()
    // Generate once on mount so the tool is immediately useful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedCount = options.filter((option) => settings[option.key]).length
  const charsetSize = 26 * Math.min(1, selectedCount) + (settings.digits ? 10 : 0) + (settings.symbols ? 20 : 0)
  const strength = passwordStrength(password, charsetSize)

  return (
    <div>
      <Card className="p-5 sm:p-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <code className="break-all font-mono text-lg font-semibold tracking-wide sm:text-2xl">{password || '—'}</code>
            <button
              type="button"
              onClick={() => copy(password)}
              disabled={!password}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              {copied ? <CheckIcon width={16} height={16} className="text-emerald-500" /> : <CopyIcon width={16} height={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${
                  strength.score <= 1 ? 'bg-red-500' : strength.score === 2 ? 'bg-amber-500' : strength.score === 3 ? 'bg-brand-600' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, strength.score * 25)}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{strength.label}</span>
            <span className="text-xs text-slate-500 dark:text-slate-300">~{strength.bits} bits</span>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label={`Length: ${length}`}>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
              className="w-full accent-brand-500"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <label key={option.key} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={settings[option.key]}
                  onChange={(event) => setSettings((current) => ({ ...current, [option.key]: event.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                />
                {option.label} <span className="text-xs text-slate-400">({option.hint})</span>
              </label>
            ))}
            <label className="col-span-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={settings.excludeSimilar}
                onChange={(event) => setSettings((current) => ({ ...current, excludeSimilar: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
              />
              Exclude similar looking characters (l, I, 1, O, 0)
            </label>
          </div>
        </div>

        <ActionBar className="mt-6">
          <Button onClick={generate}>Generate password</Button>
          <Button variant="secondary" onClick={() => setPassword('')}>Clear</Button>
        </ActionBar>
        {error && <div className="mt-4"><Alert>{error}</Alert></div>}
      </Card>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-300">Passwords are generated with crypto.getRandomValues and are never stored or transmitted.</p>
    </div>
  )
}
