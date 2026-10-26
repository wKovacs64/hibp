import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { DNS_TOKEN } from "../../test/fixtures.js";
import { respondOnAbort } from "../../test/handlers.js";
import { generateDnsToken } from "../generate-dns-token.js";

describe("generateDnsToken", () => {
  const domain = "example.com";

  describe("valid domain", () => {
    it("resolves with the TXT record value", async () => {
      expect.assertions(3);
      server.use(
        http.post("*", async ({ request }) => {
          expect(request.url).toBe(
            "https://haveibeenpwned.com/api/v3/domainVerification/generateDnsToken",
          );
          expect(await request.json()).toEqual({ DomainName: domain });
          return Response.json(DNS_TOKEN);
        }),
      );

      await expect(generateDnsToken(domain)).resolves.toEqual(DNS_TOKEN);
    });
  });

  describe("apiKey option", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      const apiKey = "my-api-key";
      server.use(
        http.post("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return Response.json(DNS_TOKEN);
        }),
      );

      return generateDnsToken(domain, { apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.post(new RegExp(`^${baseUrl}`), () => {
          return Response.json(DNS_TOKEN);
        }),
      );

      return expect(generateDnsToken(domain, { baseUrl })).resolves.toEqual(
        DNS_TOKEN,
      );
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(http.post("*", respondOnAbort));

      return expect(
        generateDnsToken(domain, { timeoutMs: 1 }),
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
          return Response.json(DNS_TOKEN);
        }),
      );

      return generateDnsToken(domain, { userAgent });
    });
  });
});
