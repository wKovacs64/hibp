import fetch from '../web-fetch';
import { name, version } from '../../../package.json';
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from './responses';
import type { ApiData, ErrorData } from './types';

/**
 * Custom error thrown when the haveibeenpwned.com API responds with 429 Too
 * Many Requests. See the `retryAfterSeconds` property for the number of seconds
 * to wait before attempting the request again.
 *
 * @see https://haveibeenpwned.com/API/v3#RateLimiting
 */
export class RateLimitError extends Error {
  /**
   * The number of seconds to wait before attempting the request again. May be
   * `undefined` if the API does not provide a `retry-after` header, but this
   * should never happen.
   */
  public retryAfterSeconds: number | undefined;

  constructor(
    retryAfter: ReturnType<Headers['get']>,
    message: string | undefined,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
    this.retryAfterSeconds =
      typeof retryAfter === 'string'
        ? Number.parseInt(retryAfter, 10) /* c8 ignore start */
        : undefined; /* c8 ignore stop */
  }
}

function blockedWithRayId(rayId: string) {
  return `Request blocked, contact haveibeenpwned.com if this continues (Ray ID: ${rayId})`;
}

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
export async function fetchFromApi(
  endpoint: string,
  {
    apiKey,
    baseUrl = 'https://haveibeenpwned.com/api/v3',
    userAgent,
  }: { apiKey?: string; baseUrl?: string; userAgent?: string } = {},
): Promise<ApiData> {
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
  const response = await fetch(url, config);

  if (response.ok) return response.json() as Promise<ApiData>;

  switch (response.status) {
    case BAD_REQUEST.status: {
      throw new Error(BAD_REQUEST.statusText);
    }
    case UNAUTHORIZED.status: {
      const body = (await response.json()) as unknown as ErrorData;
      throw new Error(body.message);
    }
    case FORBIDDEN.status: {
      const rayId = response.headers.get('cf-ray');
      if (rayId) throw new Error(blockedWithRayId(rayId));
      throw new Error(FORBIDDEN.statusText);
    }
    case NOT_FOUND.status: {
      return null;
    }
    case TOO_MANY_REQUESTS.status: {
      const body = (await response.json()) as unknown as ErrorData;
      const retryAfter = response.headers.get('retry-after');
      throw new RateLimitError(retryAfter, body.message);
    }
    default: {
      throw new Error(response.statusText);
    }
  }
}
