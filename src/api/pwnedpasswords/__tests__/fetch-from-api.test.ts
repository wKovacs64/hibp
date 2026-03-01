import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../../../mocks/server.js";
import { BAD_REQUEST } from "../responses.js";
import { fetchFromApi } from "../fetch-from-api.js";

describe("internal (pwnedpassword): fetchFromApi", () => {
  describe("request failure", () => {
    it("re-throws request setup errors", () => {
      return expect(
        fetchFromApi("/service", { baseUrl: "relativeBaseUrl" }),
      ).rejects.toMatchInlineSnapshot(`[TypeError: Invalid URL]`);
    });
  });

  describe("invalid range", () => {
    it('throws a "Bad Request" error', async () => {
      server.use(
        http.get("*", () => {
          return new Response(BAD_REQUEST.body, { status: BAD_REQUEST.status });
        }),
      );

      return expect(
        fetchFromApi("/service/bad_request"),
      ).rejects.toMatchInlineSnapshot(
        `[Error: The hash prefix was not in a valid format]`,
      );
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
