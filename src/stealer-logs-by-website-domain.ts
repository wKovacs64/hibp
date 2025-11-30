import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * Fetches all stealer log email addresses for a website domain.
 *
 * The result is an array of strings representing email addresses found in
 * stealer logs for the specified website domain (e.g., "example.com").
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `stealerlogsbywebsitedomain`
 * endpoint. The `apiKey` option here is not explicitly required, but direct
 * requests made without it will fail (unless you specify a `baseUrl` to a proxy
 * that inserts a valid API key on your behalf).
 *
 * @param {string} websiteDomain the website domain to query (e.g., "example.com")
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<string[]> | Promise<null>)} a Promise which resolves to an
 * array of email addresses (or null if no results were found), or rejects with
 * an Error
 * @example
 * try {
 *   const data = await stealerLogsByWebsiteDomain("example.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // ["andy@gmail.com", "jane@gmail.com"]
 *   } else {
 *     // no results
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await stealerLogsByWebsiteDomain("example.com", {
 *     baseUrl: "https://my-hibp-proxy:8080",
 *   });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function stealerLogsByWebsiteDomain(
  websiteDomain: string,
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
     * an AbortSignal to cancel the request (default: none)
     */
    signal?: AbortSignal;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<string[] | null> {
  const { apiKey, baseUrl, timeoutMs, signal, userAgent } = options;
  const endpoint = `/stealerlogsbywebsitedomain/${encodeURIComponent(websiteDomain)}`;

  return fetchFromApi(endpoint, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<string[] | null>;
}
