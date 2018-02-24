import fetchFromApi from './internal/pwnedpasswords/fetchFromApi';

/**
 * Fetches the pwned status for the given password, indicating whether or not it
 * has been previously exposed in a breach. Passwords can be plain text or a
 * SHA1 hash. The remote API will automatically attempt to discern between the
 * two, but in the case where the password you wish to check is actually a
 * plain text string containing a hash and you don't want the API to treat it as
 * a hash, you can override the auto detection behavior by setting the isAHash
 * option to true.
 *
 * @param {string} password a password (plain text string or SHA1 hash)
 * @param {Object} [options] a configuration object
 * @param {boolean} [options.isAHash] the pre-hashed password is a hash
 * (default: false)
 * @returns {Promise} a Promise which resolves to true if the given password has
 * been exposed in a breach (or false if not), or rejects with an Error
 * @example
 * pwnedPassword('f00b4r')
 *   .then((isPwned) => {
 *     if (isPwned) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @example
 * pwnedPassword('5e447cbeee6f483bf88c461d76994b0063ae81d5')
 *   .then((isPwned) => {
 *     if (isPwned) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @example
 * pwnedPassword('5e447cbeee6f483bf88c461d76994b0063ae81d5', { isAHash: true })
 *   .then((isPwned) => {
 *     if (isPwned) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#PwnedPasswords
 * @alias module:pwnedPassword
 */
const pwnedPassword = (password, options = {}) => {
  const endpoint = `/pwnedpassword/${encodeURIComponent(password)}?`;
  const params = [];
  if (options.isAHash) {
    params.push('originalPasswordIsAHash=true');
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`).then(
    pwned => pwned !== null,
  );
};

/**
 * A module for determining if a password has been exposed in a breach.
 *
 * @module pwnedPassword
 * @example
 * import { pwnedPassword } from 'hibp';
 */
export default pwnedPassword;
