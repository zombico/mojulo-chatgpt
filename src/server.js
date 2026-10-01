import path from 'node:path';
import { createServer } from 'node:http';
import { toNodeHandler } from '@modelcontextprotocol/node';
import { MojuloClient } from './mojulo-client.js';
import { createProxyHandler } from './proxy.js';

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || '0.0.0.0';
const workspaceHome = path.resolve(process.env.MOJULO_HOME || './data/mojulo');
const bridgeToken = process.env.MOJULO_BRIDGE_TOKEN || '';

const upstream = await new MojuloClient({ home: workspaceHome }).start();
const handler = createProxyHandler(upstream);
const nodeHandler = toNodeHandler(handler, {
  onerror(error) {
    console.error('[mojulo-chatgpt] MCP transport error', error);
  },
});

function authorized(req) {
  if (!bridgeToken) return true;
  return req.headers.authorization === `Bearer ${bridgeToken}`;
}

const http = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      service: 'mojulo-chatgpt',
      mojulo: '3.0.0',
      workspaceMode: 'single-tenant',
    }));
    return;
  }

  if (url.pathname !== '/mcp') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not_found' }));
    return;
  }

  if (!authorized(req)) {
    res.writeHead(401, {
      'content-type': 'application/json',
      'www-authenticate': 'Bearer',
    });
    res.end(JSON.stringify({ error: 'unauthorized' }));
    return;
  }

  void nodeHandler(req, res);
});

async function shutdown(signal) {
  console.error(`[mojulo-chatgpt] ${signal}; shutting down`);
  await handler.close().catch(() => {});
  await upstream.close().catch(() => {});
  http.close(() => process.exit(0));
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => void shutdown(signal));
}

http.listen(port, host, () => {
  console.error(`[mojulo-chatgpt] listening on http://${host}:${port}/mcp`);
  console.error(`[mojulo-chatgpt] Mojulo workspace: ${workspaceHome}`);
  if (!bridgeToken) {
    console.error('[mojulo-chatgpt] WARNING: MOJULO_BRIDGE_TOKEN is unset; do not expose this deployment publicly.');
  }
});
