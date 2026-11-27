import { useState } from 'react'
import { ActionBar, ResultPanel } from '../components/ToolWorkspace.jsx'
import { Button, Card, Field, Select } from '../components/ui.jsx'
import { generateUuids } from '../utils/generators.js'

export default function UuidGenerator() {
  const [count, setCount] = useState('5')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const generate = () => {
    try {
      setOutput(generateUuids(count).join('\n'))
      setError('')
    } catch (caught) {
      setError(caught.message)
    }
  }

  return (
    <div>
      <Card className="p-5">
        <ActionBar>
          <Field className="w-36" label="How many">
            <Select value={count} onChange={(event) => setCount(event.target.value)} aria-label="Number of UUIDs">
              {[1, 5, 10, 25, 50, 100].map((value) => <option key={value} value={value}>{value}</option>)}
            </Select>
          </Field>
          <Button onClick={generate}>Generate UUIDs</Button>
          <Button variant="subtle" onClick={() => { setOutput(''); setError('') }}>Clear</Button>
        </ActionBar>
      </Card>

      <div className="mt-6">
        <ResultPanel label="Generated UUIDs" value={output} error={error} emptyMessage="Generated identifiers will appear here." downloadName="uuids.txt" />
      </div>
    </div>
  )
}
