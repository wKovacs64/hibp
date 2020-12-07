import { server, rest } from '../mocks/server';
import { EXAMPLE_PASSWORD_HASHES } from '../../test/fixtures';
import { pwnedPasswordRange } from '../pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('resolves with an array of objects', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res(ctx.text(EXAMPLE_PASSWORD_HASHES));
        }),
      );

      return expect(pwnedPasswordRange('5BAA6')).resolves.toEqual([
        {
          suffix: '003D68EB55068C33ACE09247EE4C639306B',
          count: 3,
        },
        {
          suffix: '1E4C9B93F3F0682250B6CF8331B7EE68FD8',
          count: 3303003,
        },
        {
          suffix: '01330C689E5D64F660D6947A93AD634EF8F',
          count: 1,
        },
      ]);
    });
  });
});
