import { baseFetch } from "../base-fetch.js";
import { BAD_REQUEST } from "./responses.js";

/** @internal */
export async function fetchFromApi(
  endpoint: string,
  options: {
    baseUrl?: string | undefined;
    timeoutMs?: number | undefined;
    signal?: AbortSignal | undefined;
    userAgent?: string | undefined;
    addPadding?: boolean | undefined;
    mode?: "sha1" | "ntlm" | undefined;
  } = {},
): Promise<string> {
  const {
    baseUrl = "https://api.pwnedpasswords.com",
    timeoutMs,
    signal,
    userAgent,
    addPadding = false,
    mode = "sha1",
  } = options;

  const headers: Record<string, string> = {};

  if (addPadding) headers["Add-Padding"] = "true";

  const response = await baseFetch({
    baseUrl,
    endpoint,
    headers,
    timeoutMs,
    signal,
    userAgent,
    queryParams: { mode },
  });

  if (response.ok) return response.text();

  if (response.status === BAD_REQUEST.status) {
    const text = await response.text();
    throw new Error(text);
  }

  throw new Error(response.statusText);
}
