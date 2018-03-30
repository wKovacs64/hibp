import AxiosError from '../../../test/AxiosError';
import pwnedPasswordRange from '../../pwnedPasswordRange';
import { BAD_REQUEST } from './responses';
import mockAxios from './axiosInstance';

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockAxios.get.mockRejectedValueOnce(ERR);
      expect(pwnedPasswordRange('setup error')).rejects.toEqual(ERR);
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(BAD_REQUEST));
      expect(pwnedPasswordRange('bad request')).rejects.toMatchSnapshot();
    });
  });

  describe('unexpected HTTP error', () => {
    it('throws an error with the response status text', () => {
      mockAxios.get.mockRejectedValueOnce(
        new AxiosError({
          status: 999,
          statusText: 'Unknown - something unexpected happened.',
        }),
      );
      expect(pwnedPasswordRange('unknown response')).rejects.toMatchSnapshot();
    });
  });
});
