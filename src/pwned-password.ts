import JSSHA from 'jssha/dist/sha1';
import { pwnedPasswordRange } from './pwned-password-range.js';

/**
 * Fetches the number of times the the given password has been exposed in a
 * breach (0 indicating no exposure). The password is given in plain text, but
 * only the first 5 characters of its SHA-1 hash will be submitted to the API.
 *
 * @param {string} password a password in plain text
 * @param {object} [options] a configuration object
 * @param {boolean} [options.addPadding] ask the remote API to add padding to
 * the response to obscure the password prefix (default: `false`)
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<number>} a Promise which resolves to the number of times
 * the password has been exposed in a breach, or rejects with an Error
 * @example
 * try {
 *   const numPwns = await pwnedPassword("f00b4r");
 *   // truthy check or numeric condition
 *   if (numPwns) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @see https://haveibeenpwned.com/api/v3#PwnedPasswords
 */
export async function pwnedPassword(
  password: string,
  options: {
    /**
     * ask the remote API to add padding to the response to obscure the password
     * prefix (default: `false`)
     */
    addPadding?: boolean;
    /**
     * a custom base URL for the haveibeenpwned.com API endpoints (default:
     * `https://haveibeenpwned.com/api/v3`)
     */
    baseUrl?: string;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<number> {
  /* eslint-disable */
  // @ts-expect-error: JSSHA types are busted
  const sha1 = new JSSHA('SHA-1', 'TEXT');
  sha1.update(password);
  const hash = sha1.getHash('HEX', { outputUpper: true });
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const range = await pwnedPasswordRange(prefix, options);
  return range[suffix] || 0;
  /* eslint-enable */
}
