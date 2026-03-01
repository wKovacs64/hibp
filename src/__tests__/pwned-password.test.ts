import { describe, it, expect, vi } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { PASSWORD, SHA1_RESPONSE_BODY } from "../../test/fixtures.js";
import { pwnedPassword } from "../pwned-password.js";

describe("pwnedPassword", () => {
  describe("environment", () => {
    it("rejects when the Web Crypto API is unavailable", async () => {
      expect.assertions(1);
      vi.stubGlobal("crypto", undefined as unknown as Crypto);
      try {
        await pwnedPassword("anything");
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: The Web Crypto API is not available in this environment.]`,
        );
      } finally {
        vi.unstubAllGlobals();
      }
    });
  });

  describe("pwned", () => {
    it("resolves to number > 0", () => {
      server.use(
        http.get("*", () => {
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPassword(PASSWORD)).resolves.toBeGreaterThan(0);
    });
  });

  describe("clean", () => {
    it("resolves to 0", () => {
      server.use(
        http.get("*", () => {
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPassword("kjfhsdksjf454145jkhk!!!")).resolves.toBe(0);
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPassword(PASSWORD, { baseUrl }),
      ).resolves.toBeGreaterThanOrEqual(0);
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
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPassword(PASSWORD, { timeoutMs }),
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
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return pwnedPassword(PASSWORD, { userAgent });
    });
  });

  describe("addPadding option", () => {
    it("causes Add-Padding header to be included in the request", () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("Add-Padding")).toBe("true");
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return pwnedPassword(PASSWORD, { addPadding: true });
    });
  });
});
