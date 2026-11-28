import { useMemo, useState } from 'react'
import { Alert } from '../components/ui.jsx'
import { EditorPanel, ResultPanel, ToolGrid } from '../components/ToolWorkspace.jsx'
import { decodeJwt, prettyJson } from '../utils/jwt.js'

export default function JwtDecoderTool({ tool }) {
  const [token, setToken] = useState('')
  const decoded = useMemo(() => decodeJwt(token), [token])
  const header = decoded.ok ? prettyJson(decoded.header) : ''
  const payload = decoded.ok ? prettyJson(decoded.payload) : ''

  return (
    <div>
      <Alert tone="info">
        This tool decodes the header and payload locally. It does not verify the signature, so never trust a decoded token without validating it in your application.
      </Alert>

      <div className="mt-6">
        <EditorPanel
          label="JWT token"
          value={token}
          onChange={setToken}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"
          rows={5}
          footer={<button type="button" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-200" onClick={() => setToken(tool.example)}>Load example</button>}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ResultPanel label="Header" value={header} error={decoded.ok ? '' : decoded.error} emptyMessage="Decoded header will appear here." downloadName="tipde-jwt-header.json" />
        <ResultPanel label="Payload" value={payload} error={''} emptyMessage="Decoded payload will appear here." downloadName="tipde-jwt-payload.json" />
      </div>

      {decoded.ok && (
        <div className="mt-6">
          <ResultPanel label="Signature (not verified)" value={decoded.signature} emptyMessage="" downloadName="tipde-jwt-signature.txt" />
        </div>
      )}
    </div>
  )
}
