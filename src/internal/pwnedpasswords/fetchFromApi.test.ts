import AxiosError from 'AxiosError';
import pwnedPasswordRange from 'pwnedPasswordRange';
import { BAD_REQUEST, OK } from './responses';
import axios from './axiosInstance';

const mockAxios = axios as jest.Mocked<typeof axios>;

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

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      mockAxios.get.mockResolvedValueOnce({
        headers: {},
        status: OK.status,
        data: '1234\n5678',
      });
      const ua = 'custom UA';
      return pwnedPasswordRange('stuff', { userAgent: ua }).then(() => {
        expect(mockAxios.get).toHaveBeenCalledWith(expect.any(String), {
          headers: { 'User-Agent': ua },
        });
      });
    });
  });
});
