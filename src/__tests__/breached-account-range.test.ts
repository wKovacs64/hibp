import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { EMAIL_SHA1_PREFIX, EMAIL_RANGE_RESULTS } from "../../test/fixtures.js";
import { respondOnAbort } from "../../test/handlers.js";
import { NOT_FOUND } from "../api/haveibeenpwned/responses.js";
import { breachedAccountRange } from "../breached-account-range.js";

describe("breachedAccountRange", () => {
  describe("found", () => {
    it("resolves with data from the remote API", () => {
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          expect(request.url).toBe(
            "https://haveibeenpwned.com/api/v3/breachedaccount/range/6B5917",
          );
          return new Response(JSON.stringify(EMAIL_RANGE_RESULTS));
        }),
      );

      return expect(breachedAccountRange(EMAIL_SHA1_PREFIX)).resolves.toEqual(
        EMAIL_RANGE_RESULTS,
      );
    });
  });

  describe("not found", () => {
    it("resolves with null", () => {
      // The API documents HTTP 200 for every valid prefix; a 404 follows the
      // SDK's existing not-found contract.
      server.use(
        http.get("*", () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(
        breachedAccountRange(EMAIL_SHA1_PREFIX),
      ).resolves.toBeNull();
    });
  });

  describe("apiKey option", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      const apiKey = "my-api-key";
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return new Response(JSON.stringify(EMAIL_RANGE_RESULTS));
        }),
      );

      return breachedAccountRange(EMAIL_SHA1_PREFIX, { apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(EMAIL_RANGE_RESULTS));
        }),
      );

      return expect(
        breachedAccountRange(EMAIL_SHA1_PREFIX, { baseUrl }),
      ).resolves.toEqual(EMAIL_RANGE_RESULTS);
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(http.get("*", respondOnAbort));

      return expect(
        breachedAccountRange(EMAIL_SHA1_PREFIX, { timeoutMs: 1 }),
      ).rejects.toMatchInlineSnapshot(
        `[TimeoutError: The operation was aborted due to timeout]`,
      );
    });
  });

  describe("userAgent option", () => {
    it("is passed on as a request header", () => {
      expect.assertions(1);
      const userAgent = "Custom UA";
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("User-Agent")).toBe(userAgent);
          return new Response(JSON.stringify(EMAIL_RANGE_RESULTS));
        }),
      );

      return breachedAccountRange(EMAIL_SHA1_PREFIX, { userAgent });
    });
  });
});
