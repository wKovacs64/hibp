import { server, rest } from '../../../mocks/server';
import { BAD_REQUEST, OK } from '../responses';
import { fetchFromApi } from '../fetchFromApi';

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      return expect(
        fetchFromApi('/service', { baseUrl: 'relativeBaseUrl' }),
      ).rejects.toMatchInlineSnapshot(
        `[TypeError: Only absolute URLs are supported]`,
      );
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(
            ctx.status(BAD_REQUEST.status),
            ctx.body(BAD_REQUEST.body as string),
          );
        }),
      );

      return expect(
        fetchFromApi('/service/bad_request'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: The hash prefix was not in a valid format]`,
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

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      const ua = 'custom UA';
      const body = '1234\n5678';

      server.use(
        rest.get('*', (req, res, ctx) => {
          return req.headers.get('User-Agent')
            ? res.once(ctx.status(OK.status), ctx.body(body))
            : res.once(ctx.status(401));
        }),
      );

      return expect(fetchFromApi('/service', { userAgent: ua })).resolves.toBe(
        body,
      );
    });
  });

  describe('baseUrl option', () => {
    it('is used in the final URL', () => {
      const baseUrl = 'https://my-hibp-proxy:8080';
      const endpoint = '/service/whatever';
      const body = '1234\n5678';

      server.use(
        rest.get(new RegExp(`^${baseUrl}`), (_, res, ctx) => {
          return res.once(ctx.status(OK.status), ctx.body(body));
        }),
      );

      return expect(fetchFromApi(endpoint, { baseUrl })).resolves.toBe(body);
    });
  });
});
