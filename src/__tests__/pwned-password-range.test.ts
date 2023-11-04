import { http } from 'msw';
import { server } from '../mocks/server.js';
import { EXAMPLE_PASSWORD_HASHES } from '../../test/fixtures.js';
import { pwnedPasswordRange } from '../pwned-password-range.js';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('resolves with an object', () => {
      server.use(
        http.get('*', () => {
          return new Response(EXAMPLE_PASSWORD_HASHES);
        }),
      );

      return expect(pwnedPasswordRange('5BAA6')).resolves.toEqual({
        '003D68EB55068C33ACE09247EE4C639306B': 3,
        '1E4C9B93F3F0682250B6CF8331B7EE68FD8': 3303003,
        '01330C689E5D64F660D6947A93AD634EF8F': 1,
      });
    });
  });

  describe('addPadding option', () => {
    it('causes Add-Padding header to be included in the request', async () => {
      expect.assertions(1);
      server.use(
        http.get('*', ({ request }) => {
          expect(request.headers.get('Add-Padding')).toBe('true');
          return new Response(EXAMPLE_PASSWORD_HASHES);
        }),
      );

      await pwnedPasswordRange('5BAA6', { addPadding: true });
    });
  });
});
