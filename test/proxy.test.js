import test from 'node:test';
import assert from 'node:assert/strict';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createProxyHandler } from '../src/proxy.js';

class FakeMojulo {
  constructor() {
    this.calls = [];
  }

  async listTools() {
    return {
      tools: [{
        name: 'forward_context',
        description: 'Return Mojulo routing context.',
        inputSchema: {
          type: 'object',
          properties: { mode: { type: 'string' } },
          additionalProperties: false,
        },
      }],
    };
  }

  async callTool(params) {
    this.calls.push(params);
    return {
      content: [{ type: 'text', text: JSON.stringify({ ok: true, params }) }],
      structuredContent: { ok: true },
    };
  }
}

test('proxies Mojulo tool discovery and calls without rewriting schemas', async () => {
  const upstream = new FakeMojulo();
  const handler = createProxyHandler(upstream);

  const client = new Client(
    { name: 'proxy-test', version: '1.0.0' },
    { versionNegotiation: { mode: 'auto' } }
  );

  const transport = new StreamableHTTPClientTransport(
    new URL('http://test.local/mcp'),
    { fetch: (url, init) => handler.fetch(new Request(url, init)) }
  );

  await client.connect(transport);

  const listed = await client.listTools();
  assert.equal(listed.tools[0].name, 'forward_context');
  assert.deepEqual(listed.tools[0].inputSchema, {
    type: 'object',
    properties: { mode: { type: 'string' } },
    additionalProperties: false,
  });

  const result = await client.callTool({
    name: 'forward_context',
    arguments: { mode: 'studio' },
  });

  assert.deepEqual(upstream.calls, [{
    name: 'forward_context',
    arguments: { mode: 'studio' },
  }]);
  assert.deepEqual(result.structuredContent, { ok: true });

  await client.close();
  await handler.close();
});
