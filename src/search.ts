import type { Breach, Paste } from "./api/haveibeenpwned/types.js";
import { breachedAccount } from "./breached-account.js";
import { pasteAccount } from "./paste-account.js";

export interface SearchResults {
  breaches: Breach[] | null;
  pastes: Paste[] | null;
}

/**
 * An object representing search results.
 *
 * @typedef {object} SearchResults
 * @property {(Breach[] | null)} breaches
 * @property {(Paste[] | null)} pastes
 */

/**
 * Fetches all breaches and all pastes associated with the provided account
 * (email address or username). Note that the remote API does not support
 * querying pastes by username (only email addresses), so in the event the
 * provided account is not a valid email address, only breach data is queried
 * and the "pastes" field of the resulting object will always be null. This is
 * exactly how searching via the current web interface behaves, which this
 * convenience method is designed to mimic.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breachedaccount` and
 * `pasteaccount` endpoints. The `apiKey` option here is not explicitly
 * required, but direct requests made without it will fail (unless you specify a
 * `baseUrl` to a proxy that inserts a valid API key on your behalf).
 *
 * @param {string} account an email address or username
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.domain] a domain by which to filter the breach
 * results (default: all domains)
 * @param {boolean} [options.truncate] truncate the breach results to only
 * include the name of each breach (default: true)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the
 * User-Agent field in the request headers (default: `hibp <version>`)
 * @returns {Promise<SearchResults>} a Promise which resolves to an object
 * containing a "breaches" key (which can be null or an array of breach objects)
 * and a "pastes" key (which can be null or an array of paste objects), or
 * rejects with an Error
 * @example
 * try {
 *   const data = await search("foo", { apiKey: "my-api-key" });
 *   if (data.breaches || data.pastes) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const data = await search("nobody@nowhere.com", {
 *     baseUrl: "https://my-hibp-proxy:8080",
 *     truncate: false,
 *   });
 *   if (data.breaches || data.pastes) {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * } catch (err) {
 *   // ...
 * }
 * @see https://haveibeenpwned.com/
 */
export async function search(
  account: string,
  options: {
    /**
     * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
     */
    apiKey?: string;
    /**
     * a domain by which to filter the results (default: all domains)
     */
    domain?: string;
    /**
     * truncate the results to only include the name of each breach (default:
     * true)
     */
    truncate?: boolean;
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
): Promise<SearchResults> {
  const {
    apiKey,
    domain,
    truncate = true,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  } = options;

  const [breaches, pastes] = await Promise.all([
    breachedAccount(account, {
      apiKey,
      domain,
      truncate,
      baseUrl,
      timeoutMs,
      signal,
      userAgent,
    }),
    // This email regex is garbage but it seems to be what the API uses:
    /^.+@.+$/.test(account)
      ? pasteAccount(account, { apiKey, baseUrl, timeoutMs, signal, userAgent })
      : null,
  ]);

  return { breaches, pastes };
}
