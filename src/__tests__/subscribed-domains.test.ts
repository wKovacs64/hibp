import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { subscribedDomains } from "../subscribed-domains.js";

describe("subscribedDomains", () => {
  const DOMAINS = [
    {
      DomainName: "example.com",
      PwnCount: 3,
      PwnCountExcludingSpamLists: 2,
      PwnCountExcludingSpamListsAtLastSubscriptionRenewal: 1,
      NextSubscriptionRenewal: "2025-12-31T23:59:59Z",
    },
  ];

  describe("apiKey parameter", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      const apiKey = "my-api-key";
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return new Response(JSON.stringify(DOMAINS));
        }),
      );

      return subscribedDomains({ apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(DOMAINS));
        }),
      );

      return expect(subscribedDomains({ baseUrl })).resolves.toEqual(DOMAINS);
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
          return new Response(JSON.stringify(DOMAINS));
        }),
      );

      return expect(
        subscribedDomains({ timeoutMs }),
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
          return new Response(JSON.stringify(DOMAINS));
        }),
      );

      return subscribedDomains({ userAgent });
    });
  });
});
