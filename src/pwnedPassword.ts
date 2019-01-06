import JSSHA from 'jssha/src/sha1';
import pwnedPasswordRange from './pwnedPasswordRange';

/**
 * Fetches the number of times the the given password has been exposed in a
 * breach (0 indicating no exposure). The password is given in plain text, but
 * only the first 5 characters of its SHA-1 hash will be submitted to the API.
 *
 * @param {string} password a password in plain text
 * @returns {Promise<number>} a Promise which resolves to the number of times
 * the password has been exposed in a breach, or rejects with an Error
 * @example
 * pwnedPassword('f00b4r')
 *   .then(numPwns => {
 *     // truthy check or numeric condition
 *     if (numPwns) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#PwnedPasswords
 * @alias module:pwnedPassword
 */
const pwnedPassword = (password: string): Promise<number> => {
  const sha1 = new JSSHA('SHA-1', 'TEXT');
  sha1.update(password);
  const hash = sha1.getHash('HEX', { outputUpper: true });
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  return (
    pwnedPasswordRange(prefix)
      // filter to matching suffix
      .then(arr => arr.filter(item => item.suffix === suffix))
      // return count if match, 0 if not
      .then(arr => (arr[0] ? arr[0].count : 0))
  );
};

/**
 * A module for securely determining how many times a password has been exposed
 * in a breach.
 *
 * @module pwnedPassword
 * @example
 * import { pwnedPassword } from 'hibp';
 */
export default pwnedPassword;
