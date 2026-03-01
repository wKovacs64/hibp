import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { NOT_FOUND } from "../api/haveibeenpwned/responses.js";
import { stealerLogsByEmailDomain } from "../stealer-logs-by-email-domain.js";

describe("stealerLogsByEmailDomain", () => {
  const STEALER_RESULTS = {
    andy: ["netflix.com"],
    jane: ["netflix.com", "spotify.com"],
  };

  describe("found", () => {
    it("resolves with data from the remote API", () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(STEALER_RESULTS));
        }),
      );

      return expect(
        stealerLogsByEmailDomain("example.com", { apiKey: "k" }),
      ).resolves.toEqual(STEALER_RESULTS);
    });
  });

  describe("not found", () => {
    it("resolves with null", () => {
      server.use(
        http.get("*", () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(
        stealerLogsByEmailDomain("example.com"),
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
          return new Response(JSON.stringify(STEALER_RESULTS));
        }),
      );

      return stealerLogsByEmailDomain("example.com", { apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(STEALER_RESULTS));
        }),
      );

      return expect(
        stealerLogsByEmailDomain("example.com", { baseUrl }),
      ).resolves.toEqual(STEALER_RESULTS);
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
          return new Response(JSON.stringify(STEALER_RESULTS));
        }),
      );

      return expect(
        stealerLogsByEmailDomain("example.com", { timeoutMs }),
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
          return new Response(JSON.stringify(STEALER_RESULTS));
        }),
      );

      return stealerLogsByEmailDomain("example.com", { userAgent });
    });
  });
});
