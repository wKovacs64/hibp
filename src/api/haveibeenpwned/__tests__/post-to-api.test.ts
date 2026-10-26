import { describe, it, expect } from "vitest";
import { http } from "msw/http";
import { server } from "../../../../mocks/server.js";
import {
  DNS_VERIFICATION_FAILURE,
  MISSING_API_KEY,
} from "../../../../test/fixtures.js";
import { BLOCKED, TOO_MANY_REQUESTS } from "../responses.js";
import { RateLimitError } from "../fetch-from-api.js";
import { postToApi } from "../post-to-api.js";

describe("internal (haveibeenpwned): postToApi", () => {
  const body = { DomainName: "example.com" };

  describe("request", () => {
    it("sends the body as JSON with the API key", async () => {
      expect.assertions(4);
      server.use(
        http.post("*", async ({ request }) => {
          expect(request.url).toBe("https://haveibeenpwned.com/api/v3/service");
          expect(request.headers.get("hibp-api-key")).toBe("my-api-key");
          expect(request.headers.get("content-type")).toBe("application/json");
          expect(await request.json()).toEqual(body);
          return new Response(null);
        }),
      );

      await postToApi("/service", body, { apiKey: "my-api-key" });
    });
  });

  describe("success", () => {
    it("resolves with the response without reading its body", async () => {
      server.use(http.post("*", () => new Response("not json")));

      const response = await postToApi("/service", body);
      expect(response.bodyUsed).toBe(false);
    });
  });

  // Status variants exercise error handling; they are not live captures.
  describe("failure with a JSON message", () => {
    it.each([400, 401, 403, 404, 409, 500])(
      "rejects with the message for HTTP %i",
      (status) => {
        server.use(
          http.post("*", () =>
            Response.json(DNS_VERIFICATION_FAILURE, {
              status,
              headers: { "cf-ray": "someRayId" },
            }),
          ),
        );

        return expect(postToApi("/service", body)).rejects.toThrow(
          DNS_VERIFICATION_FAILURE.message,
        );
      },
    );

    it("unwraps the observed missing-key response", () => {
      server.use(
        http.post("*", () => Response.json(MISSING_API_KEY, { status: 401 })),
      );

      return expect(postToApi("/service", body)).rejects.toThrow(
        /^Access denied due to missing hibp-api-key\.$/,
      );
    });
  });

  describe("blocked", () => {
    it("rejects with the Ray ID", () => {
      server.use(
        http.post(
          "*",
          () =>
            new Response("<!DOCTYPE html><title>Attention Required</title>", {
              status: BLOCKED.status,
              headers: {
                "content-type": "text/html",
                "cf-ray": "someRayId",
              },
            }),
        ),
      );

      return expect(postToApi("/service", body)).rejects.toMatchInlineSnapshot(
        `[Error: Request blocked, contact haveibeenpwned.com if this continues (Ray ID: someRayId)]`,
      );
    });
  });

  describe("failure with a plain-text body", () => {
    it.each(["text/plain;charset=UTF-8", "Text/Plain; charset=utf-8"])(
      "rejects with the body for content type %s",
      (type) => {
        server.use(
          http.post(
            "*",
            () =>
              new Response("Domain verification is unavailable.", {
                status: 503,
                headers: { "content-type": type },
              }),
          ),
        );

        return expect(postToApi("/service", body)).rejects.toThrow(
          /^Domain verification is unavailable\.$/,
        );
      },
    );
  });

  describe("failure without a reason", () => {
    it.each([
      { case: "an empty JSON body", body: "", type: "application/json" },
      { case: "an invalid JSON body", body: "{", type: "application/json" },
      {
        case: "a JSON body without a message",
        body: JSON.stringify({ statusCode: 503 }),
        type: "application/json",
      },
      {
        case: "a blank JSON message",
        body: JSON.stringify({ message: " " }),
        type: "application/json",
      },
      { case: "a blank plain-text body", body: " \n", type: "text/plain" },
      { case: "an empty body", body: null, type: "" },
      {
        case: "an HTML body",
        body: "<!DOCTYPE html><title>Service Unavailable</title>",
        type: "text/html",
      },
    ])("rejects with the HTTP status for $case", ({ body: text, type }) => {
      server.use(
        http.post(
          "*",
          () =>
            new Response(text, {
              status: 503,
              statusText: "Service Unavailable",
              headers: type ? { "content-type": type } : undefined,
            }),
        ),
      );

      return expect(postToApi("/service", body)).rejects.toThrow(
        /^503 Service Unavailable$/,
      );
    });
  });

  describe("rate limited", () => {
    it("throws a RateLimitError with the retry delay", async () => {
      server.use(
        http.post("*", () =>
          Response.json(TOO_MANY_REQUESTS.body, {
            status: TOO_MANY_REQUESTS.status,
            headers: Array.from(TOO_MANY_REQUESTS.headers),
          }),
        ),
      );

      const error = await postToApi("/service", body).catch(
        (caught: unknown) => caught,
      );
      expect(error).toBeInstanceOf(RateLimitError);
      expect(error).toMatchObject({
        message: TOO_MANY_REQUESTS.body.message,
        retryAfterSeconds: 2,
      });
    });
  });
});
