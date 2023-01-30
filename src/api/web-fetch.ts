/* c8 ignore next */
export default typeof window !== 'undefined' ? window.fetch : fetchWrapper;

async function fetchWrapper(
  input: string | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  const { default: webFetch } = await import('@remix-run/web-fetch');
  return webFetch(input, init);
}
