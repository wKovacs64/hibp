import { http } from 'msw';
import { server } from '../mocks/server.js';
import {
  EXAMPLE_PASSWORD,
  EXAMPLE_SHA1_RESPONSE_BODY,
} from '../../test/fixtures.js';
import { pwnedPassword } from '../pwned-password.js';

describe('pwnedPassword', () => {
  describe('pwned', () => {
    it('resolves to number > 0', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPassword(EXAMPLE_PASSWORD)).resolves.toBeGreaterThan(
        0,
      );
    });
  });

  describe('clean', () => {
    it('resolves to 0', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPassword('kjfhsdksjf454145jkhk!!!')).resolves.toBe(0);
    });
  });

  describe('baseUrl option', () => {
    it('is the beginning of the final URL', () => {
      const baseUrl = 'https://my-hibp-proxy:8080';
      server.use(
        http.get(new RegExp(`^${baseUrl}`), () => {
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPassword(EXAMPLE_PASSWORD, { baseUrl }),
      ).resolves.toBeGreaterThanOrEqual(0);
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      expect.assertions(1);
      const userAgent = 'Custom UA';
      server.use(
        http.get('*', ({ request }) => {
          expect(request.headers.get('User-Agent')).toBe(userAgent);
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return pwnedPassword(EXAMPLE_PASSWORD, { userAgent });
    });
  });

  describe('addPadding option', () => {
    it('causes Add-Padding header to be included in the request', () => {
      expect.assertions(1);
      server.use(
        http.get('*', ({ request }) => {
          expect(request.headers.get('Add-Padding')).toBe('true');
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return pwnedPassword(EXAMPLE_PASSWORD, { addPadding: true });
    });
  });
});
