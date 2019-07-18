import { Breach, Paste } from 'types/remote-api.d';
import axios from './axiosInstance';
import {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from './responses';

export type ApiData =
  | Breach // breach
  | Breach[] // breachedaccount, breaches
  | Paste[] // pasteaccount
  | string[] // dataclasses
  | null; // most endpoints can return an empty response

const blockedWithRayId = (rayId: string): string =>
  `Request blocked, contact haveibeenpwned.com if this continues (Ray ID: ${rayId})`;

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns an Object (data found).
 * HTTP status code 404 returns null (no data found).
 * HTTP status code 400 throws an Error (bad request).
 * HTTP status code 403 throws an Error (forbidden).
 * HTTP status code 429 throws an Error (too many requests).
 *
 * @internal
 * @private
 * @param {string} endpoint the API endpoint to query
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<ApiData>} a Promise which resolves to the data resulting
 * from the query (or null for 404 Not Found responses), or rejects with an
 * Error
 */
export default (
  endpoint: string,
  /* istanbul ignore next: no need to test default empty object */
  options: { baseUrl?: string; userAgent?: string } = {},
): Promise<ApiData> => {
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

  return Promise.resolve(axios.get<ApiData>(endpoint, config))
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        switch (err.response.status) {
          case BAD_REQUEST.status:
            throw new Error(BAD_REQUEST.statusText);
          case FORBIDDEN.status: {
            const rayId =
              err.response.headers && err.response.headers['cf-ray'];
            if (rayId) {
              throw new Error(blockedWithRayId(rayId));
            }
            throw new Error(FORBIDDEN.statusText);
          }
          case NOT_FOUND.status:
            return null;
          case TOO_MANY_REQUESTS.status:
            throw new Error(err.response.data.message);
          default:
            throw new Error(err.response.statusText);
        }
      } else {
        throw err;
      }
    });
};
