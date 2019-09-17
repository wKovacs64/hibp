import { Breach, Paste } from './api/haveibeenpwned/types';
import breachedAccount from './breachedAccount';
import pasteAccount from './pasteAccount';

export interface SearchResults {
  breaches: Breach[] | null;
  pastes: Paste[] | null;
}

/**
 * An object representing search results.
 *
 * @typedef {object} SearchResults
 * @property {(Breach[] | null)} breaches
 * @property {(Paste[] | null)} pastes
 */
/**
 * Fetches all breaches and all pastes associated with the provided account
 * (email address or username). Note that the remote API does not support
 * querying pastes by username (only email addresses), so in the event the
 * provided account is not a valid email address, only breach data is queried
 * and the "pastes" field of the resulting object will always be null. This is
 * exactly how searching via the current web interface behaves, which this
 * convenience method is designed to mimic.
 *
 * ***Warning (July 18, 2019):***
 *
 * `haveibeenpwned.com` now requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breachedaccount` and
 * `pasteaccount` endpoints. The  `apiKey` option here is not explicitly
 * required, but direct requests made without it (that is, without specifying a
 * `baseUrl` to a proxy that inserts a valid API key on your behalf) will fail.
 *
 * @param {string} account an email address or username
 * @param {object} [breachOptions] a configuration object pertaining to breach
 * queries
 * @param {string} [breachOptions.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key
 * @param {string} [breachOptions.domain] a domain by which to filter the
 * results (default: all domains)
 * @param {boolean} [breachOptions.truncate] truncate the results to only
 * include the name of each breach (default: true)
 * @param {string} [breachOptions.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [breachOptions.userAgent] a custom string to send as the
 * User-Agent field in the request headers (default: `hibp <version>`)
 * @returns {Promise<SearchResults>} a Promise which resolves to an object
 * containing a "breaches" key (which can be null or an array of breach objects)
 * and a "pastes" key (which can be null or an array of paste objects), or
 * rejects with an Error
 * @example
 * search('foo', { apiKey: 'my-api-key' })
 *   .then(data => {
 *     if (data.breaches || data.pastes) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @example
 * search('nobody@nowhere.com', { apiKey: 'my-api-key', truncate: false })
 *   .then(data => {
 *     if (data.breaches || data.pastes) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 *
 * @see https://haveibeenpwned.com/
 * @alias module:search
 */
const search = (
  account: string,
  breachOptions: {
    apiKey?: string;
    domain?: string;
    truncate?: boolean;
    baseUrl?: string;
    userAgent?: string;
  } = {
    truncate: true,
  },
): Promise<SearchResults> => {
  const { apiKey, baseUrl, userAgent } = breachOptions;

  return Promise.all([
    breachedAccount(account, breachOptions),
    // This email regex is garbage but it seems to be what the API uses:
    /^.+@.+$/.test(account)
      ? pasteAccount(account, { apiKey, baseUrl, userAgent })
      : null,
  ]).then(([breaches, pastes]) => ({
    breaches,
    pastes,
  }));
};
/**
 * A module for searching all breach and paste data associated with a specific
 * account (email address or username).
 *
 * @module search
 * @example
 * import { search } from 'hibp';
 */
export default search;
