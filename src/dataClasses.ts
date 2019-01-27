import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';

/**
 * Fetches all data classes in the system.
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<string[]> | Promise<null>)} a Promise which resolves to an
 * array of strings (or null if no data classes were found), or rejects with an
 * Error
 * @example
 * dataClasses()
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
 * @alias module:dataClasses
 */
const dataClasses = (
  options: { baseUrl?: string; userAgent?: string } = {},
): Promise<string[] | null> =>
  fetchFromApi('/dataclasses', options) as Promise<string[] | null>;

/**
 * A module for retrieving all data classes in the system.
 *
 * @module dataClasses
 * @example
 * import { dataClasses } from 'hibp';
 */
export default dataClasses;
