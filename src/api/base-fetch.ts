// @ts-ignore - package-info.js is generated
import { PACKAGE_NAME, PACKAGE_VERSION } from './haveibeenpwned/package-info.js';

export async function baseFetch({
  baseUrl,
  endpoint,
  headers,
  timeoutMs,
  userAgent,
  queryParams,
}: {
  baseUrl: string;
  endpoint: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  userAgent?: string;
  queryParams?: Record<string, string>;
}): Promise<Response> {
  const requestInit: RequestInit = {
    headers: buildHeaders(userAgent, headers),
    ...(timeoutMs ? { signal: AbortSignal.timeout(timeoutMs) } : {}),
  };

  const url = buildUrl(baseUrl, endpoint, queryParams);

  return fetch(url, requestInit);
}

function buildUrl(baseUrl: string, endpoint: string, queryParams?: Record<string, string>): string {
  const base = baseUrl.replace(/\/$/g, '');
  const url = new URL(`${base}${endpoint}`);

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

function buildHeaders(userAgent?: string, extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = { ...extra };

  if (userAgent) {
    headers['User-Agent'] = userAgent;
  } else if (typeof navigator === 'undefined') {
    headers['User-Agent'] = `${PACKAGE_NAME} ${PACKAGE_VERSION}`;
  }

  return headers;
}
