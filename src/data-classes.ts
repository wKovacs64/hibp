import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api';

/**
 * Fetches all data classes in the system.
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<string[]> | Promise<null>)} a Promise which resolves to an
 * array of strings (or null if no data classes were found), or rejects with an
 * Error
 * @example
 * try {
 *   const data = await dataClasses();
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function dataClasses(
  options: { baseUrl?: string; userAgent?: string } = {},
): Promise<string[] | null> {
  return fetchFromApi('/dataclasses', options) as Promise<string[] | null>;
}
