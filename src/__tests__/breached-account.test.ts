import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { VERIFIED_BREACH, UNVERIFIED_BREACH } from "../../test/fixtures.js";
import { breachedAccount, type Breach } from "../hibp.js";

describe("breachedAccount", () => {
  const BREACHED_ACCOUNT_DATA = [
    { Name: VERIFIED_BREACH.Name },
    { Name: UNVERIFIED_BREACH.Name },
  ];
  const BREACHED_ACCOUNT_DATA_EXPANDED = [VERIFIED_BREACH, UNVERIFIED_BREACH];
  const BREACHED_ACCOUNT_DATA_NO_UNVERIFIED = [{ Name: VERIFIED_BREACH.Name }];

  describe("truncate option", () => {
    it.each([undefined, true, false])(
      "preserves missing results and query parameters with truncate: %s",
      async (truncate) => {
        server.use(
          http.get("*", ({ request }) => {
            const { searchParams } = new URL(request.url);
            expect(searchParams.get("truncateResponse")).toBe(
              truncate === false ? "false" : null,
            );
            return new Response(null, { status: 404 });
          }),
        );

        await expect(
          breachedAccount("missing", { truncate }),
        ).resolves.toBeNull();
      },
    );

    it.each([true, false])(
      "types breach results with dynamic truncate: %s",
      async (truncate) => {
        server.use(
          http.get("*", ({ request }) => {
            const full =
              new URL(request.url).searchParams.get("truncateResponse") ===
              "false";
            return new Response(
              JSON.stringify(
                full ? BREACHED_ACCOUNT_DATA_EXPANDED : BREACHED_ACCOUNT_DATA,
              ),
            );
          }),
        );

        const defaults = await breachedAccount("breached");
        const undefinedTruncate = await breachedAccount("breached", {
          truncate: undefined,
        });
        expectTypeOf(undefinedTruncate).toEqualTypeOf<
          Pick<Breach, "Name">[] | null
        >();
        const omitted = await breachedAccount("breached", {
          domain: "adobe.com",
        });
        const truncated = await breachedAccount("breached", { truncate: true });
        const full = await breachedAccount("breached", { truncate: false });
        const dynamic = await breachedAccount("breached", { truncate });
        const optionalOptions: { truncate?: boolean } = {};
        const optional = await breachedAccount("breached", optionalOptions);

        expectTypeOf(defaults).toEqualTypeOf<Pick<Breach, "Name">[] | null>();
        expectTypeOf(omitted).toEqualTypeOf<Pick<Breach, "Name">[] | null>();
        expectTypeOf(truncated).toEqualTypeOf<Pick<Breach, "Name">[] | null>();
        expectTypeOf(full).toEqualTypeOf<Breach[] | null>();
        expectTypeOf(dynamic).toEqualTypeOf<
          Breach[] | Pick<Breach, "Name">[] | null
        >();
        expectTypeOf(optional).toEqualTypeOf<
          Breach[] | Pick<Breach, "Name">[] | null
        >();
        // @ts-expect-error Default results only expose the breach name.
        expect(defaults?.[0].Title).toBeUndefined();
        // @ts-expect-error Explicit truncation only exposes the breach name.
        expect(truncated?.[0].Title).toBeUndefined();
        // @ts-expect-error A dynamic option does not guarantee full breach data.
        void dynamic?.[0].Title;
        expect(full?.[0].Title).toBe(VERIFIED_BREACH.Title);
        expect(defaults).toEqual(BREACHED_ACCOUNT_DATA);
        expect(dynamic).toEqual(
          truncate ? BREACHED_ACCOUNT_DATA : BREACHED_ACCOUNT_DATA_EXPANDED,
        );
      },
    );

    it("sets the truncateResponse query parameter in the request", async () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("truncateResponse")).toBe("false");
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA_EXPANDED));
        }),
      );

      return breachedAccount("breached", { truncate: false });
    });
  });

  describe("includeUnverified option", () => {
    it("sets the includeUnverified query parameter in the request", async () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("includeUnverified")).toBe("false");
          return new Response(
            JSON.stringify(BREACHED_ACCOUNT_DATA_NO_UNVERIFIED),
          );
        }),
      );

      return breachedAccount("breached", { includeUnverified: false });
    });
  });

  describe("domain option", () => {
    it("sets the domain query parameter in the request", () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("domain")).toBe("foo.bar");
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }),
      );

      return breachedAccount("breached", { domain: "foo.bar" });
    });
  });

  describe("apiKey option", () => {
    it("sets the hibp-api-key header", async () => {
      expect.assertions(1);
      const apiKey = "my-api-key";
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("hibp-api-key")).toBe(apiKey);
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }),
      );

      return breachedAccount("breached", { apiKey });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }),
      );

      return expect(breachedAccount("breached", { baseUrl })).resolves.toEqual(
        BREACHED_ACCOUNT_DATA,
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
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }),
      );

      return expect(
        breachedAccount("breached", { timeoutMs }),
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
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }),
      );

      return breachedAccount("breached", { userAgent });
    });
  });
});
