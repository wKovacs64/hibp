import { server, rest } from '../../../mocks/server';
import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  BLOCKED,
  TOO_MANY_REQUESTS,
} from '../responses';
import { fetchFromApi } from '../fetchFromApi';

describe('internal (haveibeenpwned): fetchFromApi', () => {
  const apiKey = 'my-api-key';

  describe('User-Agent', () => {
    // Node
    it('sends a custom User-Agent request header when outside the browser', async () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return req.headers.get('User-Agent')?.includes('hibp')
            ? res.once(ctx.status(OK.status), ctx.json(null))
            : res.once(ctx.status(FORBIDDEN.status));
        }),
      );

      const originalNavigator = global.navigator;

      // @ts-expect-error: faking a non-browser (Node) environment
      delete global.navigator;

      await expect(fetchFromApi('/service')).resolves.toBeNull();

      global.navigator = originalNavigator;
    });

    // Browser
    it('sends a natural User-Agent request header when inside the browser', () => {
      // Note: this test is _kinda_ bogus because it runs in Node so node-fetch
      // is used to make the request and node-fetch sends its own UA, whereas in
      // a browser environment, the browser would send its own UA. But I think
      // it accomplishes the same thing by checking for our custom UA (which we
      // don't want to see).
      server.use(
        rest.get('*', (req, res, ctx) => {
          return !req.headers.get('User-Agent')?.includes('hibp')
            ? res.once(ctx.status(OK.status), ctx.json(null))
            : res.once(ctx.status(FORBIDDEN.status));
        }),
      );

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      global.navigator = {} as Navigator;

      return expect(fetchFromApi('/service')).resolves.toBeNull();
    });
  });

  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      return expect(
        fetchFromApi('/service', { baseUrl: 'relativeBaseUrl' }),
      ).rejects.toMatchInlineSnapshot(
        `[TypeError: Only absolute URLs are supported]`,
      );
    });
  });

  describe('invalid account format', () => {
    it('throws a "Bad Request" error', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(
            ctx.status(BAD_REQUEST.status, BAD_REQUEST.statusText),
          );
        }),
      );

      return expect(
        fetchFromApi('/service/bad_request', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Bad request — the account does not comply with an acceptable format.]`,
      );
    });
  });

  describe('unauthorized', () => {
    it('throws an "Unauthorized" error', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body),
          );
        }),
      );

      return expect(
        fetchFromApi('/service/unauthorized'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Access denied due to missing hibp-api-key.]`,
      );
    });
  });

  describe('forbidden request', () => {
    it('throws a "Forbidden" error if no cf-ray header is present', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(ctx.status(FORBIDDEN.status, FORBIDDEN.statusText));
        }),
      );

      return expect(
        fetchFromApi('/service/forbidden', { apiKey }),
      ).rejects.toMatchInlineSnapshot(`[Error: Forbidden - access denied.]`);
    });

    it('throws a "Blocked Request" error if a cf-ray header is present', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          const headerTransformers = Array.from(BLOCKED.headers).map(
            ([header, value]) => ctx.set(header, value),
          );
          return res.once(ctx.status(BLOCKED.status), ...headerTransformers);
        }),
      );

      return expect(
        fetchFromApi('/service/blocked', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Request blocked, contact haveibeenpwned.com if this continues (Ray ID: someRayId)]`,
      );
    });
  });

  describe('rate limited', () => {
    it('throws a "Too Many Requests" error', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(
            ctx.status(TOO_MANY_REQUESTS.status),
            ctx.json(TOO_MANY_REQUESTS.body),
          );
        }),
      );

      return expect(
        fetchFromApi('/service/rate_limited', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Rate limit is exceeded. Try again in 2 seconds.]`,
      );
    });
  });

  describe('unexpected HTTP error', () => {
    it('throws an error with the response status text', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(
            ctx.status(999, 'Unknown - something unexpected happened.'),
          );
        }),
      );

      return expect(
        fetchFromApi('/service/unknown_response'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Unknown - something unexpected happened.]`,
      );
    });
  });

  describe('apiKey option', () => {
    it('is passed on as a request header', () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return req.headers.get('hibp-api-key')
            ? res.once(ctx.status(OK.status), ctx.json(null))
            : res.once(ctx.status(UNAUTHORIZED.status));
        }),
      );

      return expect(fetchFromApi('/service', { apiKey })).resolves.toBeNull();
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      const ua = 'custom UA';

      server.use(
        rest.get('*', (req, res, ctx) => {
          return req.headers.get('User-Agent')?.includes(ua)
            ? res.once(ctx.status(OK.status), ctx.json(null))
            : res.once(ctx.status(UNAUTHORIZED.status));
        }),
      );

      return expect(
        fetchFromApi('/service', { userAgent: ua }),
      ).resolves.toBeNull();
    });
  });

  describe('baseUrl option', () => {
    it('is used in the final URL', () => {
      const baseUrl = 'https://my-hibp-proxy:8080';
      const endpoint = '/service';

      server.use(
        rest.get(new RegExp(`^${baseUrl}`), (_, res, ctx) => {
          return res.once(ctx.status(OK.status), ctx.json(null));
        }),
      );

      return expect(fetchFromApi(endpoint, { baseUrl })).resolves.toBeNull();
    });
  });
});
