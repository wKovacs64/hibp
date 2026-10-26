import {
  blockedWithRayId,
  RateLimitError,
  requestApi,
  type ApiOptions,
} from "./fetch-from-api.js";
import { FORBIDDEN, TOO_MANY_REQUESTS } from "./responses.js";

/**
 * Posts a JSON body to the supplied API endpoint.
 *
 * Failures reject with the first available reason: the JSON body's `message`,
 * the Cloudflare Ray ID of a blocked (403) request, a plain-text body, or the
 * HTTP status.
 *
 * @internal
 */
export async function postToApi(
  endpoint: string,
  body: Record<string, string>,
  options?: ApiOptions,
): Promise<Response> {
  const response = await requestApi(endpoint, options, body);
  if (response.ok) return response;

  const { headers, status } = response;
  const text = await response.text();
  const rayId = headers.get("cf-ray");
  let message = `${status} ${response.statusText}`.trim();
  if (status === FORBIDDEN.status && rayId) {
    message = blockedWithRayId(rayId);
  } else if (headers.get("content-type")?.startsWith("text/plain") && text) {
    message = text;
  }
  try {
    const error: unknown = JSON.parse(text);
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message
    ) {
      message = error.message;
    }
  } catch {
    // Not JSON; keep the reason above.
  }

  if (status === TOO_MANY_REQUESTS.status) {
    throw new RateLimitError(headers.get("retry-after"), message);
  }
  throw new Error(message);
}
