import axios from './axiosInstance';
import {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from './responses';

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns an Object (data found).
 * HTTP status code 404 returns null (no data found).
 * HTTP status code 400 throws an Error (bad request).
 * HTTP status code 403 throws an Error (forbidden).
 * HTTP status code 429 throws an Error (too many requests).
 *
 * @private
 * @param {string} endpoint the API endpoint to query
 * @returns {Promise} a Promise which resolves to the data resulting from the
 * query (or null for 404 Not Found responses), or rejects with an Error
 */
export default endpoint =>
  Promise.resolve(axios.get(endpoint))
    .then(res => res.data)
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case BAD_REQUEST.status:
            throw new Error(BAD_REQUEST.statusText);
          case FORBIDDEN.status:
            throw new Error(FORBIDDEN.statusText);
          case NOT_FOUND.status:
            return null;
          case TOO_MANY_REQUESTS.status:
            throw new Error(err.response.data);
          default:
            throw new Error(err.response.statusText);
        }
      } else {
        throw err;
      }
    });
