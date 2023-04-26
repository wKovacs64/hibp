/* c8 ignore next */
export default typeof window !== 'undefined' ? window.fetch : fetchWrapper;

async function fetchWrapper(
  input: string | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  const webFetchExports = await import('@remix-run/web-fetch');
  return webFetchExports.fetch(input, init);
}
