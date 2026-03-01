import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { SUBSCRIPTION_STATUS } from "../../test/fixtures.js";
import { subscriptionStatus } from "../subscription-status.js";

describe("subscriptionStatus", () => {
  const apiKey = "my-api-key";

  describe("apiKey parameter", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return new Response(JSON.stringify(SUBSCRIPTION_STATUS));
        }),
      );

      return subscriptionStatus({ apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(SUBSCRIPTION_STATUS));
        }),
      );

      return expect(subscriptionStatus({ baseUrl })).resolves.toEqual(
        SUBSCRIPTION_STATUS,
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
          return new Response(JSON.stringify(SUBSCRIPTION_STATUS));
        }),
      );

      return expect(
        subscriptionStatus({ timeoutMs }),
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
          return new Response(JSON.stringify(SUBSCRIPTION_STATUS));
        }),
      );

      return subscriptionStatus({ userAgent });
    });
  });
});
