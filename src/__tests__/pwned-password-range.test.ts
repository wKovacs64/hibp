import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import {
  NTLM_RESPONSE_BODY,
  NTLM_SUFFIXES_OBJECT,
  SHA1_PREFIX,
  SHA1_RESPONSE_BODY,
  SHA1_SUFFIXES_OBJECT,
} from "../../test/fixtures.js";
import { pwnedPasswordRange } from "../pwned-password-range.js";

describe("pwnedPasswordRange", () => {
  describe("valid range", () => {
    it("resolves with an object", () => {
      server.use(
        http.get("*", () => {
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPasswordRange(SHA1_PREFIX)).resolves.toEqual(
        SHA1_SUFFIXES_OBJECT,
      );
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
        pwnedPasswordRange(SHA1_PREFIX, { baseUrl }),
      ).resolves.toEqual(SHA1_SUFFIXES_OBJECT);
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
        pwnedPasswordRange(SHA1_PREFIX, { timeoutMs }),
      ).rejects.toMatchInlineSnapshot(
        `[TimeoutError: The operation was aborted due to timeout]`,
      );
    });
  });

  describe("userAgent option", () => {
    it("is passed on as a request header", () => {
      expect.assertions(2);
      const userAgent = "Custom UA";
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("User-Agent")).toBe(userAgent);
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPasswordRange(SHA1_PREFIX, { userAgent }),
      ).resolves.toEqual(SHA1_SUFFIXES_OBJECT);
    });
  });

  describe("addPadding option", () => {
    it("causes Add-Padding header to be included in the request", async () => {
      expect.assertions(1);
      server.use(
        http.get("*", ({ request }) => {
          expect(request.headers.get("Add-Padding")).toBe("true");
          return new Response(SHA1_RESPONSE_BODY);
        }),
      );

      await pwnedPasswordRange(SHA1_PREFIX, { addPadding: true });
    });
  });

  describe("mode option", () => {
    it("sets the mode query parameter in the request", async () => {
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get("mode")).toBe("ntlm");
          return new Response(NTLM_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPasswordRange(SHA1_PREFIX, { mode: "ntlm" }),
      ).resolves.toEqual(NTLM_SUFFIXES_OBJECT);
    });
  });
});
