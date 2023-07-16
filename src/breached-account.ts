import type { Breach } from './api/haveibeenpwned/types';
import { fetchFromApi } from './api/haveibeenpwned/fetch-from-api';

/**
 * Fetches breach data for a specific account.
 *
 * ***Warning (July 18, 2019):***
 *
 * `haveibeenpwned.com` now requires an API key from
 * https://haveibeenpwned.com/API/Key for the `breachedaccount` endpoint. The
 * `apiKey` option here is not explicitly required, but direct requests made
 * without it (that is, without specifying a `baseUrl` to a proxy that inserts a
 * valid API key on your behalf) will fail.
 *
 * @param {string} account a username or email address
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.includeUnverified] include "unverified" breaches in
 * the results (default: true)
 * @param {boolean} [options.truncate] truncate the results to only include
 * the name of each breach (default: true)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Breach[]> | Promise<null>)} a Promise which resolves to an
 * array of breach objects (or null if no breaches were found), or rejects with
 * an Error
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
  options: {
    apiKey?: string;
    domain?: string;
    includeUnverified?: boolean;
    truncate?: boolean;
    baseUrl?: string;
    userAgent?: string;
  } = {
    includeUnverified: true,
    truncate: true,
  },
): Promise<Breach[] | null> {
  const endpoint = `/breachedaccount/${encodeURIComponent(account)}?`;
  const params: string[] = [];
  if (options.domain) {
    params.push(`domain=${encodeURIComponent(options.domain)}`);
  }
  if (options.includeUnverified === false) {
    params.push('includeUnverified=false');
  }
  if (options.truncate === false) {
    params.push('truncateResponse=false');
  }
  return fetchFromApi(`${endpoint}${params.join('&')}`, {
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
    userAgent: options.userAgent,
  }) as Promise<Breach[] | null>;
}
