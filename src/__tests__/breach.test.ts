import { http } from 'msw';
import { server } from '../mocks/server.js';
import { VERIFIED_BREACH } from '../../test/fixtures.js';
import { NOT_FOUND } from '../api/haveibeenpwned/responses.js';
import { breach } from '../breach.js';

describe('breach', () => {
  describe('found', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        http.get('*', () => {
          return new Response(JSON.stringify(VERIFIED_BREACH));
        }),
      );

      return expect(breach('found')).resolves.toEqual(VERIFIED_BREACH);
    });
  });

  describe('not found', () => {
    it('resolves with null', () => {
      server.use(
        http.get('*', () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(breach('not found')).resolves.toBeNull();
    });
  });
});
