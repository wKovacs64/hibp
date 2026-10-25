import { baseFetch } from "../base-fetch.js";
import { RateLimitError } from "./fetch-from-api.js";
import { TOO_MANY_REQUESTS } from "./responses.js";

/** @internal */
export async function postToApi(
  endpoint: string,
  body: Record<string, string>,
  options: {
    apiKey?: string;
    baseUrl?: string;
    timeoutMs?: number;
    signal?: AbortSignal;
    userAgent?: string;
  } = {},
): Promise<Response> {
  const {
    apiKey,
    baseUrl = "https://haveibeenpwned.com/api/v3",
    timeoutMs,
    signal,
    userAgent,
  } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) headers["HIBP-API-Key"] = apiKey;

  const response = await baseFetch({
    baseUrl,
    endpoint,
    method: "POST",
    body: JSON.stringify(body),
    headers,
    timeoutMs,
    signal,
    userAgent,
  });

  if (response.ok) return response;

  let message = await response.text();
  if (response.headers.get("content-type")?.includes("json")) {
    const error: unknown = JSON.parse(message);
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      message = error.message;
    }
  }

  if (response.status === TOO_MANY_REQUESTS.status) {
    throw new RateLimitError(response.headers.get("retry-after"), message);
  }
  throw new Error(message);
}
