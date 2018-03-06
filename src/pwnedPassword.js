import sha1 from 'js-sha1';
import pwnedPasswordRange from './pwnedPasswordRange';

/**
 * Fetches the pwned status for the given password, indicating whether or not it
 * has been previously exposed in a breach. The password is given in plaintext,
 * but only the first 5 characters of its SHA1 hash will be sumitted to the API.
 * The final evalution will be done locally.
 *
 * @param {string} password a password in plaintext
 * @returns {Promise} a Promise which resolves to the number of times the password has
 * been breached, or rejects with an Error
 * @example
 * pwnedPassword('f00b4r')
 *   .then((numPwns) => {
 *     // truthy check or numeric condition
 *     if (numPwns) {
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
const pwnedPassword = password => {
  const hash = sha1(password).toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  return (
    pwnedPasswordRange(prefix)
      // each line to an array
      .then(res => res.split('\n'))
      // each line split into suffix and count
      .then(arr =>
        arr.map(item => ({
          suffix: item.split(':')[0],
          count: parseInt(item.split(':')[1], 10),
        })),
      )
      // filter to matching suffix
      .then(arr => arr.filter(item => item.suffix === suffix))
      // return count if match, 0 if not
      .then(arr => (arr[0] ? arr[0].count : 0))
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
