import AxiosError from 'AxiosError';
import breachedAccount from 'breachedAccount';
import dataClasses from 'dataClasses';
import { BAD_REQUEST, FORBIDDEN, TOO_MANY_REQUESTS } from './responses';
import mockAxios from './axiosInstance';

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

  describe('invalid request header', () => {
    it('throws a "Forbidden" error', () => {
      mockAxios.get.mockRejectedValueOnce(new AxiosError(FORBIDDEN));
      expect(breachedAccount('forbidden')).rejects.toMatchSnapshot();
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
});
