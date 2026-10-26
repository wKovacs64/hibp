import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { DNS_VERIFICATION_FAILURE } from "../../test/fixtures.js";
import { respondOnAbort } from "../../test/handlers.js";
import { verifyDnsToken } from "../verify-dns-token.js";

describe("verifyDnsToken", () => {
  const domain = "example.com";

  describe("verified", () => {
    it("resolves without a response body", async () => {
      expect.assertions(3);
      server.use(
        http.post("*", async ({ request }) => {
          expect(request.url).toBe(
            "https://haveibeenpwned.com/api/v3/domainVerification/verifyDnsToken",
          );
          expect(await request.json()).toEqual({ DomainName: domain });
          return new Response(null);
        }),
      );

      await expect(verifyDnsToken(domain)).resolves.toBeUndefined();
    });
  });

  describe("not verified", () => {
    it("rejects with the documented failure reason", () => {
      // The docs give this body without a status code.
      server.use(
        http.post("*", () =>
          Response.json(DNS_VERIFICATION_FAILURE, { status: 400 }),
        ),
      );

      return expect(verifyDnsToken(domain)).rejects.toThrow(
        DNS_VERIFICATION_FAILURE.message,
      );
    });
  });

  describe("apiKey option", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      const apiKey = "my-api-key";
      server.use(
        http.post("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return new Response(null);
        }),
      );

      return verifyDnsToken(domain, { apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.post(new RegExp(`^${baseUrl}`), () => {
          return new Response(null);
        }),
      );

      return expect(
        verifyDnsToken(domain, { baseUrl }),
      ).resolves.toBeUndefined();
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(http.post("*", respondOnAbort));

      return expect(
        verifyDnsToken(domain, { timeoutMs: 1 }),
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
        http.post("*", ({ request }) => {
          expect(request.headers.get("User-Agent")).toBe(userAgent);
          return new Response(null);
        }),
      );

      return verifyDnsToken(domain, { userAgent });
    });
  });
});
