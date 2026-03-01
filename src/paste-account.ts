import type { Paste } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * An object representing a paste.
 *
 * @typedef {object} Paste
 * @property {string} Id
 * @property {string} Source
 * @property {string} Title
 * @property {string} Date
 * @property {number} EmailCount
 */

/**
 * Fetches paste data for a specific account (email address).
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `pasteaccount` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * @param {string} email the email address to query
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Paste[]> | Promise<null>)} a Promise which resolves to an
 * array of paste objects (or null if no pastes were found), or rejects with an
 * Error
 * @example
 * try {
 *   const data = await pasteAccount("foo@bar.com", { apiKey: "my-api-key" });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await pasteAccount("foo@bar.com", {
 *     baseUrl: "https://my-hibp-proxy:8080",
 *   });
 *   if (data) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 */
export function pasteAccount(
  email: string,
  options: {
    /**
     * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
     */
    apiKey?: string;
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
): Promise<Paste[] | null> {
  return fetchFromApi(
    `/pasteaccount/${encodeURIComponent(email)}`,
    options,
  ) as Promise<Paste[] | null>;
}
