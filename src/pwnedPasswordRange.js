import fetchFromApi from './internal/pwnedpasswords/fetchFromApi';

/**
 * Fetches the SHA-1 suffixes for the given 5-character SHA-1 prefix.
 *
 * When a password hash with the same first 5 characters is found in the Pwned
 * Passwords repository, the API will respond with an HTTP 200 and include the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set. The API consumer can then
 * search the results of the response for the presence of their source hash and
 * if not found, the password does not exist in the data set.
 *
 * @param {string} prefix the first 5 characters of a SHA-1 password hash (case
 * insensitive)
 * @returns {Promise} a Promise which resolves to plain text containing the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set if the given password has been
 * exposed in a breach, or rejects with an Error
 * @example
 * pwnedPasswordRange('21BD1')
 *   .then((suffixes) => {
 *     if (suffixes.includes('0018A45C4D1DEF81644B54AB7F969B88D65')) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 * @alias module:pwnedPasswordRange
 */
const pwnedPasswordRange = prefix =>
  fetchFromApi(`/range/${encodeURIComponent(prefix)}`);

/**
 * A module for determining if a password has been exposed in a breach without
 * exposing the password.
 *
 * @module pwnedPasswordRange
 * @example
 * import { pwnedPasswordRange } from 'hibp';
 */
export default pwnedPasswordRange;
