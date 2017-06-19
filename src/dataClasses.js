import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches all data classes in the system.
 *
 * @returns {Promise} a Promise which resolves to an array of strings (or
 * null if no data classes were found), or rejects with an Error
 * @example
 * hibp.dataClasses()
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
 * @function dataClasses
 */
export default () => fetchFromApi('/dataclasses');
