import AxiosError from 'AxiosError';
import breachedAccount from 'breachedAccount';
import dataClasses from 'dataClasses';
import {
  BAD_REQUEST,
  FORBIDDEN,
  BLOCKED,
  TOO_MANY_REQUESTS,
} from './responses';
import axios from './axiosInstance';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('internal (haveibeenpwned): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockAxios.get.mockRejectedValueOnce(ERR);
      expect(dataClasses()).rejects.toEqual(ERR);
    });
  });

  describe('invalid account format', () => {
    it('throws a "Bad Request" error', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(BAD_REQUEST));
      expect(breachedAccount('bad request')).rejects.toMatchSnapshot();
    });
  });

  describe('forbidden request', () => {
    it('throws a "Forbidden" error if no cf-ray header is present', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(FORBIDDEN));
      expect(breachedAccount('forbidden')).rejects.toMatchSnapshot();
    });

    it('throws a "Blocked Request" error if a cf-ray header is present', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(BLOCKED));
      expect(breachedAccount('blocked')).rejects.toMatchSnapshot();
    });
  });

  describe('rate limited', () => {
    it('throws a "Too Many Requests" error', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(TOO_MANY_REQUESTS));
      expect(breachedAccount('rate limited')).rejects.toMatchSnapshot();
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
      expect(breachedAccount('unknown response')).rejects.toMatchSnapshot();
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      const ua = 'custom UA';
      return dataClasses({ userAgent: ua }).then(() => {
        expect(mockAxios.get).toHaveBeenCalledWith(expect.any(String), {
          headers: { 'User-Agent': ua },
        });
      });
    });
  });
});
