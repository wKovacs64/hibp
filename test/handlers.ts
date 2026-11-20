import type { HttpResponseResolver } from "msw/http";

export const respondOnAbort: HttpResponseResolver = ({ request }) => {
  return new Promise<Response>((resolve) => {
    request.signal.addEventListener(
      "abort",
      () => resolve(new Response(null)),
      { once: true },
    );
  });
};
