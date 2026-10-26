import type { Breach } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * An object representing a full breach.
 *
 * Returned by `breach`, `breaches`, `latestBreach`, and by `breachedAccount`
 * and `search` with `truncate: false`.
 *
 * `Attribution` and `DisclosureUrl` may be null. See the
 * [breach model](https://haveibeenpwned.com/API/v3#BreachModel) and the
 * [breach catalogue](https://haveibeenpwned.com/api/v3/breaches).
 *
 * @typedef {object} Breach
 * @property {string} Name
 * @property {string} Title
 * @property {string} Domain
 * @property {string} BreachDate
 * @property {string} AddedDate
 * @property {string} ModifiedDate
 * @property {number} PwnCount
 * @property {string} Description
 * @property {string[]} DataClasses
 * @property {boolean} IsVerified
 * @property {boolean} IsFabricated
 * @property {boolean} IsSensitive
 * @property {boolean} IsRetired
 * @property {boolean} IsSpamList
 * @property {boolean} IsMalware
 * @property {boolean} IsStealerLog whether the breach is sourced from stealer logs
 * @property {boolean} IsSubscriptionFree
 * @property {string} LogoPath
 * @property {(string | null)} Attribution credit requested by the data provider, or null
 * @property {(string | null)} DisclosureUrl breach disclosure URL, or null
 */

/**
 * Fetches data for a specific breach event.
 *
 * @param {string} breachName the name of a breach in the system
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Breach>|Promise<null>)} a Promise which resolves to an
 * object representing a breach (or null if no breach was found), or rejects
 * with an Error
 * @example
 * try {
 *   const data = await breach("Adobe");
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function breach(
  breachName: string,
  options: {
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
): Promise<Breach | null> {
  return fetchFromApi(
    `/breach/${encodeURIComponent(breachName)}`,
    options,
  ) as Promise<Breach | null>;
}
