import { useMemo, useState } from 'react'
import { Check, Clipboard, Play, Server, TerminalSquare } from 'lucide-react'
import { components, motionProfiles, templates, themes } from '../data/design-system'
import { useI18n } from '../i18n'
import { Button } from '../../packages/design-system/src/Button'
import { Badge } from '../../packages/design-system/src/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../packages/design-system/src/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../packages/design-system/src/Forms'

const mcpTools = ['doctor', 'search', 'list_components', 'get_component', 'list_templates', 'get_template', 'list_themes', 'get_theme', 'list_motion_profiles', 'get_motion_profile', 'list_docs', 'get_docs'] as const
type ToolName = typeof mcpTools[number]

const config = `{
  "mcpServers": {
    "ceramic-design-system": {
      "command": "npx",
      "args": ["-y", "--package", "@utopia-studio-design/design-system-cli", "utopia-ds", "mcp"]
    }
  }
}`

function mirroredResult(tool: ToolName) {
  if (tool === 'doctor') return { apiVersion: 1, type: 'doctor-result', data: { ok: true, checks: { manifests: true, docs: true, components: components.components.length, templates: templates.templates.length, themes: themes.themes.length, motionProfiles: motionProfiles.profiles.length, motionAdapters: motionProfiles.adapters.length, motionContract: true, mcp: true }, missing: [] } }
  if (tool === 'list_components') return { apiVersion: 1, type: 'component-list', data: components.components.map(({ name, category, status }) => ({ name, category, status })) }
  if (tool === 'list_templates') return { apiVersion: 1, type: 'template-list', data: templates.templates.map(({ id, title, status }) => ({ id, title, status })) }
  if (tool === 'list_themes') return { apiVersion: 1, type: 'theme-list', data: themes.themes.map(({ id, name, role }) => ({ id, name, role })) }
  if (tool === 'list_motion_profiles') return { apiVersion: 1, type: 'motion-profile-list', data: motionProfiles.profiles }
  if (tool === 'get_motion_profile') return { apiVersion: 1, type: 'motion-profile', data: { ...motionProfiles.profiles[0], adapters: motionProfiles.adapters, contract: motionProfiles.contract } }
  return { apiVersion: 1, type: 'request-preview', data: { tool, note: 'This browser mirror previews the package contract. Run through an MCP stdio client for live transport.' } }
}

export function McpPlaygroundPage() {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const [tool, setTool] = useState<ToolName>('doctor')
  const [result, setResult] = useState<ReturnType<typeof mirroredResult> | null>(null)
  const [copied, setCopied] = useState(false)
  const request = useMemo(() => JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: tool, arguments: {} } }, null, 2), [tool])

  const copyConfig = async () => {
    await navigator.clipboard.writeText(config)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="page mcp-playground-page">
      <section className="page-hero compact">
        <p className="eyebrow">AI platform · MCP</p>
        <h1>MCP Playground</h1>
        <p>{isArabic ? 'تحقق من عقد حزمة Ceramic، افحص الأدوات، وانسخ إعداد اتصال stdio الصحيح.' : 'Verify the Ceramic package contract, inspect tools, and copy the correct stdio connection configuration.'}</p>
        <div className="mcp-status-row">
          <Badge variant="success"><Check aria-hidden="true" /> Package contract verified</Badge>
          <Badge variant="secondary"><Server aria-hidden="true" /> stdio · local client</Badge>
        </div>
      </section>
      <section className="mcp-playground-grid">
        <Card id="connection">
          <CardHeader><CardTitle>{isArabic ? 'إعداد الاتصال' : 'Connection configuration'}</CardTitle><CardDescription>{isArabic ? 'ألصق هذا الإعداد في عميل MCP ثم أعد تشغيله.' : 'Paste this into your MCP client and restart the client.'}</CardDescription></CardHeader>
          <CardContent>
            <div className="code-block"><span>json</span><pre>{config}</pre></div>
            <Button onClick={copyConfig} variant="outline">{copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copied ? 'Copied' : 'Copy config'}</Button>
          </CardContent>
        </Card>
        <Card id="tools">
          <CardHeader><CardTitle>{isArabic ? 'مستكشف الأدوات' : 'Tool explorer'}</CardTitle><CardDescription>{isArabic ? 'هذه معاينة متصفح لعقد الحزمة، وليست نقل stdio حيا.' : 'This is a browser mirror of the package contract, not a live stdio transport.'}</CardDescription></CardHeader>
          <CardContent className="mcp-tool-explorer">
            <label><span>{isArabic ? 'الأداة' : 'Tool'}</span><Select onValueChange={(value) => { setTool(value as ToolName); setResult(null) }} value={tool}><SelectTrigger aria-label="MCP tool"><SelectValue /></SelectTrigger><SelectContent>{mcpTools.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select></label>
            <Button aria-label="Run browser mirror" onClick={() => setResult(mirroredResult(tool))}><Play aria-hidden="true" /> {isArabic ? 'تشغيل المرآة' : 'Run browser mirror'}</Button>
            <div className="mcp-request-response">
              <div><span><TerminalSquare aria-hidden="true" /> Request</span><pre>{request}</pre></div>
              <div aria-live="polite"><span><Server aria-hidden="true" /> Response</span><pre>{result ? JSON.stringify(result, null, 2) : '// Run the browser mirror to inspect the typed response.'}</pre></div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
