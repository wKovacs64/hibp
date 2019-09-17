import AxiosError from 'AxiosError';
import { BAD_REQUEST, OK } from '../responses';
import axios from '../axiosInstance';
import fetchFromApi from '../fetchFromApi';

const mockGet = jest.spyOn(axios, 'get');

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockGet.mockRejectedValueOnce(ERR);
      return expect(fetchFromApi('/service/setup_error')).rejects.toEqual(ERR);
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(BAD_REQUEST));
      return expect(
        fetchFromApi('/service/bad_request'),
      ).rejects.toMatchSnapshot();
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
      return expect(
        fetchFromApi('/service/unknown_response'),
      ).rejects.toMatchSnapshot();
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
      return fetchFromApi('/service/stuff', { userAgent: ua }).then(() => {
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
      return fetchFromApi('/service/whatever', { baseUrl }).then(() => {
        expect(mockGet).toHaveBeenCalledWith(expect.any(String), {
          baseURL: baseUrl,
        });
      });
    });
  });
});
