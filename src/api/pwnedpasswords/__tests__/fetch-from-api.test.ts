import { http } from 'msw';
import { server } from '../../../mocks/server.js';
import { BAD_REQUEST, OK } from '../responses.js';
import { fetchFromApi } from '../fetch-from-api.js';

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      return expect(
        fetchFromApi('/service', { baseUrl: 'relativeBaseUrl' }),
      ).rejects.toMatchInlineSnapshot(`[TypeError: Invalid URL]`);
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', async () => {
      server.use(
        http.get('*', () => {
          return new Response(BAD_REQUEST.body, {
            status: BAD_REQUEST.status,
          });
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
        http.get('*', () => {
          return new Response(null, {
            status: 599,
            statusText: 'Unknown - something unexpected happened.',
          });
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
        http.get('*', ({ request }) => {
          return request.headers.has('User-Agent')
            ? new Response(body, { status: OK.status })
            : new Response(null, { status: 401 });
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
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(body, { status: OK.status });
        }),
      );

      return expect(fetchFromApi(endpoint, { baseUrl })).resolves.toBe(body);
    });
  });
});
