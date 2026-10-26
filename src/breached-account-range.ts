import type { BreachedAccountRangeResult } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * A breached email hash suffix and the breach names associated with it.
 *
 * @typedef {Object} BreachedAccountRangeResult
 * @property {string} hashSuffix the remaining 34 characters of a SHA-1 email hash
 * @property {string[]} websites breach names, not website domains or URLs
 */

/**
 * Fetches breached email hash suffixes for a six-character SHA-1 email hash
 * prefix.
 *
 * Requires a Pro or High RPM subscription.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breachedaccount/range` endpoint.
 * The `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * Compare suffixes locally against the intended email hash. Per the
 * haveibeenpwned.com terms of use, discard unrelated results immediately
 * without storing or further processing them.
 *
 * @param {string} prefix the first six characters of a SHA-1 email hash
 * (case-insensitive)
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
 * @returns {(Promise<BreachedAccountRangeResult[]> | Promise<null>)} a Promise
 * which resolves to an array of range results (or null if none were found), or
 * rejects with an Error
 * @example
 * try {
 *   const data = await breachedAccountRange("6B5917", { apiKey: "my-api-key" });
 *   const match = data?.find(
 *     ({ hashSuffix }) => hashSuffix === "C6C0AADE0C085843D66E4944E108C4A4CD",
 *   );
 *   // match?.websites: ["Adobe", "Gawker", "Stratfor"] in the documented example
 * } catch (err) {
 *   // ...
 * }
 * @see https://haveibeenpwned.com/API/v3#BreachesForHashRange
 */
export function breachedAccountRange(
  prefix: string,
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
): Promise<BreachedAccountRangeResult[] | null> {
  const { apiKey, baseUrl, timeoutMs, signal, userAgent } = options;
  return fetchFromApi(`/breachedaccount/range/${encodeURIComponent(prefix)}`, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<BreachedAccountRangeResult[] | null>;
}
