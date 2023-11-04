import { http } from 'msw';
import { server } from '../mocks/server.js';
import { VERIFIED_BREACH } from '../../test/fixtures.js';
import { breaches } from '../breaches.js';

describe('breaches', () => {
  const BREACHES = [VERIFIED_BREACH];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        http.get('*', () => {
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      return expect(breaches()).resolves.toEqual(BREACHES);
    });
  });

  describe('with domain', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        http.get('*', ({ request }) => {
          const url = new URL(request.url);
          if (url.searchParams.get('domain') === 'foo.bar') {
            return new Response(JSON.stringify(BREACHES));
          }
          return new Response(null, { status: 418 });
        }),
      );

      return expect(breaches({ domain: 'foo.bar' })).resolves.toEqual(BREACHES);
    });
  });
});
