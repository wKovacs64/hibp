import fetch from 'isomorphic-unfetch';
import { name, version } from '../../../package.json';
import { Breach, Paste } from './types';
import {
  BAD_REQUEST,
  UNAUTHORIZED,
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
 * HTTP status code 401 throws an Error (unauthorized).
 * HTTP status code 403 throws an Error (forbidden).
 * HTTP status code 429 throws an Error (too many requests).
 *
 * @internal
 * @private
 * @param {string} endpoint the API endpoint to query
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<ApiData>} a Promise which resolves to the data resulting
 * from the query (or null for 404 Not Found responses), or rejects with an
 * Error
 */
export default (
  endpoint: string,
  /* istanbul ignore next: no need to test default empty object */
  {
    apiKey = undefined,
    baseUrl = 'https://haveibeenpwned.com/api/v3',
    userAgent = undefined,
  }: { apiKey?: string; baseUrl?: string; userAgent?: string } = {},
): Promise<ApiData> => {
  const headers: Record<string, string> = {};

  if (apiKey) {
    headers['HIBP-API-Key'] = apiKey;
  }

  if (userAgent) {
    headers['User-Agent'] = userAgent;
  }

  // Provide a default User-Agent when running outside the browser
  if (!userAgent && typeof navigator === 'undefined') {
    headers['User-Agent'] = `${name} ${version}`;
  }

  const config = { headers };
  const url = `${baseUrl.replace(/\/$/g, '')}${endpoint}`;

  return fetch(url, config).then((res) => {
    if (res.ok) return res.json();

    switch (res.status) {
      case BAD_REQUEST.status:
        throw new Error(BAD_REQUEST.statusText);
      case UNAUTHORIZED.status:
        return res.json().then((body) => {
          throw new Error(body.message);
        });
      case FORBIDDEN.status: {
        const rayId = res.headers.get('cf-ray');
        if (rayId) {
          throw new Error(blockedWithRayId(rayId));
        }
        throw new Error(FORBIDDEN.statusText);
      }
      case NOT_FOUND.status:
        return null;
      case TOO_MANY_REQUESTS.status:
        return res.json().then((body) => {
          throw new Error(body.message);
        });
      default:
        throw new Error(res.statusText);
    }
  });
};
