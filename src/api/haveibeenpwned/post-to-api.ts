import {
  blockedWithRayId,
  jsonMessage,
  RateLimitError,
  requestApi,
  statusLine,
  type ApiOptions,
} from "./fetch-from-api.js";
import { FORBIDDEN, TOO_MANY_REQUESTS } from "./responses.js";

/** @internal */
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
  const isPlainText = /^text\/plain\b/i.test(headers.get("content-type") ?? "");

  const message =
    jsonMessage(text) ??
    (status === FORBIDDEN.status && rayId
      ? blockedWithRayId(rayId)
      : undefined) ??
    (isPlainText && text.trim() ? text : undefined) ??
    statusLine(response);

  if (status === TOO_MANY_REQUESTS.status) {
    throw new RateLimitError(headers.get("retry-after"), message);
  }

  throw new Error(message);
}
