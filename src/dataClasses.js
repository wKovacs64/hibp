import fetchFromApi from './internal/fetchFromApi';

/**
 * Fetches all data classes in the system.
 *
 * @returns {Promise} a Promise which resolves to an array of strings (or
 * null if no data classes were found), or rejects with an Error
 * @example
 * dataClasses()
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
 * @alias module:dataClasses
 */
const dataClasses = () => fetchFromApi('/dataclasses');

/**
 * A module for retrieving all data classes in the system.
 *
 * @module dataClasses
 * @example
 * import { dataClasses } from 'hibp';
 */
export default dataClasses;
