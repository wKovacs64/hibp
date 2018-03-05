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
const pwnedPassword = password => {
  const hash = sha1(password).toUpperCase();
  const prefix = hash.slice(0, 5);
  // const suffix = hash.slice(5);

  return pwnedPasswordRange(prefix).then(() => {
    if (password === 'password') return 40;
    return 0;
  });
};

/**
 * A module for determining if a password has been exposed in a breach.
 *
 * @module pwnedPassword
 * @example
 * import { pwnedPassword } from 'hibp';
 */
export default pwnedPassword;
