import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import {
  DOMAIN_VERIFICATION_UNAUTHORIZED,
  EMAIL_VERIFICATION_INVALID_ALIAS,
} from "../../test/fixtures.js";
import { TOO_MANY_REQUESTS } from "../api/haveibeenpwned/responses.js";
import {
  sendEmail,
  RateLimitError,
  type EmailAlias,
  type HIBP,
} from "../hibp.js";

describe("sendEmail", () => {
  it("restricts consumers to the supported administrative aliases", () => {
    expectTypeOf<EmailAlias>().toEqualTypeOf<
      "admin" | "hostmaster" | "info" | "security" | "webmaster"
    >();
    expectTypeOf(sendEmail).parameter(1).toEqualTypeOf<EmailAlias>();
  });

  // Request and HTTP 200 are documented; an empty success body is representative.
  // Authenticated success and email delivery have not been live verified.
  it.each(["admin", "hostmaster", "info", "security", "webmaster"] as const)(
    "requests an approval email for %s with authenticated POST JSON and accepts an empty success body",
    async (emailAlias) => {
      expect.assertions(4);
      server.use(
        http.post(
          "https://haveibeenpwned.com/api/v3/domainVerification/sendEmail",
          async ({ request }) => {
            expect(request.headers.get("hibp-api-key")).toBe("my-api-key");
            expect(request.headers.get("content-type")).toBe(
              "application/json",
            );
            expect(await request.json()).toEqual({
              DomainName: "example.com",
              EmailAlias: emailAlias,
            });
            return new Response(null, { status: 200 });
          },
        ),
      );

      const client: Pick<HIBP, "sendEmail"> = { sendEmail };
      const request = client.sendEmail("example.com", emailAlias, {
        apiKey: "my-api-key",
      });
      expectTypeOf(request).toEqualTypeOf<Promise<void>>();
      await expect(request).resolves.toBeUndefined();
    },
  );

  it("preserves the documented invalid-alias failure reason", async () => {
    server.use(
      http.post("*", () =>
        Response.json(EMAIL_VERIFICATION_INVALID_ALIAS, { status: 400 }),
      ),
    );

    // @ts-expect-error -- Exercise upstream validation for untyped callers.
    const request = sendEmail("example.com", "support");
    await expect(request).rejects.toThrow(
      "The emailAlias field did not contain a valid value. Acceptable values are: admin, hostmaster, info, security, webmaster.",
    );
  });

  it("preserves the observed missing-key failure reason", async () => {
    server.use(
      http.post("*", () =>
        Response.json(DOMAIN_VERIFICATION_UNAUTHORIZED, { status: 401 }),
      ),
    );

    await expect(sendEmail("example.com", "admin")).rejects.toThrow(
      "Access denied due to missing hibp-api-key.",
    );
  });

  // Representative transport responses, not live captures.
  it("preserves plain-text upstream failure reasons", async () => {
    server.use(
      http.post(
        "*",
        () =>
          new Response("Email verification is unavailable.", { status: 503 }),
      ),
    );

    await expect(sendEmail("example.com", "admin")).rejects.toThrow(
      "Email verification is unavailable.",
    );
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

    const error = await sendEmail("example.com", "admin").catch(
      (caught: unknown) => caught,
    );
    expect(error).toBeInstanceOf(RateLimitError);
    expect(error).toHaveProperty("retryAfterSeconds", 2);
    expect(error).toHaveProperty(
      "message",
      "Rate limit is exceeded. Try again in 2 seconds.",
    );
  });

  it("supports an authenticating proxy and a custom User-Agent", async () => {
    expect.assertions(4);
    const baseUrl = "https://my-hibp-proxy:8080/api";
    server.use(
      http.post(
        `${baseUrl}/domainVerification/sendEmail`,
        async ({ request }) => {
          expect(request.headers.has("hibp-api-key")).toBe(false);
          expect(request.headers.get("user-agent")).toBe("Custom UA");
          expect(await request.json()).toEqual({
            DomainName: "example.com",
            EmailAlias: "security",
          });
          return new Response("Email sent.", { status: 200 });
        },
      ),
    );

    await expect(
      sendEmail("example.com", "security", { baseUrl, userAgent: "Custom UA" }),
    ).resolves.toBeUndefined();
  });

  it("honors caller cancellation", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      sendEmail("example.com", "admin", { signal: controller.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("honors the request timeout", async () => {
    server.use(
      http.post("*", ({ request }) => {
        return new Promise<Response>((resolve) => {
          request.signal.addEventListener(
            "abort",
            () => resolve(new Response(null, { status: 200 })),
            { once: true },
          );
        });
      }),
    );

    await expect(
      sendEmail("example.com", "admin", { timeoutMs: 1 }),
    ).rejects.toMatchObject({ name: "TimeoutError" });
  });
});
