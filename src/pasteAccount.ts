import { Paste } from './api/haveibeenpwned/types';
import { fetchFromApi } from './api/haveibeenpwned';

/**
 * An object representing a paste.
 *
 * @typedef {object} Paste
 * @property {string} Id
 * @property {string} Source
 * @property {string} Title
 * @property {string} Date
 * @property {number} EmailCount
 */

/**
 * Fetches paste data for a specific account (email address).
 *
 * ***Warning (July 18, 2019):***
 *
 * `haveibeenpwned.com` now requires an API key from
 * https://haveibeenpwned.com/API/Key for the `pasteaccount` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it (that is, without specifying a `baseUrl` to a proxy that inserts a
 * valid API key on your behalf) will fail.
 *
 * @param {string} email the email address to query
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Paste[]> | Promise<null>)} a Promise which resolves to an
 * array of paste objects (or null if no pastes were found), or rejects with an
 * Error
 * @example
 * pasteAccount('foo@bar.com', { apiKey: 'my-api-key' })
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 */
export function pasteAccount(
  email: string,
  options: { apiKey?: string; baseUrl?: string; userAgent?: string } = {},
): Promise<Paste[] | null> {
  return fetchFromApi(`/pasteaccount/${encodeURIComponent(email)}`, {
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
    userAgent: options.userAgent,
  }) as Promise<Paste[] | null>;
}
