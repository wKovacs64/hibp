import AxiosError from 'AxiosError';
import pwnedPasswordRange from 'pwnedPasswordRange';
import { BAD_REQUEST, OK } from './responses';
import axios from './axiosInstance';

const mockGet = jest.spyOn(axios, 'get');

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockGet.mockRejectedValueOnce(ERR);
      expect(pwnedPasswordRange('setup error')).rejects.toEqual(ERR);
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(BAD_REQUEST));
      expect(pwnedPasswordRange('bad request')).rejects.toMatchSnapshot();
    });
  });

  describe('unexpected HTTP error', () => {
    it('throws an error with the response status text', () => {
      mockGet.mockRejectedValueOnce(
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
      mockGet.mockResolvedValue({
        headers: {},
        status: OK.status,
        data: '1234\n5678',
        config: {},
        statusText: '',
      });
      const ua = 'custom UA';
      return pwnedPasswordRange('stuff', { userAgent: ua }).then(() => {
        expect(mockGet).toHaveBeenCalledWith(expect.any(String), {
          headers: { 'User-Agent': ua },
        });
      });
    });
  });

  describe('baseUrl option', () => {
    it('is passed on as baseURL', () => {
      mockGet.mockResolvedValue({
        headers: {},
        status: OK.status,
        data: '1234\n5678',
        config: {},
        statusText: '',
      });
      const baseUrl = 'https://my-hibp-proxy:8080';
      return pwnedPasswordRange('whatever', { baseUrl }).then(() => {
        expect(mockGet).toHaveBeenCalledWith(expect.any(String), {
          baseURL: baseUrl,
        });
      });
    });
  });
});
