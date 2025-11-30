// @ts-ignore - package-info.js is generated
import { PACKAGE_NAME, PACKAGE_VERSION } from './haveibeenpwned/package-info.js';

export async function baseFetch({
  baseUrl,
  endpoint,
  headers,
  timeoutMs,
  signal,
  userAgent,
  queryParams,
}: {
  baseUrl: string;
  endpoint: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  signal?: AbortSignal;
  userAgent?: string;
  queryParams?: Record<string, string>;
}): Promise<Response> {
  const requestInit: RequestInit = {
    headers: buildHeaders(userAgent, headers),
    signal: buildSignal(timeoutMs, signal),
  };

  const url = buildUrl(baseUrl, endpoint, queryParams);

  return fetch(url, requestInit);
}

export function buildUrl(
  baseUrl: string,
  endpoint: string,
  queryParams?: Record<string, string>,
): string {
  const base = baseUrl.replace(/\/$/g, '');
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${base}${normalizedEndpoint}`);

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

export function buildHeaders(
  userAgent?: string,
  extra?: Record<string, string>,
): Record<string, string> {
  const headers: Record<string, string> = { ...extra };

  if (userAgent) {
    headers['User-Agent'] = userAgent;
  } else if (typeof navigator === 'undefined') {
    headers['User-Agent'] = `${PACKAGE_NAME} ${PACKAGE_VERSION}`;
  }

  return headers;
}

function buildSignal(timeoutMs?: number, signal?: AbortSignal): AbortSignal | undefined {
  const signals: AbortSignal[] = [];

  if (timeoutMs) signals.push(AbortSignal.timeout(timeoutMs));
  if (signal) signals.push(signal);

  if (signals.length === 0) return undefined;
  if (signals.length === 1) return signals[0];

  return AbortSignal.any(signals);
}
