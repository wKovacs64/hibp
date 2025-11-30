import type { SubscribedDomain } from './api/haveibeenpwned/types.js';
import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * An object representing a subscribed domain.
 *
 * @typedef {object} SubscribedDomain
 * @property {string} DomainName - the fully qualified domain name
 * @property {(number|null)} PwnCount - total breached addresses at last search
 * @property {(number|null)} PwnCountExcludingSpamLists - breached addresses excluding spam lists at last search
 * @property {(number|null)} PwnCountExcludingSpamListsAtLastSubscriptionRenewal - breached addresses excluding spam lists at the time of last subscription renewal
 * @property {(string|null)} NextSubscriptionRenewal - ISO 8601 datetime when the current subscription ends
 */

/**
 * Fetches all subscribed domains for your HIBP account.
 *
 * Returns domains that have been successfully added to the Domain Search dashboard
 * after verifying control. Each domain includes metadata about breach counts and
 * the next renewal date, where available.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `subscribeddomains` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
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
 * @returns {Promise<SubscribedDomain[]>} a Promise which resolves to an array of
 * subscribed domain objects (an empty array if none), or rejects with an Error
 * @example
 * try {
 *   const data = await subscribedDomains({ apiKey: "my-api-key" });
 *   // ...
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await subscribedDomains({
 *     baseUrl: "https://my-hibp-proxy:8080",
 *   });
 *   // ...
 * } catch (err) {
 *   // ...
 * }
 */
export function subscribedDomains(
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
): Promise<SubscribedDomain[]> {
  const { apiKey, baseUrl, timeoutMs, signal, userAgent } = options;
  const endpoint = '/subscribeddomains';

  return fetchFromApi(endpoint, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<SubscribedDomain[]>;
}
