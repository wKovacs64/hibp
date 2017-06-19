import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches breach data for a single site by breach name.
 *
 * @param {string} breachName the name of a breach in the system
 * @returns {Promise} a Promise which resolves to an object representing a
 * breach (or null if no breach was found), or rejects with an Error
 * @example
 * breach('Adobe')
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
 */
export default breachName =>
  fetchFromApi(`/breach/${encodeURIComponent(breachName)}`);
