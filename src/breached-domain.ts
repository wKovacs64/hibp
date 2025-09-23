import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * Fetches all breached email addresses for a given domain.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breacheddomain` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * @param {string} domain the domain to query (e.g., "example.com")
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<string[]> | Promise<null>)} a Promise which resolves to an
 * array of breached email addresses (or null if none were found), or rejects
 * with an Error
 * @example
 * try {
 *   const data = await breachedDomain("example.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function breachedDomain(
  domain: string,
  options: {
    /**
     * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
     */
    apiKey?: string;
    /**
     * a custom base URL for the haveibeenpwned.com API endpoints (default:
     * `https://haveibeenpwned.com/api/v3`)
     */
    baseUrl?: string;
    /**
     * timeout for the request in milliseconds (default: none)
     */
    timeoutMs?: number;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<string[] | null> {
  return fetchFromApi(`/breacheddomain/${encodeURIComponent(domain)}`, options) as Promise<
    string[] | null
  >;
}
