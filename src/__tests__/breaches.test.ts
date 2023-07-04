import { rest } from 'msw';
import { server } from '../mocks/server';
import { VERIFIED_BREACH } from '../../test/fixtures';
import { breaches } from '../breaches';

describe('breaches', () => {
  const BREACHES = [VERIFIED_BREACH];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', () => {
          return new Response(JSON.stringify(BREACHES));
        }),
      );

      return expect(breaches()).resolves.toEqual(BREACHES);
    });
  });

  describe('with domain', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', ({ request }) => {
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
