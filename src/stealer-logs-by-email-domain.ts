import type { StealerLogDomainsByEmailAlias } from './api/haveibeenpwned/types.js';
import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * An object mapping an email alias (local-part before the '@') to the list of
 * email domains that alias has appeared in within stealer logs for the specified
 * email domain.
 *
 * @typedef {Object.<string, string[]>} StealerLogDomainsByEmailAlias
 */

/**
 * Fetches all stealer log email aliases for an email domain.
 *
 * The result maps email aliases (the local-part before the '@') to an array of
 * email domains found in stealer logs. For example, querying `example.com`
 * could return an object like `{ "andy": ["netflix.com"], "jane": ["netflix.com",
 * "spotify.com"] }`, corresponding to `andy@example.com` and `jane@example.com`.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `stealerlogsbyemaildomain` endpoint.
 * The `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * @param {string} emailDomain the email domain to query (e.g., "example.com")
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
 * @returns {(Promise<StealerLogDomainsByEmailAlias> | Promise<null>)} a Promise
 * which resolves to an object mapping aliases to stealer log email domain arrays
 * (or null if no results were found), or rejects with an Error
 * @example
 * try {
 *   const data = await stealerLogsByEmailDomain("example.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // { "andy": ["netflix.com"], "jane": ["netflix.com", "spotify.com"] }
 *   } else {
 *     // no results
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function stealerLogsByEmailDomain(
  emailDomain: string,
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
): Promise<StealerLogDomainsByEmailAlias | null> {
  const { apiKey, baseUrl, timeoutMs, signal, userAgent } = options;
  const endpoint = `/stealerlogsbyemaildomain/${encodeURIComponent(emailDomain)}`;

  return fetchFromApi(endpoint, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<StealerLogDomainsByEmailAlias | null>;
}
