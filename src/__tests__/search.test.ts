import { describe, it, expect, expectTypeOf } from "vitest";
import { http } from "msw/http";
import { server } from "../../mocks/server.js";
import {
  VERIFIED_BREACH,
  PASTE,
  PASTE_WITHOUT_TITLE,
  PASTE_WITH_NULL_DATE,
} from "../../test/fixtures.js";
import { search } from "../search.js";

describe("search", () => {
  const BREACHES = [{ Name: VERIFIED_BREACH.Name }];
  const BREACHES_EXPANDED = [VERIFIED_BREACH];
  const PASTES = [PASTE, PASTE_WITHOUT_TITLE, PASTE_WITH_NULL_DATE];

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

  it("types absent paste titles and null paste dates", async () => {
    server.use(
      http.get(/breachedaccount/, () => {
        return new Response(JSON.stringify(BREACHES));
      }),
      http.get(/pasteaccount/, () => {
        return new Response(JSON.stringify(PASTES));
      }),
    );

    const { pastes } = await search("pasted@email.com");
    type Result = NonNullable<typeof pastes>[number];
    expectTypeOf<Result["Title"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<Result["Date"]>().toEqualTypeOf<string | null>();
    expect(pastes).toEqual(PASTES);
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
