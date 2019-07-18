import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';
import { Breach } from './types/remote-api.d';

/**
 * Fetches breach data for a specific account.
 *
 * ***Warning:***
 *
 * As of January, 2019, `haveibeenpwned.com` has started blocking requests to
 * the `breachedaccount` endpoint when originating from within a browser (based
 * on the `User-Agent` field of the request headers). To use this function in a
 * browser, you will likely have to proxy your request through a server of your
 * own. The `baseUrl` option was added to facilitate this workaround.
 *
 * @param {string} account a username or email address
 * @param {object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.includeUnverified] include "unverified" breaches in
 * the results (default: true)
 * @param {boolean} [options.truncate] truncate the results to only include
 * the name of each breach (default: true)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Breach[]> | Promise<null>)} a Promise which resolves to an
 * array of breach objects (or null if no breaches were found), or rejects with
 * an Error
 * @example
 * breachedAccount('foo')
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
 * breachedAccount('bar', {
 *   includeUnverified: false,
 *   baseUrl: 'https://my-hibp-proxy:8080',
 * })
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
 * breachedAccount('baz', {
 *   domain: 'adobe.com',
 *   truncate: false,
 *   userAgent: 'my-app 1.0'
 * })
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
 * @alias module:breachedAccount
 */
const breachedAccount = (
  account: string,
  options: {
    domain?: string;
    includeUnverified?: boolean;
    truncate?: boolean;
    baseUrl?: string;
    userAgent?: string;
  } = {
    includeUnverified: true,
    truncate: true,
  },
): Promise<Breach[] | null> => {
  const endpoint = `/breachedaccount/${encodeURIComponent(account)}?`;
  const params = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  if (options.includeUnverified === false) {
    params.push('includeUnverified=false');
  }
  if (options.truncate === false) {
    params.push('truncateResponse=false');
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`, {
    baseUrl: options.baseUrl,
    userAgent: options.userAgent,
  }) as Promise<Breach[] | null>;
};

/**
 * A module for retrieving breach data for a specific account.
 *
 * @module breachedAccount
 * @example
 * import { breachedAccount } from 'hibp';
 */
export default breachedAccount;
