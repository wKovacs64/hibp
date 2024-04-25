// This can probably be removed in favor of Node's native fetch once we drop
// support for v18. https://x.com/ebey_jacob/status/1709975146939973909?s=20

/* c8 ignore next */
export default 'fetch' in globalThis ? fetch : fetchWrapper;

async function fetchWrapper(
  input: string | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  const webFetchExports = await import('@remix-run/web-fetch');
  return webFetchExports.fetch(input, init);
}
