import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { VERIFIED_BREACH } from "../../test/fixtures.js";
import { respondOnAbort } from "../../test/handlers.js";
import { breaches } from "../hibp.js";

describe("breaches", () => {
  const BREACHES = [VERIFIED_BREACH];

  describe("isSpamList option", () => {
    it("sends true to request only spam-list breaches", async () => {
      const spamLists = [{ ...VERIFIED_BREACH, IsSpamList: true }];
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("isSpamList")).toBe("true");
          return new Response(JSON.stringify(spamLists));
        }),
      );

      await expect(breaches({ isSpamList: true })).resolves.toEqual(spamLists);
    });

    it("sends false to request only non-spam-list breaches", async () => {
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("isSpamList")).toBe("false");
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      await expect(breaches({ isSpamList: false })).resolves.toEqual(BREACHES);
    });

    it.each([
      { isSpamList: true, expected: "true" },
      { isSpamList: false, expected: "false" },
    ])(
      "preserves domain encoding when isSpamList is $isSpamList",
      async ({ isSpamList, expected }) => {
        expect.assertions(2);
        server.use(
          http.get("*", ({ request }) => {
            const { searchParams } = new URL(request.url);
            expect(Object.fromEntries(searchParams)).toEqual({
              domain: "foo.bar&other=value",
              isSpamList: expected,
            });
            return new Response(JSON.stringify([]));
          }),
        );

        await expect(
          breaches({ domain: "foo.bar&other=value", isSpamList }),
        ).resolves.toEqual([]);
      },
    );
  });

  describe("no parameters", () => {
    it.each([undefined, {}, { isSpamList: undefined }])(
      "omits the spam-list filter for options %j",
      async (options) => {
        const allBreaches = [
          VERIFIED_BREACH,
          { ...VERIFIED_BREACH, IsSpamList: true },
        ];
        expect.assertions(2);
        server.use(
          http.get("*", ({ request }) => {
            const { searchParams } = new URL(request.url);
            expect(searchParams.has("isSpamList")).toBe(false);
            return new Response(JSON.stringify(allBreaches));
          }),
        );

        await expect(breaches(options)).resolves.toEqual(allBreaches);
      },
    );
  });

  describe("domain option", () => {
    it("sets the domain query parameter in the request", () => {
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("domain")).toBe("foo.bar");
          expect(searchParams.has("isSpamList")).toBe(false);
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      return breaches({ domain: "foo.bar" });
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      return expect(breaches({ baseUrl })).resolves.toEqual(BREACHES);
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(http.get("*", respondOnAbort));

      return expect(breaches({ timeoutMs: 1 })).rejects.toMatchInlineSnapshot(
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
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      return breaches({ userAgent });
    });
  });
});
