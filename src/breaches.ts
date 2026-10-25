import type { Breach } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * Fetches all breach events in the system. Supports the
 * [public API's domain and spam-list filters](https://haveibeenpwned.com/API/v3#AllBreaches).
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.isSpamList] true for only spam-list breaches, false
 * for only non-spam-list breaches (default: no spam-list filter)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<Breach[]>} a Promise which resolves to an array of breach
 * objects (an empty array if no breaches were found), or rejects with an Error
 * @example
 * try {
 *   const data = await breaches();
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
 *   const data = await breaches({ domain: "adobe.com", isSpamList: false });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function breaches(
  options: {
    /**
     * a domain by which to filter the results (default: all domains)
     */
    domain?: string;
    /**
     * true for only spam-list breaches, false for only non-spam-list breaches
     * (default: no spam-list filter)
     */
    isSpamList?: boolean;
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
): Promise<Breach[]> {
  const { domain, isSpamList, baseUrl, timeoutMs, signal, userAgent } = options;
  const endpoint = "/breaches?";
  const params: string[] = [];

  if (domain) {
    params.push(`domain=${encodeURIComponent(domain)}`);
  }

  if (isSpamList !== undefined) {
    params.push(`isSpamList=${isSpamList}`);
  }

  return fetchFromApi(`${endpoint}${params.join("&")}`, {
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<Breach[]>;
}
