import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';

/**
 * Fetches data for a specific breach event.
 *
 * @param {string} breachName the name of a breach in the system
 * @returns {Promise} a Promise which resolves to an object representing a
 * breach (or null if no breach was found), or rejects with an Error
 * @example
 * breach('Adobe')
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
 * @alias module:breach
 */
const breach = breachName =>
  fetchFromApi(`/breach/${encodeURIComponent(breachName)}`);

/**
 * A module for retrieving data for a specific breach event.
 *
 * @module breach
 * @example
 * import { breach } from 'hibp';
 */
export default breach;
