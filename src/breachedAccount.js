import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches breach data for the specified account.
 *
 * @param {string} account a username or email address
 * @param {Object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.truncate] truncate the results to only include
 * the name of each breach (default: false)
 * @returns {Promise} a Promise which resolves to an array of breach objects
 * (or null if no breaches were found), or rejects with an Error
 * @example
 * hibp.breachedAccount('foo')
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
 * hibp.breachedAccount('bar', { truncate: true })
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
 * hibp.breachedAccount('baz', { domain: 'adobe.com', truncate: true })
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
 * @function breachedAccount
 */
export default (account, options = {}) => {
  const endpoint = `/breachedaccount/${encodeURIComponent(account)}?`;
  const params = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  if (options.truncate) {
    params.push('truncateResponse=true');
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`);
};
