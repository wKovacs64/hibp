import { rest } from 'msw';
import { server } from '../mocks/server';
import { dataClasses } from '../data-classes';

describe('dataClasses', () => {
  const DATA_CLASSES = ['some', 'data', 'classes'];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res.once(ctx.json(DATA_CLASSES));
        }),
      );

      return expect(dataClasses()).resolves.toEqual(DATA_CLASSES);
    });
  });
});
