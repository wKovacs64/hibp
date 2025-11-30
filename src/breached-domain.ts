import type { BreachedDomainsByEmailAlias } from './api/haveibeenpwned/types.js';
import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * An object mapping an email alias (local-part before the '@') to the list of
 * breach names that alias has appeared in for the specified domain.
 *
 * @typedef {Object.<string, string[]>} BreachedDomainsByEmailAlias
 */

/**
 * Fetches all breached email addresses for a domain.
 *
 * The result maps email aliases (the local-part before the '@') to an array of
 * breach names. For example, querying `example.com` could return an object like
 * `{ "john": ["Adobe"], "jane": ["Adobe", "Gawker"] }`, corresponding to
 * `john@example.com` and `jane@example.com`.
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
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<BreachedDomainsByEmailAlias> | Promise<null>)} a Promise which
 * resolves to an object mapping aliases to breach name arrays (or null if no
 * results were found), or rejects with an Error
 * @example
 * try {
 *   const data = await breachedDomain("example.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // { "john": ["Adobe"], "jane": ["Adobe", "Gawker"] }
 *   } else {
 *     // no results
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
     * an AbortSignal to cancel the request (default: none)
     */
    signal?: AbortSignal;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<BreachedDomainsByEmailAlias | null> {
  const { apiKey, baseUrl, timeoutMs, signal, userAgent } = options;
  const endpoint = `/breacheddomain/${encodeURIComponent(domain)}`;

  return fetchFromApi(endpoint, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<BreachedDomainsByEmailAlias | null>;
}
