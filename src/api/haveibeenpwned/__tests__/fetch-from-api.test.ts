import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../../../mocks/server.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  BLOCKED,
  TOO_MANY_REQUESTS,
} from "../responses.js";
import { fetchFromApi, RateLimitError } from "../fetch-from-api.js";

describe("internal (haveibeenpwned): fetchFromApi", () => {
  const apiKey = "my-api-key";

  describe("User-Agent", () => {
    // Node
    it("sends a custom User-Agent request header when outside the browser", async () => {
      server.use(
        http.get("*", ({ request }) => {
          return request.headers.get("User-Agent")?.includes("hibp")
            ? new Response(JSON.stringify({}))
            : new Response(null, { status: FORBIDDEN.status });
        }),
      );

      const originalNavigator = global.navigator;

      // @ts-expect-error: faking a non-browser (Node) environment
      delete global.navigator;

      await expect(fetchFromApi("/service")).resolves.toEqual({});

      global.navigator = originalNavigator;
    });

    // Browser
    it("sends a natural User-Agent request header when inside the browser", () => {
      // Note: this test is _kinda_ bogus because it runs in Node so node-fetch
      // is used to make the request and node-fetch sends its own UA, whereas in
      // a browser environment, the browser would send its own UA. But I think
      // it accomplishes the same thing by checking for our custom UA (which we
      // don't want to see).
      server.use(
        http.get("*", ({ request }) => {
          return !request.headers.get("User-Agent")?.includes("hibp")
            ? new Response(JSON.stringify({}))
            : new Response(null, { status: FORBIDDEN.status });
        }),
      );

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      global.navigator = {} as Navigator;

      return expect(fetchFromApi("/service")).resolves.toEqual({});
    });
  });

  describe("request failure", () => {
    it("re-throws request setup errors", () => {
      return expect(
        fetchFromApi("/service", { baseUrl: "relativeBaseUrl" }),
      ).rejects.toMatchInlineSnapshot(`[TypeError: Invalid URL]`);
    });
  });

  describe("invalid account format", () => {
    it('throws a "Bad Request" error', () => {
      server.use(
        http.get("*", () => {
          return new Response(null, {
            status: BAD_REQUEST.status,
          });
        }),
      );

      return expect(
        fetchFromApi("/service/bad_request", { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Bad request — the account does not comply with an acceptable format.]`,
      );
    });
  });

  describe("unauthorized", () => {
    it('throws an "Unauthorized" error', () => {
      server.use(
        http.get("*", () => {
          return new Response(UNAUTHORIZED.body, {
            status: UNAUTHORIZED.status,
          });
        }),
      );

      return expect(
        fetchFromApi("/service/unauthorized"),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Your request to the API couldn't be authorised. Check you have the right value in the "hibp-api-key" header, refer to the documentation for more: https://haveibeenpwned.com/API/v3#Authorisation]`,
      );
    });
  });

  describe("forbidden request", () => {
    it('throws a "Forbidden" error if no cf-ray header is present', () => {
      server.use(
        http.get("*", () => {
          return new Response(null, {
            status: FORBIDDEN.status,
            statusText: FORBIDDEN.statusText,
          });
        }),
      );

      return expect(
        fetchFromApi("/service/forbidden", { apiKey }),
      ).rejects.toMatchInlineSnapshot(`[Error: Forbidden - access denied.]`);
    });

    it('throws a "Blocked Request" error if a cf-ray header is present', () => {
      server.use(
        http.get("*", () => {
          return new Response(null, {
            status: BLOCKED.status,
            headers: Array.from(BLOCKED.headers),
          });
        }),
      );

      return expect(
        fetchFromApi("/service/blocked", { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Request blocked, contact haveibeenpwned.com if this continues (Ray ID: someRayId)]`,
      );
    });
  });

  describe("rate limited", () => {
    it('throws a "Too Many Requests" rate limit error', async () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(TOO_MANY_REQUESTS.body), {
            status: TOO_MANY_REQUESTS.status,
            headers: Array.from(TOO_MANY_REQUESTS.headers),
          });
        }),
      );

      expect.assertions(3);
      try {
        await fetchFromApi("/service/rate_limited", { apiKey });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect(error).toHaveProperty("retryAfterSeconds", 2);
        expect(error).toMatchInlineSnapshot(
          "[RateLimitError: Rate limit is exceeded. Try again in 2 seconds.]",
        );
      }
    });

    it("sets retryAfterSeconds to undefined when header is missing", async () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(TOO_MANY_REQUESTS.body), {
            status: TOO_MANY_REQUESTS.status,
          });
        }),
      );

      expect.assertions(2);
      try {
        await fetchFromApi("/service/rate_limited", { apiKey });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfterSeconds).toBeUndefined();
      }
    });
  });

  describe("unexpected HTTP error", () => {
    it("throws an error with the response status text", () => {
      server.use(
        http.get("*", () => {
          return new Response(null, {
            status: 599,
            statusText: "Unknown - something unexpected happened.",
          });
        }),
      );

      return expect(
        fetchFromApi("/service/unknown_response"),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Unknown - something unexpected happened.]`,
      );
    });
  });
});
