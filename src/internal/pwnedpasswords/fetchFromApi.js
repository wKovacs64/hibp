import axios from './axiosInstance';
import { RANGE_BAD_REQUEST, PASSWORD_NOT_FOUND } from './responses';

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns plain text (data found).
 * HTTP status code 400 throws an Error (bad request).
 * HTTP status code 404 returns null (no data found).
 *
 * @private
 * @param {string} endpoint the API endpoint to query
 * @returns {Promise} a Promise which resolves to the data resulting from the
 * query, or rejects with an Error
 */
export default endpoint =>
  Promise.resolve(axios.get(endpoint))
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        switch (err.response.status) {
          case RANGE_BAD_REQUEST.status:
            throw new Error(err.response.data);
          case PASSWORD_NOT_FOUND.status:
            return null;
          default:
            throw new Error(err.response.statusText);
        }
      } else {
        throw err;
      }
    });
