import { rest } from 'msw';
import { server } from '../mocks/server';
import { VERIFIED_BREACH } from '../../test/fixtures';
import { breaches } from '../breaches';

describe('breaches', () => {
  const BREACHES = [VERIFIED_BREACH];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(ctx.json(BREACHES));
        }),
      );

      return expect(breaches()).resolves.toEqual(BREACHES);
    });
  });

  describe('with domain', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return res.once(
            req.url.searchParams.get('domain') === 'foo.bar'
              ? ctx.json(BREACHES)
              : ctx.status(418),
          );
        }),
      );

      return expect(breaches({ domain: 'foo.bar' })).resolves.toEqual(BREACHES);
    });
  });
});
