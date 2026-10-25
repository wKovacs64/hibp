import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { VERIFIED_BREACH } from "../../test/fixtures.js";
import { latestBreach } from "../hibp.js";

describe("latestBreach", () => {
  describe("found", () => {
    it("resolves with full breach data from the remote API", async () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      const data = await latestBreach();

      expectTypeOf(data?.IsStealerLog).toEqualTypeOf<boolean | undefined>();
      expectTypeOf(data?.Attribution).toEqualTypeOf<
        string | null | undefined
      >();
      expectTypeOf(data?.DisclosureUrl).toEqualTypeOf<
        string | null | undefined
      >();
      expect(data).toEqual(VERIFIED_BREACH);
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

      return expect(latestBreach({ baseUrl })).resolves.toEqual(
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

      return expect(latestBreach({ timeoutMs })).rejects.toThrow(/./);
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

      return latestBreach({ userAgent });
    });
  });
});
