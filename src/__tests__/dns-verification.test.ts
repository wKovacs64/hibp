import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import {
  DNS_TOKEN,
  DNS_VERIFICATION_FAILURE,
  DOMAIN_VERIFICATION_UNAUTHORIZED,
} from "../../test/fixtures.js";
import { TOO_MANY_REQUESTS } from "../api/haveibeenpwned/responses.js";
import {
  generateDnsToken,
  verifyDnsToken,
  RateLimitError,
  type DnsToken,
  type HIBP,
} from "../hibp.js";

describe("DNS verification", () => {
  it("generates the TXT record value with authenticated POST JSON", async () => {
    expect.assertions(4);
    server.use(
      http.post(
        "https://haveibeenpwned.com/api/v3/domainVerification/generateDnsToken",
        async ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe("my-api-key");
          expect(request.headers.get("content-type")).toBe("application/json");
          expect(await request.json()).toEqual({ DomainName: "example.com" });
          return Response.json(DNS_TOKEN);
        },
      ),
    );

    const token = generateDnsToken("example.com", { apiKey: "my-api-key" });
    expectTypeOf(token).toEqualTypeOf<Promise<DnsToken>>();
    await expect(token).resolves.toEqual({
      txtRecordValue: "hibp-verify=dweb_abc123xyz",
    });
  });

  it("verifies the domain with authenticated POST JSON and an empty success body", async () => {
    expect.assertions(4);
    server.use(
      http.post(
        "https://haveibeenpwned.com/api/v3/domainVerification/verifyDnsToken",
        async ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe("my-api-key");
          expect(request.headers.get("content-type")).toBe("application/json");
          expect(await request.json()).toEqual({ DomainName: "example.com" });
          return new Response(null, { status: 200 });
        },
      ),
    );

    const client: Pick<HIBP, "verifyDnsToken"> = { verifyDnsToken };
    const verification = client.verifyDnsToken("example.com", {
      apiKey: "my-api-key",
    });
    expectTypeOf(verification).toEqualTypeOf<Promise<void>>();
    await expect(verification).resolves.toBeUndefined();
  });

  // Status variants exercise error handling; the docs do not associate the
  // missing-TXT example with a particular status. These are not live captures.
  describe.each([
    { name: "generateDnsToken", operation: generateDnsToken },
    { name: "verifyDnsToken", operation: verifyDnsToken },
  ])("$name", ({ operation }) => {
    it.each([400, 403, 404, 409, 500])(
      "rejects with the upstream JSON reason for HTTP %i",
      async (status) => {
        server.use(
          http.post("*", () =>
            Response.json(DNS_VERIFICATION_FAILURE, {
              status,
              headers: { "cf-ray": "someRayId" },
            }),
          ),
        );

        await expect(operation("example.com")).rejects.toThrow(
          "No hibp-verify TXT records were found on the domain.",
        );
      },
    );

    it("preserves the observed missing-key failure reason", async () => {
      server.use(
        http.post("*", () =>
          Response.json(DOMAIN_VERIFICATION_UNAUTHORIZED, { status: 401 }),
        ),
      );

      await expect(operation("example.com")).rejects.toThrow(
        "Access denied due to missing hibp-api-key.",
      );
    });

    it("preserves plain-text upstream failure reasons", async () => {
      server.use(
        http.post(
          "*",
          () =>
            new Response("Domain verification is unavailable.", {
              status: 503,
            }),
        ),
      );

      await expect(operation("example.com")).rejects.toThrow(
        "Domain verification is unavailable.",
      );
    });

    it("reports the Ray ID of a blocked request", async () => {
      server.use(
        http.post(
          "*",
          () =>
            new Response("<!DOCTYPE html><title>Attention Required</title>", {
              status: 403,
              headers: { "content-type": "text/html", "cf-ray": "someRayId" },
            }),
        ),
      );

      await expect(operation("example.com")).rejects.toThrow(
        "Request blocked, contact haveibeenpwned.com if this continues (Ray ID: someRayId)",
      );
    });

    it.each([
      { case: "an empty JSON body", body: "", type: "application/json" },
      { case: "an invalid JSON body", body: "{", type: "application/json" },
      {
        case: "a JSON body without a message",
        body: JSON.stringify({ statusCode: 503 }),
        type: "application/json",
      },
      { case: "an empty body", body: null, type: "" },
      {
        case: "an HTML body",
        body: "<!DOCTYPE html><title>Service Unavailable</title>",
        type: "text/html",
      },
    ])("rejects with the HTTP status for $case", async ({ body, type }) => {
      server.use(
        http.post(
          "*",
          () =>
            new Response(body, {
              status: 503,
              statusText: "Service Unavailable",
              headers: type ? { "content-type": type } : undefined,
            }),
        ),
      );

      await expect(operation("example.com")).rejects.toThrow(
        /^503 Service Unavailable$/,
      );
    });

    it("supports an authenticating proxy and a custom User-Agent", async () => {
      expect.assertions(3);
      const baseUrl = "https://my-hibp-proxy:8080/api";
      server.use(
        http.post(`${baseUrl}/domainVerification/*`, async ({ request }) => {
          expect(request.headers.has("hibp-api-key")).toBe(false);
          expect(request.headers.get("user-agent")).toBe("Custom UA");
          expect(await request.json()).toEqual({ DomainName: "example.com" });
          return Response.json(DNS_TOKEN);
        }),
      );

      await operation("example.com", { baseUrl, userAgent: "Custom UA" });
    });

    it("honors caller cancellation", async () => {
      const controller = new AbortController();
      controller.abort();

      await expect(
        operation("example.com", { signal: controller.signal }),
      ).rejects.toMatchObject({ name: "AbortError" });
    });

    it("honors the request timeout", async () => {
      server.use(
        http.post("*", ({ request }) => {
          return new Promise<Response>((resolve) => {
            request.signal.addEventListener(
              "abort",
              () => resolve(Response.json(DNS_TOKEN)),
              { once: true },
            );
          });
        }),
      );

      await expect(
        operation("example.com", { timeoutMs: 1 }),
      ).rejects.toMatchObject({ name: "TimeoutError" });
    });

    it("preserves rate-limit retry guidance", async () => {
      server.use(
        http.post("*", () =>
          Response.json(TOO_MANY_REQUESTS.body, {
            status: TOO_MANY_REQUESTS.status,
            headers: Array.from(TOO_MANY_REQUESTS.headers),
          }),
        ),
      );

      const error = await operation("example.com").catch(
        (caught: unknown) => caught,
      );
      expect(error).toBeInstanceOf(RateLimitError);
      expect(error).toHaveProperty("retryAfterSeconds", 2);
      expect(error).toHaveProperty(
        "message",
        "Rate limit is exceeded. Try again in 2 seconds.",
      );
    });
  });
});
