// eslint-disable-next-line import/no-extraneous-dependencies
import { stripIndents } from 'common-tags';
import { OK } from './internal/pwnedpasswords/responses';
import axios from './internal/pwnedpasswords/axiosInstance';
import pwnedPasswordRange from './pwnedPasswordRange';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    const data = stripIndents`
      003D68EB55068C33ACE09247EE4C639306B:3
      1E4C9B93F3F0682250B6CF8331B7EE68FD8:3303003
      01330C689E5D64F660D6947A93AD634EF8F:1
    `;

    mockAxios.get.mockResolvedValue({
      status: OK.status,
      data,
    });

    it('resolves with an array of objects', () =>
      expect(pwnedPasswordRange('5BAA6')).resolves.toEqual([
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
      ]));
  });
});
