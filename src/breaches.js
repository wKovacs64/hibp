import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches all breached sites in the system.
 *
 * @param {Object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @returns {Promise} a Promise which resolves to an array of breach objects
 * (an empty array if no breaches were found), or rejects with an Error
 * @example
 * hibp.breaches()
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
 * hibp.breaches({ domain: 'adobe.com' })
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
 * @memberof hibp
 * @function breaches
 */
export default (options = {}) => {
  const endpoint = '/breaches?';
  const params = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`);
};
