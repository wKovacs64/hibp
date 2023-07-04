import { rest } from 'msw';
import { server } from '../mocks/server';
import { VERIFIED_BREACH } from '../../test/fixtures';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import { breach } from '../breach';

describe('breach', () => {
  describe('found', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(ctx.json(VERIFIED_BREACH));
        }),
      );

      return expect(breach('found')).resolves.toEqual(VERIFIED_BREACH);
    });
  });

  describe('not found', () => {
    it('resolves with null', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(ctx.status(NOT_FOUND.status));
        }),
      );

      return expect(breach('not found')).resolves.toBeNull();
    });
  });
});
