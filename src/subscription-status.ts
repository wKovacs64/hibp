import type { SubscriptionStatus } from './api/haveibeenpwned/types.js';
import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api.js';

/**
 * An object representing the status of your HIBP subscription.
 *
 * @typedef {object} SubscriptionStatus
 * @property {string} SubscriptionName
 * @property {string} Description
 * @property {string} SubscribedUntil
 * @property {number} Rpm
 * @property {number} DomainSearchMaxBreachedAccounts
 * @property {boolean} IncludesStealerLogs
 */

/**
 * Fetches the current status of your HIBP subscription (API key).
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `subscription/status` endpoint.
 * The `apiKey` option here is not explicitly required, but direct requests made
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
 * @returns {Promise<SubscriptionStatus>} a Promise which resolves to a
 * subscription status object, or rejects with an Error
 * @example
 * try {
 *   const data = await subscriptionStatus({ apiKey: "my-api-key" });
 *   // ...
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await subscriptionStatus({
 *     baseUrl: "https://my-hibp-proxy:8080",
 *   });
 *   // ...
 * } catch (err) {
 *   // ...
 * }
 */
export async function subscriptionStatus(
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
) {
  const endpoint = '/subscription/status';

  return fetchFromApi(endpoint, options) as Promise<SubscriptionStatus>;
}
