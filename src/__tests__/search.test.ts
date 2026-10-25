import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { VERIFIED_BREACH, PASTE } from "../../test/fixtures.js";
import {
  search,
  type Breach,
  type TruncatedBreach,
  type SearchResults,
} from "../hibp.js";

describe("search", () => {
  const BREACHES = [{ Name: VERIFIED_BREACH.Name }];
  const BREACHES_EXPANDED = [VERIFIED_BREACH];
  const PASTES = [PASTE];

  it.each([undefined, true, false])(
    "preserves missing results and query parameters with truncate: %s",
    async (truncate) => {
      server.use(
        http.get(/breachedaccount/, ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("truncateResponse")).toBe(
            truncate === false ? "false" : null,
          );
          return new Response(null, { status: 404 });
        }),
      );

      await expect(search("missing", { truncate })).resolves.toEqual({
        breaches: null,
        pastes: null,
      });
    },
  );

  it.each([true, false])(
    "types breach results with dynamic truncate: %s",
    async (truncate) => {
      server.use(
        http.get(/breachedaccount/, ({ request }) => {
          const full =
            new URL(request.url).searchParams.get("truncateResponse") ===
            "false";
          return new Response(
            JSON.stringify(full ? BREACHES_EXPANDED : BREACHES),
          );
        }),
      );

      const defaults = await search("breached");
      const undefinedTruncate = await search("breached", {
        truncate: undefined,
      });
      expectTypeOf(undefinedTruncate).toEqualTypeOf<SearchResults<true>>();
      const omitted = await search("breached", { domain: "adobe.com" });
      const truncated = await search("breached", { truncate: true });
      const full = await search("breached", { truncate: false });
      const dynamic = await search("breached", { truncate });
      const optionalOptions: { truncate?: boolean } = {};
      const optional = await search("breached", optionalOptions);

      expectTypeOf(defaults.breaches).toEqualTypeOf<TruncatedBreach[] | null>();
      expectTypeOf(omitted.breaches).toEqualTypeOf<TruncatedBreach[] | null>();
      expectTypeOf(truncated.breaches).toEqualTypeOf<
        TruncatedBreach[] | null
      >();
      expectTypeOf(full.breaches).toEqualTypeOf<Breach[] | null>();
      expectTypeOf(dynamic.breaches).toEqualTypeOf<
        Breach[] | TruncatedBreach[] | null
      >();
      expectTypeOf(optional.breaches).toEqualTypeOf<
        Breach[] | TruncatedBreach[] | null
      >();
      // @ts-expect-error Default results only expose the breach name.
      expect(defaults.breaches?.[0].Title).toBeUndefined();
      // @ts-expect-error Explicit truncation only exposes the breach name.
      expect(truncated.breaches?.[0].Title).toBeUndefined();
      // @ts-expect-error A dynamic option does not guarantee full breach data.
      void dynamic.breaches?.[0].Title;
      expect(full.breaches?.[0].Title).toBe(VERIFIED_BREACH.Title);
      expect(defaults).toEqual({ breaches: BREACHES, pastes: null });
      expect(dynamic.breaches).toEqual(truncate ? BREACHES : BREACHES_EXPANDED);
      expectTypeOf(defaults).toEqualTypeOf<SearchResults<true>>();
      expectTypeOf(full).toEqualTypeOf<SearchResults<false>>();
      expectTypeOf(dynamic).toEqualTypeOf<SearchResults>();
    },
  );

  it("searches breaches by username", () => {
    server.use(
      http.get(/breachedaccount/, () => {
        return new Response(JSON.stringify(BREACHES));
      }),
    );

    return expect(search("breached")).resolves.toEqual({
      breaches: BREACHES,
      pastes: null,
    });
  });

  it("searches breaches and pastes by email address", () => {
    server.use(
      http.get(/breachedaccount/, () => {
        return new Response(JSON.stringify(BREACHES));
      }),
      http.get(/pasteaccount/, () => {
        return new Response(JSON.stringify(PASTES));
      }),
    );

    return expect(search("pasted@email.com")).resolves.toEqual({
      breaches: BREACHES,
      pastes: PASTES,
    });
  });

  it("forwards the apiKey option correctly", async () => {
    expect.assertions(2);
    const apiKey = "my-api-key";
    server.use(
      http.get(/breachedaccount/, ({ request }) => {
        expect(request.headers.get("hibp-api-key")).toBe(apiKey);
        return new Response(JSON.stringify(BREACHES));
      }),
      http.get(/pasteaccount/, ({ request }) => {
        expect(request.headers.get("hibp-api-key")).toBe(apiKey);
        return new Response(JSON.stringify(PASTES));
      }),
    );

    return search("breached@foo.bar", { apiKey });
  });

  it("forwards the truncate option correctly", async () => {
    expect.assertions(2);
    server.use(
      http.get(/breachedaccount/, ({ request }) => {
        const { searchParams } = new URL(request.url);
        expect(searchParams.get("truncateResponse")).toBe("false");
        return new Response(JSON.stringify(BREACHES_EXPANDED));
      }),
      http.get(/pasteaccount/, ({ request }) => {
        const { searchParams } = new URL(request.url);
        expect(searchParams.has("truncateResponse")).toBe(false);
        return new Response(JSON.stringify(PASTES));
      }),
    );

    return search("breached@foo.bar", { truncate: false });
  });
});
