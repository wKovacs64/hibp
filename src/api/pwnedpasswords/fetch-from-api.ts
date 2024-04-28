import { installUndiciOnNode18 } from '../fetch-polyfill.js';
import { BAD_REQUEST } from './responses.js';

installUndiciOnNode18();

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns plain text (data found).
 * HTTP status code 400 throws an Error (bad request).
 *
 * @internal
 * @private
 * @param {string} endpoint the API endpoint to query
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @param {boolean} [options.addPadding] ask the remote API to add padding to
 * the response to obscure the password prefix (default: `false`)
 * @param {'sha1' | 'ntlm'} [options.mode] return SHA-1 or NTLM hashes
 * (default: `sha1`)
 * @returns {Promise<string>} a Promise which resolves to the data resulting
 * from the query, or rejects with an Error
 */
export async function fetchFromApi(
  endpoint: string,
  options: {
    baseUrl?: string;
    timeoutMs?: number;
    userAgent?: string;
    addPadding?: boolean;
    mode?: 'sha1' | 'ntlm';
  } = {},
): Promise<string> {
  const {
    baseUrl = 'https://api.pwnedpasswords.com',
    timeoutMs,
    userAgent,
    addPadding = false,
    mode = 'sha1',
  } = options;

  const config: RequestInit = {
    headers: {
      ...(userAgent ? { 'User-Agent': userAgent } : {}),
      ...(addPadding ? { 'Add-Padding': 'true' } : {}),
    },
    ...(timeoutMs ? { signal: AbortSignal.timeout(timeoutMs) } : {}),
  };
  const url = `${baseUrl.replace(/\/$/g, '')}${endpoint}?mode=${mode}`;
  const response = await fetch(url, config);

  if (response.ok) return response.text();

  if (response.status === BAD_REQUEST.status) {
    const text = await response.text();
    throw new Error(text);
  }

  throw new Error(response.statusText);
}
