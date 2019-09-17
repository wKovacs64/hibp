// eslint-disable-next-line import/no-extraneous-dependencies
import { stripIndents } from 'common-tags';
import { mockResponse } from '../../test/utils';
import axios from '../api/pwnedpasswords/axiosInstance';
import pwnedPassword from '../pwnedPassword';

const mockGet = jest.spyOn(axios, 'get');

describe('pwnedPassword', () => {
  mockGet.mockResolvedValue(
    mockResponse({
      data: stripIndents`
        003D68EB55068C33ACE09247EE4C639306B:3
        1E4C9B93F3F0682250B6CF8331B7EE68FD8:3303003
        01330C689E5D64F660D6947A93AD634EF8F:1
      `,
    }),
  );

  describe('pwned', () => {
    it('resolves to number > 0', () =>
      expect(pwnedPassword('password')).resolves.toBeGreaterThan(0));
  });

  describe('clean', () => {
    it('resolves to 0', () =>
      expect(pwnedPassword('kjfhsdksjf454145jkhk!!!')).resolves.toBe(0));
  });
});
