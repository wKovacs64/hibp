import { pwnedPasswordRange } from "./pwned-password-range.js";

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
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
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
     * timeout for the request in milliseconds (default: none)
     */
    timeoutMs?: number;
    /**
     * an AbortSignal to cancel the request (default: none)
     */
    signal?: AbortSignal;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<number> {
  const [prefix, suffix] = await getPasswordHashParts(password);
  const range = await pwnedPasswordRange(prefix, options);
  return range[suffix] || 0;
}

async function getPasswordHashParts(password: string) {
  if (typeof crypto === "object" && crypto.subtle) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    return [hashHex.slice(0, 5), hashHex.slice(5)] as const;
  }

  throw new Error("The Web Crypto API is not available in this environment.");
}
