import axios from './axiosInstance';
import { BAD_REQUEST } from './responses';

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns plain text (data found).
 * HTTP status code 400 throws an Error (bad request).
 *
 * @internal
 * @private
 * @param {string} endpoint the API endpoint to query
 * @returns {Promise<string>} a Promise which resolves to the data resulting
 * from the query, or rejects with an Error
 */
export default (endpoint: string): Promise<string> =>
  Promise.resolve(axios.get<string>(endpoint))
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        switch (err.response.status) {
          case BAD_REQUEST.status:
            throw new Error(err.response.data);
          default:
            throw new Error(err.response.statusText);
        }
      } else {
        throw err;
      }
    });
