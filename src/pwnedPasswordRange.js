import fetchFromApi from './internal/pwnedpasswords/fetchFromApi';

/**
 * Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.
 *
 * When a password hash with the same first 5 characters is found in the Pwned
 * Passwords repository, the API will respond with an HTTP 200 and include the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set.
 * This function parses the response and returns a more structured JSON format
 * meant to be consumed with map and filter operators.
 *
 * @param {string} prefix the first 5 characters of a SHA-1 password hash (case
 * insensitive)
 * @returns {Promise} a Promise which resolves to a JSON list of objects each
 * containing the `suffix` that when matched with the prefix composes the
 * complete hash, and a `count` of how many times it appears in the breached
 * password data set, or rejects with an Error
 *
 * @example
 * pwnedPasswordRange('21BD1')
 *   .then(arr => arr.filter(
 *     item => item.count > 5
 *   ))
 *   .catch((err) => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 * @alias module:pwnedPasswordRange
 */
const pwnedPasswordRange = prefix =>
  fetchFromApi(`/range/${encodeURIComponent(prefix)}`)
    // each line to an array
    .then(res => res.split('\n'))
    // each line split into suffix and count
    .then(arr =>
      arr.map(item => ({
        suffix: item.split(':')[0],
        count: parseInt(item.split(':')[1], 10),
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
