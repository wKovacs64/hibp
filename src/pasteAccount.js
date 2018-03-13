import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';

/**
 * Fetches paste data for a specific account (email address).
 *
 * @param {string} email the email address to query
 * @returns {Promise} a Promise which resolves to an array of paste objects
 * (or null if no pastes were found), or rejects with an Error
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
const pasteAccount = email =>
  fetchFromApi(`/pasteaccount/${encodeURIComponent(email)}`);

/**
 * A module for retrieving paste data for a specific account (email address).
 *
 * @module pasteAccount
 * @example
 * import { pasteAccount } from 'hibp';
 */
export default pasteAccount;
