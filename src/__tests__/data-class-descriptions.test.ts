import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import { DATA_CLASS_DESCRIPTIONS } from "../../test/fixtures.js";
import { respondOnAbort } from "../../test/handlers.js";
import { dataClassDescriptions } from "../data-class-descriptions.js";

describe("dataClassDescriptions", () => {
  describe("no parameters", () => {
    it("resolves with data from the remote API", () => {
      expect.assertions(2);
      server.use(
        http.get("*", ({ request }) => {
          expect(request.url).toBe(
            "https://haveibeenpwned.com/api/v3/dataclasses/descriptions",
          );
          return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
        }),
      );

      return expect(dataClassDescriptions()).resolves.toEqual(
        DATA_CLASS_DESCRIPTIONS,
      );
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
        }),
      );

      return expect(dataClassDescriptions({ baseUrl })).resolves.toEqual(
        DATA_CLASS_DESCRIPTIONS,
      );
    });
  });

  describe("timeoutMs option", () => {
    it("aborts the request after the given value", () => {
      expect.assertions(1);
      server.use(http.get("*", respondOnAbort));

      return expect(
        dataClassDescriptions({ timeoutMs: 1 }),
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
          return new Response(JSON.stringify(DATA_CLASS_DESCRIPTIONS));
        }),
      );

      return dataClassDescriptions({ userAgent });
    });
  });
});
