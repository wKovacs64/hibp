import type { HttpResponseResolver } from "msw/http";

/**
 * Responds only once the request aborts, so a `timeoutMs` timeout cannot race
 * the response.
 */
export const respondOnAbort: HttpResponseResolver = ({ request }) => {
  return new Promise<Response>((resolve) => {
    request.signal.addEventListener(
      "abort",
      () => resolve(new Response(null)),
      { once: true },
    );
  });
};
