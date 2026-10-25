import type { BreachedAccountRangeResult } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * A breached email hash suffix and the breach names associated with it.
 * Property names match the API's lower camel case response.
 *
 * @typedef {Object} BreachedAccountRangeResult
 * @property {string} hashSuffix the remaining 34 characters of a SHA-1 email hash
 * @property {string[]} websites breach names, not website domains or URLs
 */

/**
 * Fetches breached email hash suffixes for a six-character SHA-1 prefix.
 * Email prefixes have six characters; Pwned Passwords prefixes have five.
 * The prefix is case-insensitive. This function accepts a prefix, not an email
 * address, and returns the documented `hashSuffix` and `websites` fields.
 *
 * Requires an API key with a Pro or High RPM subscription. The `apiKey` option
 * is optional for proxies that supply the key. Direct requests without a key
 * fail.
 *
 * Compare suffixes locally against the intended email hash. HIBP requires
 * immediately discarding unrelated results without storing or further
 * processing them. An absent suffix means the email has no returned breaches;
 * sensitive and retired breaches are excluded. The API documents HTTP 200 for
 * every valid prefix; an unexpected 404 resolves to null as in other searches.
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
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request
 * (default: none)
 * @param {string} [options.userAgent] a custom User-Agent header
 * (default: `hibp <version>`)
 * @returns {Promise<BreachedAccountRangeResult[] | null>} a Promise resolving
 * to the range results (or null for an unexpected 404), or rejecting with an Error
 * @example
 * const match = (await breachedAccountRange("6B5917", { apiKey: "my-api-key" }))
 *   ?.find(({ hashSuffix }) => hashSuffix === "C6C0AADE0C085843D66E4944E108C4A4CD");
 * // match?.websites: ["Adobe", "Gawker", "Stratfor"] in the documented example
 * @see https://haveibeenpwned.com/API/v3#BreachesForHashRange
 * @see https://haveibeenpwned.com/TermsOfUse
 */
export function breachedAccountRange(
  prefix: string,
  options: {
    /**
     * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
     */
    apiKey?: string;
    /**
     * a custom base URL for the haveibeenpwned.com API endpoints
     * (default: `https://haveibeenpwned.com/api/v3`)
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
     * a custom User-Agent header (default: `hibp <version>`)
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
