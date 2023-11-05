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
 */

/**
 * Fetches the current status of your HIBP subscription (API key).
 *
 * @param {string} apiKey an API key from https://haveibeenpwned.com/API/Key
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<SubscriptionStatus>} a Promise which resolves to a
 * subscription status object, or rejects with an Error
 * @example
 * try {
 *   const data = await subscriptionStatus("my-api-key");
 *   // ...
 * } catch (err) {
 *   // ...
 * }
 */
export async function subscriptionStatus(
  apiKey: string,
  options: {
    baseUrl?: string;
    userAgent?: string;
  } = {},
) {
  const endpoint = '/subscription/status';

  return fetchFromApi(endpoint, {
    apiKey,
    ...options,
  }) as Promise<SubscriptionStatus>;
}
