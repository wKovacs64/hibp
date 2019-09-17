import { Breach } from './api/haveibeenpwned/types';
import fetchFromApi from './api/haveibeenpwned/fetchFromApi';

/**
 * Fetches all breach events in the system.
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<Breach[]>} a Promise which resolves to an array of breach
 * objects (an empty array if no breaches were found), or rejects with an Error
 * @example
 * breaches()
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
 * @example
 * breaches({ domain: 'adobe.com' })
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
 * @alias module:breaches
 */
const breaches = (
  options: {
    domain?: string;
    baseUrl?: string;
    userAgent?: string;
  } = {},
): Promise<Breach[]> => {
  const endpoint = '/breaches?';
  const params = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`, {
    baseUrl: options.baseUrl,
    userAgent: options.userAgent,
  }) as Promise<Breach[]>;
};

/**
 * A module for retrieving all breach events in the system.
 *
 * @module breaches
 * @example
 * import { breaches } from 'hibp';
 */
export default breaches;
