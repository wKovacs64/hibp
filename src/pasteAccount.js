import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches all pastes for an account (email address).
 *
 * @param {string} email the email address to query
 * @returns {Promise} a Promise which resolves to an array of paste objects
 * (or null if no pastes were found), or rejects with an Error
 * @example
 * hibp.pasteAccount('foo@bar.com')
 *   .then((data) => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch((err) => {
 *     // ...
 *   });
 * @memberof hibp
 * @function pasteAccount
 */
export default email =>
  fetchFromApi(`/pasteaccount/${encodeURIComponent(email)}`);
