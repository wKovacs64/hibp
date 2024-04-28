/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// This can probably be removed in favor of Node's native fetch once we drop
// support for v18. https://x.com/ebey_jacob/status/1709975146939973909?s=20

/* c8 ignore start */
export function installUndiciOnNode18() {
  if (
    typeof process !== 'undefined' &&
    process.versions.node.startsWith('18.')
  ) {
    const {
      File: UndiciFile,
      fetch: undiciFetch,
      FormData: UndiciFormData,
      Headers: UndiciHeaders,
      Request: UndiciRequest,
      Response: UndiciResponse,
    } = require('undici');
    global.File = UndiciFile as unknown as typeof File;
    global.Headers = UndiciHeaders;
    global.Request = UndiciRequest;
    global.Response = UndiciResponse;
    global.fetch = undiciFetch;
    global.FormData = UndiciFormData;
  }
}
/* c8 ignore stop */
