import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { DATA_CLASS_DESCRIPTIONS } from "../../test/fixtures.js";
import {
  dataClassDescriptions,
  RateLimitError,
  type DataClassDescription,
  type HIBP,
} from "../hibp.js";
import {
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from "../api/haveibeenpwned/responses.js";

describe("dataClassDescriptions", () => {
  it("fetches lowercase data class names and descriptions without an API key", async () => {
    expect.assertions(2);
    server.use(
      http.get(
        "https://haveibeenpwned.com/api/v3/dataclasses/descriptions",
        ({ request }) => {
          expect(request.headers.has("hibp-api-key")).toBe(false);
          return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
        },
      ),
    );

    const data = await dataClassDescriptions();
    expect(data).toEqual(DATA_CLASS_DESCRIPTIONS);
    expectTypeOf(data).toEqualTypeOf<DataClassDescription[] | null>();
    expectTypeOf<DataClassDescription>().toEqualTypeOf<{
      name: string;
      description: string;
    }>();
    expectTypeOf<typeof dataClassDescriptions>().toEqualTypeOf<
      HIBP["dataClassDescriptions"]
    >();
  });

  it("preserves the endpoint path under a custom base URL", () => {
    server.use(
      http.get(
        "https://my-hibp-proxy:8080/api/dataclasses/descriptions",
        () => {
          return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
        },
      ),
    );

    return expect(
      dataClassDescriptions({ baseUrl: "https://my-hibp-proxy:8080/api/" }),
    ).resolves.toEqual(DATA_CLASS_DESCRIPTIONS);
  });

  it("aborts the request after timeoutMs", () => {
    const timeoutMs = 1;
    server.use(
      http.get("*", async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, timeoutMs + 1);
        });
        return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
      }),
    );

    return expect(dataClassDescriptions({ timeoutMs })).rejects.toMatchObject({
      name: "TimeoutError",
    });
  });

  it("cancels an in-flight request with the caller's signal", async () => {
    const controller = new AbortController();
    server.use(
      http.get("*", ({ request }) => {
        return new Promise<Response>((resolve) => {
          request.signal.addEventListener("abort", () => {
            resolve(new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS)));
          });
          controller.abort();
        });
      }),
    );

    await expect(
      dataClassDescriptions({ signal: controller.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("sends the custom userAgent header", () => {
    expect.assertions(1);
    server.use(
      http.get("*", ({ request }) => {
        expect(request.headers.get("User-Agent")).toBe("Custom UA");
        return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
      }),
    );

    return dataClassDescriptions({ userAgent: "Custom UA" });
  });

  it("resolves to null for a 404 response", () => {
    server.use(
      http.get("*", () => {
        return new Response(null, NOT_FOUND);
      }),
    );

    return expect(dataClassDescriptions()).resolves.toBeNull();
  });

  it("rejects with the rate limit error and retry interval", async () => {
    server.use(
      http.get("*", () => {
        return new Response(JSON.stringify(TOO_MANY_REQUESTS.body), {
          status: TOO_MANY_REQUESTS.status,
          headers: Object.fromEntries(TOO_MANY_REQUESTS.headers),
        });
      }),
    );

    await expect(dataClassDescriptions()).rejects.toMatchObject(
      new RateLimitError("2", TOO_MANY_REQUESTS.body.message),
    );
  });
});
