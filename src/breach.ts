import fetchFromApi from './internal/haveibeenpwned/fetchFromApi';
import { Breach } from './types/remote-api';

/**
 * An object representing a breach.
 *
 * @typedef {object} Breach
 * @property {string} Name
 * @property {string} Title
 * @property {string} Domain
 * @property {string} BreachDate
 * @property {string} AddedDate
 * @property {string} ModifiedDate
 * @property {number} PwnCount
 * @property {string} Description
 * @property {string} LogoPath
 * @property {string[]} DataClasses
 * @property {boolean} IsVerified
 * @property {boolean} IsFabricated
 * @property {boolean} IsSensitive
 * @property {boolean} IsRetired
 * @property {boolean} IsSpamList
 */
/**
 * Fetches data for a specific breach event.
 *
 * @param {string} breachName the name of a breach in the system
 * @returns {(Promise<Breach>|Promise<null>)} a Promise which resolves to an
 * object representing a breach (or null if no breach was found), or rejects
 * with an Error
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
const breach = (breachName: string): Promise<Breach | null> =>
  fetchFromApi(
    `/breach/${encodeURIComponent(breachName)}`,
  ) as Promise<Breach | null>;

/**
 * A module for retrieving data for a specific breach event.
 *
 * @module breach
 * @example
 * import { breach } from 'hibp';
 */
export default breach;
