import fetch from '../web-fetch';
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
export function fetchFromApi(
  endpoint: string,
  {
    baseUrl = 'https://api.pwnedpasswords.com',
    userAgent,
  }: { baseUrl?: string; userAgent?: string } = {},
): Promise<string> {
  const config = Object.assign(
    {},
    userAgent
      ? {
          headers: {
            'User-Agent': userAgent,
          },
        }
      : {},
  );

  const url = `${baseUrl.replace(/\/$/g, '')}${endpoint}`;

  return fetch(url, config).then((res) => {
    if (res.ok) return res.text();

    if (res.status === BAD_REQUEST.status) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }

    throw new Error(res.statusText);
  });
}
