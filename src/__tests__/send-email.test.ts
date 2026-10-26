import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { sendEmail } from "../send-email.js";

describe("sendEmail", () => {
  const domain = "example.com";

  // Request and HTTP 200 are documented; an empty success body is representative.
  // Authenticated success and email delivery have not been live verified.
  describe("success", () => {
    it("requests an approval email", async () => {
      expect.assertions(3);
      server.use(
        http.post("*", async ({ request }) => {
          expect(request.url).toBe(
            "https://haveibeenpwned.com/api/v3/domainVerification/sendEmail",
          );
          expect(await request.json()).toEqual({
            DomainName: domain,
            EmailAlias: "security",
          });
          return new Response(null);
        }),
      );

      await expect(sendEmail(domain, "security")).resolves.toBeUndefined();
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

      return sendEmail(domain, "security", { apiKey });
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
        sendEmail(domain, "security", { baseUrl }),
      ).resolves.toBeUndefined();
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(
        http.post("*", ({ request }) => {
          // Respond only once aborted so the timeout cannot race the response.
          return new Promise<Response>((resolve) => {
            request.signal.addEventListener(
              "abort",
              () => resolve(new Response(null)),
              { once: true },
            );
          });
        }),
      );

      return expect(
        sendEmail(domain, "security", { timeoutMs: 1 }),
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

      return sendEmail(domain, "security", { userAgent });
    });
  });
});
