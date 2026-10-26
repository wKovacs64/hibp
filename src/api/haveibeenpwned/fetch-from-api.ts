import { baseFetch } from "../base-fetch.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from "./responses.js";
import type { ApiData } from "./types.js";

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
    retryAfter: ReturnType<Headers["get"]>,
    message: string | undefined,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
    this.retryAfterSeconds =
      typeof retryAfter === "string"
        ? Number.parseInt(retryAfter, 10)
        : undefined;
  }
}

/** @internal */
export function blockedWithRayId(rayId: string) {
  return `Request blocked, contact haveibeenpwned.com if this continues (Ray ID: ${rayId})`;
}

/**
 * Reads the `message` of a JSON error body, or `null` if absent or blank.
 *
 * @internal
 */
export function jsonMessage(text: string): string | null {
  try {
    const error: unknown = JSON.parse(text);
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.trim()
    ) {
      return error.message;
    }
  } catch {
    // Not JSON.
  }
  return null;
}

/** @internal */
export interface ApiOptions {
  apiKey?: string;
  baseUrl?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
  userAgent?: string;
}

/**
 * Sends a request to the haveibeenpwned.com API, as a JSON POST when `body` is
 * supplied.
 *
 * @internal
 */
export function requestApi(
  endpoint: string,
  options: ApiOptions = {},
  body?: Record<string, string>,
): Promise<Response> {
  const {
    apiKey,
    baseUrl = "https://haveibeenpwned.com/api/v3",
    timeoutMs,
    signal,
    userAgent,
  } = options;

  const headers: Record<string, string> = {};
  if (apiKey) headers["HIBP-API-Key"] = apiKey;
  if (body) headers["Content-Type"] = "application/json";

  return baseFetch({
    baseUrl,
    endpoint,
    headers,
    timeoutMs,
    signal,
    userAgent,
    method: body ? "POST" : undefined,
    body: body && JSON.stringify(body),
  });
}

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns an Object (data found).
 * HTTP status code 404 returns null (no data found).
 * HTTP status code 400 throws an Error (bad request).
 * HTTP status code 401 throws an Error (unauthorized) with the body's JSON
 * `message`, or the body text.
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
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<ApiData>} a Promise which resolves to the data resulting
 * from the query (or null for 404 Not Found responses), or rejects with an
 * Error
 */
export async function fetchFromApi(
  endpoint: string,
  options: ApiOptions = {},
): Promise<ApiData> {
  const response = await requestApi(endpoint, options);

  if (response.ok) return response.json() as Promise<ApiData>;

  switch (response.status) {
    case BAD_REQUEST.status: {
      throw new Error(BAD_REQUEST.statusText);
    }
    case UNAUTHORIZED.status: {
      const text = await response.text();
      throw new Error(jsonMessage(text) ?? text);
    }
    case FORBIDDEN.status: {
      const rayId = response.headers.get("cf-ray");
      if (rayId) throw new Error(blockedWithRayId(rayId));
      throw new Error(FORBIDDEN.statusText);
    }
    case NOT_FOUND.status: {
      return null;
    }
    case TOO_MANY_REQUESTS.status: {
      const message = jsonMessage(await response.text()) ?? undefined;
      const retryAfter = response.headers.get("retry-after");
      throw new RateLimitError(retryAfter, message);
    }
    default: {
      throw new Error(response.statusText);
    }
  }
}
