import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import {
  VERIFIED_BREACH,
  DISCLOSED_BREACH,
  STEALER_LOG_BREACH,
} from "../../test/fixtures.js";
import { NOT_FOUND } from "../api/haveibeenpwned/responses.js";
import { breach, type Breach } from "../hibp.js";

describe("breach", () => {
  describe("found", () => {
    it.each([
      { fixture: VERIFIED_BREACH, expected: null },
      {
        fixture: DISCLOSED_BREACH,
        expected:
          "https://www.adpost.com/article/security-update-regarding-the-february-2025-adpost-data-breach",
      },
    ])(
      "exposes the disclosure URL for $fixture.Name",
      async ({ fixture, expected }) => {
        server.use(
          http.get("*", () => {
            return new Response(JSON.stringify(fixture));
          }),
        );

        const data = await breach(fixture.Name);

        expectTypeOf<Breach["DisclosureUrl"]>().toEqualTypeOf<string | null>();
        expect(data?.DisclosureUrl).toBe(expected);
      },
    );

    it.each([
      { fixture: VERIFIED_BREACH, expected: null },
      { fixture: DISCLOSED_BREACH, expected: "https://t.me/all3in" },
    ])(
      "exposes attribution for $fixture.Name",
      async ({ fixture, expected }) => {
        server.use(
          http.get("*", () => {
            return new Response(JSON.stringify(fixture));
          }),
        );

        const data = await breach(fixture.Name);

        expectTypeOf<Breach["Attribution"]>().toEqualTypeOf<string | null>();
        expect(data?.Attribution).toBe(expected);
      },
    );

    it.each([
      { fixture: VERIFIED_BREACH, expected: false },
      { fixture: STEALER_LOG_BREACH, expected: true },
    ])(
      "exposes whether $fixture.Name is sourced from stealer logs",
      async ({ fixture, expected }) => {
        server.use(
          http.get("*", () => {
            return new Response(JSON.stringify(fixture));
          }),
        );

        const data = await breach(fixture.Name);

        expectTypeOf<Breach["IsStealerLog"]>().toEqualTypeOf<boolean>();
        expect(data?.IsStealerLog).toBe(expected);
      },
    );

    it("resolves with data from the remote API", () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(breach("found")).resolves.toEqual(VERIFIED_BREACH);
    });
  });

  describe("not found", () => {
    it("resolves with null", () => {
      server.use(
        http.get("*", () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(breach("not found")).resolves.toBeNull();
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(breach("found", { baseUrl })).resolves.toEqual(
        VERIFIED_BREACH,
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
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(
        breach("found", { timeoutMs }),
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
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return breach("found", { userAgent });
    });
  });
});
