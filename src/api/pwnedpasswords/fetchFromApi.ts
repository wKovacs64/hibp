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
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<string>} a Promise which resolves to the data resulting
 * from the query, or rejects with an Error
 */
export default (
  endpoint: string,
  /* istanbul ignore next: no need to test default empty object */
  options: { baseUrl?: string; userAgent?: string } = {},
): Promise<string> => {
  const { baseUrl, userAgent } = options;

  const config = Object.assign(
    {},
    baseUrl ? { baseURL: baseUrl } : {},
    userAgent
      ? {
          headers: {
            'User-Agent': userAgent,
          },
        }
      : {},
  );

  return Promise.resolve(axios.get<string>(endpoint, config))
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
};
