import fetchFromApi from './internal/pwnedpasswords/fetchFromApi';

export interface PwnedPasswordSuffix {
  suffix: string;
  count: number;
}

/**
 * An object representing an exposed password hash suffix (corresponding to a
 * given hash prefix) and how many times it occurred in the Pwned Passwords
 * repository.
 *
 * @typedef {object} PwnedPasswordSuffix
 * @property {string} suffix
 * @property {number} count
 */
/**
 * Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.
 *
 * When a password hash with the same first 5 characters is found in the Pwned
 * Passwords repository, the API will respond with an HTTP 200 and include the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set. This function parses the
 * response and returns a more structured format.
 *
 * @param {string} prefix the first 5 characters of a SHA-1 password hash (case
 * insensitive)
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<PwnedPasswordSuffix[]>} a Promise which resolves to an
 * array of objects, each containing the `suffix` that when matched with the
 * prefix composes the complete hash, and a `count` of how many times it appears
 * in the breached password data set, or rejects with an Error
 *
 * @example
 * pwnedPasswordRange('5BAA6')
 *   .then(results => {
 *     // results will have the following shape:
 *     // [
 *     //   { suffix: "003D68EB55068C33ACE09247EE4C639306B", count: 3 },
 *     //   { suffix: "012C192B2F16F82EA0EB9EF18D9D539B0DD", count: 1 },
 *     //   ...
 *     // ]
 *   })
 * @example
 * const suffix = '1E4C9B93F3F0682250B6CF8331B7EE68FD8';
 * pwnedPasswordRange('5BAA6')
 *   // filter to matching suffix
 *   .then(results => results.filter(row => row.suffix === suffix))
 *   // return count if match, 0 if not
 *   .then(results => (results[0] ? results[0].count : 0))
 *   .catch(err => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 * @alias module:pwnedPasswordRange
 */
const pwnedPasswordRange = (
  prefix: string,
  options: { baseUrl?: string; userAgent?: string } = {},
): Promise<PwnedPasswordSuffix[]> =>
  fetchFromApi(`/range/${encodeURIComponent(prefix)}`, options)
    // create array from lines of text in response body
    .then(data => data.split('\n'))
    // convert into array of objects containing suffix and count for each line
    .then(results =>
      results.map(row => ({
        suffix: row.split(':')[0],
        count: parseInt(row.split(':')[1], 10),
      })),
    );

/**
 * A module for determining if a password's SHA-1 hash has been exposed in a
 * breach.
 *
 * @module pwnedPasswordRange
 * @example
 * import { pwnedPasswordRange } from 'hibp';
 */
export default pwnedPasswordRange;
