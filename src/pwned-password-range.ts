import { fetchFromApi } from './api/pwnedpasswords/fetch-from-api.js';

export type PwnedPasswordSuffixes = Record<string, number>;

/**
 * An object mapping an exposed password hash suffix (corresponding to a given
 * hash prefix) to how many times it occurred in the Pwned Passwords repository.
 *
 * @typedef {Object.<string, number>} PwnedPasswordSuffixes
 */

/**
 * Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.
 *
 * When a password hash with the same first 5 characters is found in the Pwned
 * Passwords repository, the API will respond with an HTTP 200 and include the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set. This function parses the
 * response and returns a more structured format.
 *
 * @param {string} prefix the first 5 characters of a SHA-1 password hash (case
 * insensitive)
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @param {boolean} [options.addPadding] ask the remote API to add padding to
 * the response to obscure the password prefix (default: `false`)
 * @returns {Promise<PwnedPasswordSuffixes>} a Promise which resolves to an
 * object mapping the `suffix` that when matched with the prefix composes the
 * complete hash, to the `count` of how many times it appears in the breached
 * password data set, or rejects with an Error
 *
 * @example
 * try {
 *   const results = await pwnedPasswordRange("5BAA6");
 *   // results will have the following shape:
 *   // {
 *   //   "003D68EB55068C33ACE09247EE4C639306B": 3,
 *   //   "012C192B2F16F82EA0EB9EF18D9D539B0DD": 1,
 *   //   ...
 *   // }
 * } catch (err) {
 *   // ...
 * }
 * @example
 * try {
 *   const suffix = "1E4C9B93F3F0682250B6CF8331B7EE68FD8";
 *   const results = await pwnedPasswordRange("5BAA6");
 *   const numPwns = results[suffix] || 0;
 * } catch (err) {
 *   // ...
 * }
 * @see https://haveibeenpwned.com/api/v3#SearchingPwnedPasswordsByRange
 */
export async function pwnedPasswordRange(
  prefix: string,
  options: { baseUrl?: string; userAgent?: string; addPadding?: boolean } = {},
): Promise<PwnedPasswordSuffixes> {
  const data = await fetchFromApi(
    `/range/${encodeURIComponent(prefix)}`,
    options,
  );
  // create array from lines of text in response body
  const results = data.split('\n').filter(Boolean);
  // convert into an object mapping suffix to count for each line
  return results.reduce<PwnedPasswordSuffixes>((acc, row) => {
    const [suffix, countString] = row.split(':');
    acc[suffix] = Number.parseInt(countString, 10);
    return acc;
  }, {});
}
