import breachedAccount from './breachedAccount';
import pasteAccount from './pasteAccount';

/**
 * Fetches all breaches and all pastes associated with the provided account
 * (email address or username). Note that the remote API does not support
 * querying pastes by username (only email addresses), so in the event the
 * provided account is not a valid email address, only breach data is queried
 * and the "pastes" field of the resulting object will always be null. This is
 * exactly how searching via the current web interface behaves, which this
 * convenience method is designed to mimic.
 *
 * @param {string} account an email address or username
 * @param {Object} [breachOptions] a configuration object pertaining to
 * breach queries
 * @param {string} [breachOptions.domain] a domain by which to filter the
 * results (default: all domains)
 * @param {boolean} [breachOptions.truncate] truncate the results to only
 * include the name of each breach (default: false)
 * @returns {Promise} a Promise which resolves to an object containing a
 * "breaches" key (which can be null or an array of breach objects) and a
 * "pastes" key (which can be null or an array of paste objects), or rejects
 * with an Error
 * @example
 * search('foo')
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
 * search('nobody@nowhere.com', { truncate: true })
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
const search = (account, breachOptions = {}) =>
  Promise.all([
    breachedAccount(account, breachOptions),
    // This email regex is garbage but it seems to be what the API uses:
    /^.+@.+$/.test(account) ? pasteAccount(account) : null,
  ]).then(breachesAndPastes => ({
    breaches: breachesAndPastes[0],
    pastes: breachesAndPastes[1],
  }));

/**
 * A module for searching all breach and paste data associated with a specific
 * account (email address or username).
 *
 * @module search
 * @example
 * import { search } from 'hibp';
 */
export default search;
