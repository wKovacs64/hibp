import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { EMAIL_SHA1_PREFIX, EMAIL_RANGE_RESULTS } from "../../test/fixtures.js";
import {
  breachedAccountRange,
  RateLimitError,
  type BreachedAccountRangeResult,
  type HIBP,
} from "../hibp.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from "../api/haveibeenpwned/responses.js";

describe("breachedAccountRange", () => {
  // Error fixtures follow the documented status contract, not live range responses:
  // https://haveibeenpwned.com/API/v3#ResponseCodes
  it.each([
    { status: BAD_REQUEST.status, body: null, message: BAD_REQUEST.statusText },
    {
      status: UNAUTHORIZED.status,
      body: UNAUTHORIZED.body,
      message: UNAUTHORIZED.body,
    },
    { status: FORBIDDEN.status, body: null, message: FORBIDDEN.statusText },
  ])(
    "rejects a documented $status response",
    async ({ status, body, message }) => {
      server.use(http.get("*", () => new Response(body, { status })));

      await expect(breachedAccountRange(EMAIL_SHA1_PREFIX)).rejects.toThrow(
        message,
      );
    },
  );

  it("preserves the rate-limit error and retry delay", async () => {
    server.use(
      http.get("*", () =>
        Response.json(TOO_MANY_REQUESTS.body, {
          status: TOO_MANY_REQUESTS.status,
          headers: Array.from(TOO_MANY_REQUESTS.headers),
        }),
      ),
    );

    const error = await breachedAccountRange(EMAIL_SHA1_PREFIX).catch(
      (caughtError: unknown) => caughtError,
    );
    expect(error).toBeInstanceOf(RateLimitError);
    expect(error).toMatchObject({
      message: "Rate limit is exceeded. Try again in 2 seconds.",
      retryAfterSeconds: 2,
    });
  });

  it("preserves the SDK's null result for an unexpected 404", async () => {
    // The range documentation expects 200 for every valid prefix.
    server.use(
      http.get("*", () => new Response(null, { status: NOT_FOUND.status })),
    );

    await expect(breachedAccountRange(EMAIL_SHA1_PREFIX)).resolves.toBeNull();
  });

  it("exports the documented consumer types and HIBP method", () => {
    expectTypeOf<BreachedAccountRangeResult>().toEqualTypeOf<{
      hashSuffix: string;
      websites: string[];
    }>();
    expectTypeOf<ReturnType<HIBP["breachedAccountRange"]>>().toEqualTypeOf<
      Promise<BreachedAccountRangeResult[] | null>
    >();
  });

  it("times out a slow request", async () => {
    server.use(
      http.get("*", async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return Response.json(EMAIL_RANGE_RESULTS);
      }),
    );

    await expect(
      breachedAccountRange(EMAIL_SHA1_PREFIX, { timeoutMs: 1 }),
    ).rejects.toMatchObject({ name: "TimeoutError" });
  });

  it("cancels an in-flight request with the caller's signal", async () => {
    const controller = new AbortController();
    const reason = new Error("Search cancelled");
    server.use(
      http.get("*", () => {
        controller.abort(reason);
        return Response.json(EMAIL_RANGE_RESULTS);
      }),
    );

    await expect(
      breachedAccountRange(EMAIL_SHA1_PREFIX, { signal: controller.signal }),
    ).rejects.toBe(reason);
  });

  it("sends the API key and user agent to a custom base URL", async () => {
    expect.assertions(4);
    server.use(
      http.get("*", ({ request }) => {
        expect(request.url).toBe(
          "https://my-hibp-proxy:8080/api/breachedaccount/range/6b5917",
        );
        expect(request.headers.get("hibp-api-key")).toBe("my-api-key");
        expect(request.headers.get("user-agent")).toBe("my-app 1.0");
        return Response.json(EMAIL_RANGE_RESULTS);
      }),
    );

    await expect(
      breachedAccountRange("6b5917", {
        apiKey: "my-api-key",
        baseUrl: "https://my-hibp-proxy:8080/api/",
        userAgent: "my-app 1.0",
      }),
    ).resolves.toEqual(EMAIL_RANGE_RESULTS);
  });

  it("requests the six-character email prefix and returns the documented suffixes and breach names", async () => {
    expect.assertions(3);
    server.use(
      http.get("*", ({ request }) => {
        expect(request.method).toBe("GET");
        expect(request.url).toBe(
          "https://haveibeenpwned.com/api/v3/breachedaccount/range/6B5917",
        );
        return Response.json(EMAIL_RANGE_RESULTS);
      }),
    );

    await expect(breachedAccountRange(EMAIL_SHA1_PREFIX)).resolves.toEqual([
      {
        hashSuffix: "C6C0AADE0C085843D66E4944E108C4A4CD",
        websites: ["Adobe", "Gawker", "Stratfor"],
      },
    ]);
  });
});
