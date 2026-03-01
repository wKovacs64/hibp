import { describe, it, expect, beforeEach } from "vitest";
import { http } from "msw";
import { server } from "../../../mocks/server.js";
import { buildUrl, buildHeaders, baseFetch } from "../base-fetch.js";

describe("internal: buildUrl", () => {
  describe("base URL normalization", () => {
    it("strips trailing slash from base URL", () => {
      expect(buildUrl("https://example.com/", "/endpoint")).toBe(
        "https://example.com/endpoint",
      );
    });

    it("handles base URL without trailing slash", () => {
      expect(buildUrl("https://example.com", "/endpoint")).toBe(
        "https://example.com/endpoint",
      );
    });
  });

  describe("endpoint normalization", () => {
    it("handles endpoint with leading slash", () => {
      expect(buildUrl("https://example.com", "/endpoint")).toBe(
        "https://example.com/endpoint",
      );
    });

    it("adds leading slash to endpoint when missing", () => {
      expect(buildUrl("https://example.com", "endpoint")).toBe(
        "https://example.com/endpoint",
      );
    });
  });

  describe("query params", () => {
    it("appends query params to URL", () => {
      expect(buildUrl("https://example.com", "/endpoint", { foo: "bar" })).toBe(
        "https://example.com/endpoint?foo=bar",
      );
    });

    it("appends multiple query params", () => {
      expect(
        buildUrl("https://example.com", "/endpoint", {
          foo: "bar",
          baz: "qux",
        }),
      ).toBe("https://example.com/endpoint?foo=bar&baz=qux");
    });

    it("encodes query param values", () => {
      expect(
        buildUrl("https://example.com", "/endpoint", { foo: "bar baz" }),
      ).toBe("https://example.com/endpoint?foo=bar+baz");
    });

    it("returns URL without query string when queryParams is undefined", () => {
      expect(buildUrl("https://example.com", "/endpoint")).toBe(
        "https://example.com/endpoint",
      );
    });

    it("returns URL without query string when queryParams is empty", () => {
      expect(buildUrl("https://example.com", "/endpoint", {})).toBe(
        "https://example.com/endpoint",
      );
    });
  });
});

describe("internal: buildHeaders", () => {
  describe("extra headers", () => {
    it("returns extra headers when provided", () => {
      expect(buildHeaders(undefined, { "X-Custom": "value" })).toEqual({
        "X-Custom": "value",
      });
    });

    it("returns empty object when no args provided", () => {
      expect(buildHeaders()).toEqual({});
    });
  });

  describe("User-Agent", () => {
    it("uses custom userAgent when provided", () => {
      const result = buildHeaders("custom-agent");
      expect(result["User-Agent"]).toBe("custom-agent");
    });

    it("merges custom userAgent with extra headers", () => {
      const result = buildHeaders("custom-agent", { "X-Custom": "value" });
      expect(result).toEqual({
        "User-Agent": "custom-agent",
        "X-Custom": "value",
      });
    });

    it("uses default User-Agent when outside browser (no navigator)", () => {
      const originalNavigator = global.navigator;
      // @ts-expect-error: faking a non-browser (Node) environment
      delete global.navigator;

      const result = buildHeaders();
      expect(result["User-Agent"]).toMatch(/^hibp \d+\.\d+\.\d+/);

      global.navigator = originalNavigator;
    });

    it("does not set User-Agent when inside browser (navigator exists)", () => {
      const originalNavigator = global.navigator;
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      global.navigator = {} as Navigator;

      const result = buildHeaders();
      expect(result["User-Agent"]).toBeUndefined();

      global.navigator = originalNavigator;
    });
  });
});

describe("internal: baseFetch", () => {
  beforeEach(() => {
    server.use(
      http.get("*", () => {
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
  });

  describe("AbortSignal", () => {
    it("cancels request when signal is aborted", async () => {
      const controller = new AbortController();
      const abortPromise = baseFetch({
        baseUrl: "https://example.com",
        endpoint: "/test",
        signal: controller.signal,
      });

      controller.abort();

      await expect(abortPromise).rejects.toThrow();
    });

    it("works with timeout alone", async () => {
      const response = await baseFetch({
        baseUrl: "https://example.com",
        endpoint: "/test",
        timeoutMs: 5000,
      });

      expect(response.ok).toBe(true);
    });

    it("timeout fires first when both timeout and signal are provided", async () => {
      server.use(
        http.get("*", async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
          });
        }),
      );

      const controller = new AbortController();
      const timeoutPromise = baseFetch({
        baseUrl: "https://example.com",
        endpoint: "/test",
        timeoutMs: 100,
        signal: controller.signal,
      });

      await expect(timeoutPromise).rejects.toThrow();
    });

    it("signal fires first when aborted before timeout", async () => {
      const controller = new AbortController();
      const abortPromise = baseFetch({
        baseUrl: "https://example.com",
        endpoint: "/test",
        timeoutMs: 5000,
        signal: controller.signal,
      });

      controller.abort();

      await expect(abortPromise).rejects.toThrow();
    });

    it("does not set signal when neither timeout nor signal provided", async () => {
      const response = await baseFetch({
        baseUrl: "https://example.com",
        endpoint: "/test",
      });

      expect(response.ok).toBe(true);
    });
  });
});
