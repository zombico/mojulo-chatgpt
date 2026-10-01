import path from 'node:path';
import { createRequire } from 'node:module';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const require = createRequire(import.meta.url);

function definedEnv(extra = {}) {
  return Object.fromEntries(
    Object.entries({ ...process.env, ...extra }).filter(([, value]) => typeof value === 'string')
  );
}

function mojuloBin() {
  const packageJson = require.resolve('mojulo/package.json');
  return path.join(path.dirname(packageJson), 'scripts', 'mcp-stdio.mjs');
}

export class MojuloClient {
  constructor({ home, host = 'chatgpt-plugin' } = {}) {
    if (!home) throw new Error('A Mojulo workspace home is required.');
    this.home = path.resolve(home);
    this.host = host;
    this.client = null;
    this.transport = null;
  }

  async start() {
    if (this.client) return this;

    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [mojuloBin()],
      env: definedEnv({
        MOJULO_HOME: this.home,
        MOJULO_SURFACE: 'box',
        MOJULO_HOST: this.host,
      }),
      stderr: 'inherit',
    });

    const client = new Client(
      { name: 'mojulo-chatgpt-upstream', version: '0.1.0' },
      { versionNegotiation: { mode: 'legacy' } }
    );

    await client.connect(transport);
    this.client = client;
    this.transport = transport;
    return this;
  }

  assertStarted() {
    if (!this.client) throw new Error('Mojulo upstream is not started.');
  }

  async listTools() {
    this.assertStarted();
    return this.client.listTools();
  }

  async callTool(params) {
    this.assertStarted();
    return this.client.callTool(params);
  }

  async close() {
    if (!this.client) return;
    await this.client.close();
    this.client = null;
    this.transport = null;
  }
}
