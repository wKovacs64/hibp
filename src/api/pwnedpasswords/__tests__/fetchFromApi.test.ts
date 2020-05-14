import { mockFetch, mockResponse } from '../../../../test/utils';
import { BAD_REQUEST, OK } from '../responses';
import { fetchFromApi } from '../fetchFromApi';

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockFetch.mockRejectedValueOnce(ERR);

      return expect(fetchFromApi('/service/setup_error')).rejects.toEqual(ERR);
    });
  });

  describe('invalid range', () => {
    it('throws a "Bad Request" error', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: BAD_REQUEST.status,
          body: BAD_REQUEST.body,
        }),
      );

      return expect(
        fetchFromApi('/service/bad_request'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: The hash prefix was not in a valid format]`,
      );
    });
  });

  describe('unexpected HTTP error', () => {
    it('throws an error with the response status text', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: 999,
          statusText: 'Unknown - something unexpected happened.',
        }),
      );

      return expect(
        fetchFromApi('/service/unknown_response'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Unknown - something unexpected happened.]`,
      );
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: OK.status,
          statusText: 'OK',
          body: '1234\n5678',
        }),
      );

      const ua = 'custom UA';

      return fetchFromApi('/service/stuff', { userAgent: ua }).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: { 'User-Agent': ua },
        });
      });
    });
  });

  describe('baseUrl option', () => {
    it('is used in the final URL', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: OK.status,
          statusText: '',
          body: '1234\n5678',
        }),
      );

      const baseUrl = 'https://my-hibp-proxy:8080';
      const endpoint = '/service/whatever';

      return fetchFromApi(endpoint, { baseUrl }).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {});
      });
    });
  });
});
