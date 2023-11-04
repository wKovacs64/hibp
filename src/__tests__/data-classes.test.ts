import { http } from 'msw';
import { server } from '../mocks/server.js';
import { dataClasses } from '../data-classes.js';

describe('dataClasses', () => {
  const DATA_CLASSES = ['some', 'data', 'classes'];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        http.get('*', () => {
          return new Response(JSON.stringify(DATA_CLASSES));
        }),
      );

      return expect(dataClasses()).resolves.toEqual(DATA_CLASSES);
    });
  });
});
