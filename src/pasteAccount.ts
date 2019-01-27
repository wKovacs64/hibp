import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';
import { Paste } from './types/remote-api.d';

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
 * @param {string} email the email address to query
 * @param {object} [options] a configuration object
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Paste[]> | Promise<null>)} a Promise which resolves to an
 * array of paste objects (or null if no pastes were found), or rejects with an
 * Error
 * @example
 * pasteAccount('foo@bar.com')
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:pasteAccount
 */
const pasteAccount = (
  email: string,
  options: { userAgent?: string } = {},
): Promise<Paste[] | null> =>
  fetchFromApi(`/pasteaccount/${encodeURIComponent(email)}`, {
    userAgent: options.userAgent,
  }) as Promise<Paste[] | null>;

/**
 * A module for retrieving paste data for a specific account (email address).
 *
 * @module pasteAccount
 * @example
 * import { pasteAccount } from 'hibp';
 */
export default pasteAccount;
