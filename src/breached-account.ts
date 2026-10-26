import type { Breach, TruncatedBreach } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * A name-only breach returned by a truncated account search.
 *
 * @typedef {object} TruncatedBreach
 * @property {string} Name
 */

// Breaches returned by an account search with the given `truncate` option.
export type AccountBreaches<Truncate extends boolean = boolean> =
  Truncate extends false ? Breach[] : TruncatedBreach[];

interface BreachedAccountOptions {
  /**
   * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
   */
  apiKey?: string;
  /**
   * a domain by which to filter the results (default: all domains)
   */
  domain?: string;
  /**
   * include "unverified" breaches in the results (default: true)
   */
  includeUnverified?: boolean;
  /**
   * timeout for the request in milliseconds (default: none)
   */
  timeoutMs?: number;
  /**
   * an AbortSignal to cancel the request (default: none)
   */
  signal?: AbortSignal;
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
   * a custom string to send as the User-Agent field in the request headers
   * (default: `hibp <version>`)
   */
  userAgent?: string;
}

/**
 * Fetches breach data for a specific account.
 *
 * Results contain only `Name` by default (`TruncatedBreach`). Pass
 * `truncate: false` to receive full `Breach` objects. A dynamic boolean produces
 * a union of both result types. Either result can be null when no breaches are
 * found. See https://haveibeenpwned.com/API/v3#BreachesForAccount.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breachedaccount` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it will fail (unless you specify a `baseUrl` to a proxy that inserts
 * a valid API key on your behalf).
 *
 * @param {string} account a username or email address
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.includeUnverified] include "unverified" breaches in
 * the results (default: true)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {boolean} [options.truncate] truncate the results to only include
 * the name of each breach (default: true)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<TruncatedBreach[] | Breach[] | null>} a Promise which
 * resolves to name-only breaches by default, full breaches with
 * `truncate: false`, or null if no breaches were found; rejects with an Error
 * @example
 * try {
 *   const data = await breachedAccount("foo", { apiKey: "my-api-key" });
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
 *   const data = await breachedAccount("bar", {
 *     includeUnverified: false,
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
 * @example
 * try {
 *   const data = await breachedAccount("baz", {
 *     apiKey: "my-api-key",
 *     domain: "adobe.com",
 *     truncate: false,
 *     userAgent: "my-app 1.0",
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
export function breachedAccount(
  account: string,
  options?: BreachedAccountOptions & { truncate?: true },
): Promise<AccountBreaches<true> | null>;
export function breachedAccount(
  account: string,
  options: BreachedAccountOptions & { truncate: false },
): Promise<AccountBreaches<false> | null>;
export function breachedAccount(
  account: string,
  options?: BreachedAccountOptions,
): Promise<AccountBreaches | null>;
export function breachedAccount(
  account: string,
  options: BreachedAccountOptions = {},
): Promise<AccountBreaches | null> {
  const {
    apiKey,
    domain,
    includeUnverified = true,
    timeoutMs,
    signal,
    truncate = true,
    baseUrl,
    userAgent,
  } = options;
  const endpoint = `/breachedaccount/${encodeURIComponent(account)}?`;
  const params: string[] = [];

  if (domain) {
    params.push(`domain=${encodeURIComponent(domain)}`);
  }

  if (!includeUnverified) {
    params.push("includeUnverified=false");
  }

  if (!truncate) {
    params.push("truncateResponse=false");
  }

  return fetchFromApi(`${endpoint}${params.join("&")}`, {
    apiKey,
    baseUrl,
    timeoutMs,
    signal,
    userAgent,
  }) as Promise<AccountBreaches | null>;
}
