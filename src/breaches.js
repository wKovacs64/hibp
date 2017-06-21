import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches all breach events in the system.
 *
 * @param {Object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @returns {Promise} a Promise which resolves to an array of breach objects
 * (an empty array if no breaches were found), or rejects with an Error
 * @example
 * breaches()
 *   .then((data) => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @example
 * breaches({ domain: 'adobe.com' })
 *   .then((data) => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @alias module:breaches
 */
const breaches = (options = {}) => {
  const endpoint = '/breaches?';
  const params = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`);
};

/**
 * A module for retrieving all breach events in the system.
 *
 * @module breaches
 * @example
 * import { breaches } from 'hibp';
 */
export default breaches;
