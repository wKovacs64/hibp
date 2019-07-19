import AxiosError from 'AxiosError';
import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  BLOCKED,
  TOO_MANY_REQUESTS,
} from './responses';
import axios from './axiosInstance';
import fetchFromApi from './fetchFromApi';

const mockGet = jest.spyOn(axios, 'get');

describe('internal (haveibeenpwned): fetchFromApi', () => {
  const apiKey = 'my-api-key';

  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockGet.mockRejectedValueOnce(ERR);
      expect(fetchFromApi('/service')).rejects.toEqual(ERR);
    });
  });

  describe('invalid account format', () => {
    it('throws a "Bad Request" error', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(BAD_REQUEST));
      expect(
        fetchFromApi('/service/bad_request', { apiKey }),
      ).rejects.toMatchSnapshot();
    });
  });

  describe('unauthorized', () => {
    it('throws an "Unauthorized" error', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(UNAUTHORIZED));
      expect(fetchFromApi('/service/unauthorized')).rejects.toMatchSnapshot();
    });
  });

  describe('forbidden request', () => {
    it('throws a "Forbidden" error if no cf-ray header is present', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(FORBIDDEN));
      expect(
        fetchFromApi('/service/forbidden', { apiKey }),
      ).rejects.toMatchSnapshot();
    });

    it('throws a "Blocked Request" error if a cf-ray header is present', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(BLOCKED));
      expect(
        fetchFromApi('/service/blocked', { apiKey }),
      ).rejects.toMatchSnapshot();
    });
  });

  describe('rate limited', () => {
    it('throws a "Too Many Requests" error', () => {
      mockGet.mockRejectedValueOnce(new AxiosError(TOO_MANY_REQUESTS));
      expect(
        fetchFromApi('/service/rate_limited', { apiKey }),
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
      expect(
        fetchFromApi('/service/unknown_response'),
      ).rejects.toMatchSnapshot();
    });
  });

  describe('apiKey option', () => {
    it('is passed on as a request header', () => {
      mockGet.mockResolvedValue({
        headers: {},
        status: OK.status,
        data: {},
        config: {},
        statusText: '',
      });
      const endpoint = 'https://haveibeenpwned.com/api/v3/service/account';
      return fetchFromApi(endpoint, { apiKey }).then(() => {
        expect(mockGet).toHaveBeenCalledWith(endpoint, {
          headers: { 'HIBP-API-Key': apiKey },
        });
      });
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      mockGet.mockResolvedValue({
        headers: {},
        status: OK.status,
        data: {},
        config: {},
        statusText: '',
      });
      const ua = 'custom UA';
      return fetchFromApi('/service', { userAgent: ua }).then(() => {
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
        data: {},
        config: {},
        statusText: '',
      });
      const baseUrl = 'https://my-hibp-proxy:8080';
      return fetchFromApi('/service', { baseUrl }).then(() => {
        expect(mockGet).toHaveBeenCalledWith(expect.any(String), {
          baseURL: baseUrl,
        });
      });
    });
  });
});
