import { http } from 'msw';
import { server } from '../mocks/server.js';
import {
  EXAMPLE_NTLM_RESPONSE_BODY,
  EXAMPLE_NTLM_SUFFIXES_OBJECT,
  EXAMPLE_SHA1_PREFIX,
  EXAMPLE_SHA1_RESPONSE_BODY,
  EXAMPLE_SHA1_SUFFIXES_OBJECT,
} from '../../test/fixtures.js';
import { pwnedPasswordRange } from '../pwned-password-range.js';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('resolves with an object', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return expect(pwnedPasswordRange(EXAMPLE_SHA1_PREFIX)).resolves.toEqual(
        EXAMPLE_SHA1_SUFFIXES_OBJECT,
      );
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
        pwnedPasswordRange(EXAMPLE_SHA1_PREFIX, { baseUrl }),
      ).resolves.toEqual(EXAMPLE_SHA1_SUFFIXES_OBJECT);
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      expect.assertions(2);
      const userAgent = 'Custom UA';
      server.use(
        http.get('*', ({ request }) => {
          expect(request.headers.get('User-Agent')).toBe(userAgent);
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPasswordRange(EXAMPLE_SHA1_PREFIX, { userAgent }),
      ).resolves.toEqual(EXAMPLE_SHA1_SUFFIXES_OBJECT);
    });
  });

  describe('addPadding option', () => {
    it('causes Add-Padding header to be included in the request', async () => {
      expect.assertions(1);
      server.use(
        http.get('*', ({ request }) => {
          expect(request.headers.get('Add-Padding')).toBe('true');
          return new Response(EXAMPLE_SHA1_RESPONSE_BODY);
        }),
      );

      await pwnedPasswordRange(EXAMPLE_SHA1_PREFIX, { addPadding: true });
    });
  });

  describe('mode option', () => {
    it('sets the mode query parameter in the request', async () => {
      expect.assertions(2);
      server.use(
        http.get('*', ({ request }) => {
          const { searchParams } = new URL(request.url);
          expect(searchParams.get('mode')).toBe('ntlm');
          return new Response(EXAMPLE_NTLM_RESPONSE_BODY);
        }),
      );

      return expect(
        pwnedPasswordRange(EXAMPLE_SHA1_PREFIX, { mode: 'ntlm' }),
      ).resolves.toEqual(EXAMPLE_NTLM_SUFFIXES_OBJECT);
    });
  });
});
