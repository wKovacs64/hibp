import { describe, it, expect } from "vitest";
import { http } from "msw";
import { server } from "../../mocks/server.js";
import { dataClasses } from "../data-classes.js";

describe("dataClasses", () => {
  const DATA_CLASSES = ["some", "data", "classes"];

  describe("no parameters", () => {
    it("resolves with data from the remote API", () => {
      server.use(
        http.get("*", () => {
          return new Response(JSON.stringify(DATA_CLASSES));
        }),
      );

      return expect(dataClasses()).resolves.toEqual(DATA_CLASSES);
    });
  });

  describe("baseUrl option", () => {
    it("is the beginning of the final URL", () => {
      const baseUrl = "https://my-hibp-proxy:8080";
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(JSON.stringify(DATA_CLASSES));
        }),
      );

      return expect(dataClasses({ baseUrl })).resolves.toEqual(DATA_CLASSES);
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
          return new Response(JSON.stringify(DATA_CLASSES));
        }),
      );

      return expect(dataClasses({ timeoutMs })).rejects.toMatchInlineSnapshot(
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
          return new Response(JSON.stringify(DATA_CLASSES));
        }),
      );

      return dataClasses({ userAgent });
    });
  });
});
