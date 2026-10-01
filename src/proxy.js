import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';

export function createProxyServer(upstream) {
  const server = new McpServer(
    { name: 'mojulo-chatgpt', version: '0.1.0' },
    { capabilities: { tools: {} } }
  );

  server.server.setRequestHandler('tools/list', async () => {
    return upstream.listTools();
  });

  server.server.setRequestHandler('tools/call', async (request) => {
    return upstream.callTool(request.params);
  });

  return server;
}

export function createProxyHandler(upstream) {
  return createMcpHandler(() => createProxyServer(upstream));
}
