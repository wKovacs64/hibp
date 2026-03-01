import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * Fetches all stealer log domains for an email address.
 *
 * Returns an array of domains for which stealer logs contain entries for the
 * supplied email address.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `stealerlogsbyemail` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * @param {string} emailAddress the email address to query
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
 * array of domain strings (or null if none were found), or rejects with an
 * Error
 * @example
 * try {
 *   const data = await stealerLogsByEmail("foo@bar.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await stealerLogsByEmail("foo@bar.com", {
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
export function stealerLogsByEmail(
  emailAddress: string,
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
  const endpoint = `/stealerlogsbyemail/${encodeURIComponent(emailAddress)}`;

  return fetchFromApi(endpoint, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<string[] | null>;
}
