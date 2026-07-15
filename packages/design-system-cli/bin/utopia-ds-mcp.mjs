#!/usr/bin/env node
import {
  capabilityManifest, getComponent, getDoc, getMotionProfile, getTemplate, getTheme,
  listComponents, listDocs, listMotionProfiles, listTemplates, listThemes, repositoryDoctor, search,
} from '../lib/api.mjs'

const tools = [
  ['search', 'Search components, docs, templates, themes, and motion profiles.', { query: { type: 'string' } }, ({ query }) => search(query)],
  ['list_components', 'List every Ceramic component contract.', {}, () => listComponents()],
  ['get_component', 'Get one component including imports, tokens, usage, and Arabic rules.', { name: { type: 'string' } }, ({ name }) => getComponent(name)],
  ['list_templates', 'List Ceramic starter templates.', {}, () => listTemplates()],
  ['get_template', 'Get a template contract and sections.', { id: { type: 'string' } }, ({ id }) => getTemplate(id)],
  ['list_themes', 'List themes that implement the semantic contract.', {}, () => listThemes()],
  ['get_theme', 'Get a theme policy and semantic mappings.', { id: { type: 'string' } }, ({ id }) => getTheme(id)],
  ['list_motion_profiles', 'List theme-owned semantic motion personalities.', {}, () => listMotionProfiles()],
  ['get_motion_profile', 'Get a motion profile, its rules, contract, and compatible runtime adapters.', { id: { type: 'string' } }, ({ id }) => getMotionProfile(id)],
  ['list_docs', 'List AI-readable design-system documents.', {}, () => listDocs()],
  ['get_docs', 'Read one design-system document.', { topic: { type: 'string' } }, ({ topic }) => getDoc(topic)],
  ['doctor', 'Validate the Ceramic source of truth.', {}, () => repositoryDoctor()],
]

function reply(id, result) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`)
}

function error(id, code, message) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } })}\n`)
}

let buffer = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  buffer += chunk
  let index
  while ((index = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, index).trim()
    buffer = buffer.slice(index + 1)
    if (!line) continue
    try {
      const request = JSON.parse(line)
      if (request.method === 'initialize') reply(request.id, { protocolVersion: '2025-03-26', capabilities: { tools: {} }, serverInfo: { name: 'ceramic-design-system', version: capabilityManifest().version } })
      else if (request.method === 'notifications/initialized') continue
      else if (request.method === 'ping') reply(request.id, {})
      else if (request.method === 'tools/list') reply(request.id, { tools: tools.map(([name, description, properties]) => ({ name, description, inputSchema: { type: 'object', properties, required: Object.keys(properties) } })) })
      else if (request.method === 'tools/call') {
        const tool = tools.find(([name]) => name === request.params?.name)
        if (!tool) error(request.id, -32602, `Unknown tool ${request.params?.name}`)
        else {
          const data = tool[3](request.params?.arguments ?? {})
          reply(request.id, { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], structuredContent: data, isError: data == null })
        }
      } else error(request.id, -32601, `Method not found: ${request.method}`)
    } catch (cause) {
      error(null, -32700, cause instanceof Error ? cause.message : 'Parse error')
    }
  }
})
