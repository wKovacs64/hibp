import { http } from 'msw';
import { server } from '../mocks/server.js';
import { EXAMPLE_PASSWORD_HASHES } from '../../test/fixtures.js';
import { pwnedPassword } from '../pwned-password.js';

describe('pwnedPassword', () => {
  describe('pwned', () => {
    it('resolves to number > 0', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_PASSWORD_HASHES);
        }),
      );

      return expect(pwnedPassword('password')).resolves.toBeGreaterThan(0);
    });
  });

  describe('clean', () => {
    it('resolves to 0', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_PASSWORD_HASHES);
        }),
      );

      return expect(pwnedPassword('kjfhsdksjf454145jkhk!!!')).resolves.toBe(0);
    });
  });
});
