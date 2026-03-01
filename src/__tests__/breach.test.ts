import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { VERIFIED_BREACH } from "../../test/fixtures.js";
import { NOT_FOUND } from "../api/haveibeenpwned/responses.js";
import { breach } from "../breach.js";

describe("breach", () => {
  describe("found", () => {
    it("resolves with data from the remote API", () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(breach("found")).resolves.toEqual(VERIFIED_BREACH);
    });
  });

  describe("not found", () => {
    it("resolves with null", () => {
      server.use(
        http.get("*", () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(breach("not found")).resolves.toBeNull();
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(breach("found", { baseUrl })).resolves.toEqual(
        VERIFIED_BREACH,
      );
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      const timeoutMs = 1;
      server.use(
        http.get("*", async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, timeoutMs + 1);
          });
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(
        breach("found", { timeoutMs }),
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
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return breach("found", { userAgent });
    });
  });
});
