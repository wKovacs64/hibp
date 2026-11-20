import { baseFetch } from "../base-fetch.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from "./responses.js";

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
      retryAfter === null ? undefined : Number.parseInt(retryAfter, 10);
  }
}

/** @internal */
export async function readJson<Data>(response: Response): Promise<Data> {
  // SAFETY: haveibeenpwned.com documents each endpoint's response shape
  return (await response.json()) as Data;
}

/** @internal */
export function blockedWithRayId(rayId: string) {
  return `Request blocked, contact haveibeenpwned.com if this continues (Ray ID: ${rayId})`;
}

/** @internal */
export function statusLine({ status, statusText }: Response) {
  return `${status} ${statusText}`.trim();
}

/** @internal */
export function jsonMessage(text: string): string | undefined {
  try {
    const error: unknown = JSON.parse(text);

    if (hasStringMessage(error) && error.message.trim()) {
      return error.message;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function hasStringMessage(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  );
}

/** @internal */
export interface ApiOptions {
  apiKey?: string | undefined;
  baseUrl?: string | undefined;
  timeoutMs?: number | undefined;
  signal?: AbortSignal | undefined;
  userAgent?: string | undefined;
}

/** @internal */
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

/** @internal */
export async function fetchFromApi<Data>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<Data | null> {
  const response = await requestApi(endpoint, options);

  if (response.ok) {
    return readJson<Data>(response);
  }

  switch (response.status) {
    case BAD_REQUEST.status: {
      throw new Error(BAD_REQUEST.statusText);
    }

    case UNAUTHORIZED.status: {
      const text = await response.text();
      throw new Error(
        jsonMessage(text) ?? (text.trim() ? text : statusLine(response)),
      );
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
      const message =
        jsonMessage(await response.text()) ?? statusLine(response);

      const retryAfter = response.headers.get("retry-after");
      throw new RateLimitError(retryAfter, message);
    }

    default: {
      throw new Error(response.statusText);
    }
  }
}

/** @internal */
export async function fetchRequiredFromApi<Data>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<Data> {
  const data = await fetchFromApi<Data>(endpoint, options);

  if (data === null) throw new Error(NOT_FOUND.statusText);

  return data;
}
