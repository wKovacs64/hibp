import type { DataClassDescription } from "./api/haveibeenpwned/types.js";
import { fetchFromApi } from "./api/haveibeenpwned/fetch-from-api.js";

/**
 * A data class name and its description.
 *
 * @typedef {object} DataClassDescription
 * @property {string} name - the data class name
 * @property {string} description - a description of the compromised data
 */

/**
 * Fetches all data class names and descriptions.
 *
 * No API key is required. Field names match the lowercase `name` and
 * `description` returned by the
 * [public endpoint](https://haveibeenpwned.com/api/v3/dataClasses/descriptions).
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<DataClassDescription[]>|Promise<null>)} a Promise which resolves
 * to data class objects (or null for a 404 response), or rejects with an Error
 * @example
 * const data = await dataClassDescriptions();
 * if (data) {
 *   for (const { name, description } of data) {
 *     console.log(name, description);
 *   }
 * }
 */
export function dataClassDescriptions(
  options: {
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
): Promise<DataClassDescription[] | null> {
  return fetchFromApi("/dataclasses/descriptions", options) as Promise<
    DataClassDescription[] | null
  >;
}
