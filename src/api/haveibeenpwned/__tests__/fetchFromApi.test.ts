import { mockFetch, mockResponse } from '../../../../test/utils';
import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  BLOCKED,
  TOO_MANY_REQUESTS,
} from '../responses';
import { fetchFromApi } from '../fetchFromApi';

describe('internal (haveibeenpwned): fetchFromApi', () => {
  const apiKey = 'my-api-key';

  describe('User-Agent', () => {
    // Node
    it('sets a User-Agent request header when outside the browser', () => {
      const originalNavigator = global.navigator;
      mockFetch.mockResolvedValueOnce(mockResponse({ status: OK.status }));

      global.navigator = undefined;
      return fetchFromApi('/service')
        .then(() => {
          expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
            headers: expect.objectContaining({
              'User-Agent': expect.any(String),
            }),
          });
        })
        .finally(() => {
          global.navigator = originalNavigator;
        });
    });

    // Browser
    it('does not set a User-Agent request header when inside the browser', () => {
      mockFetch.mockResolvedValueOnce(mockResponse({ status: OK.status }));

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      global.navigator = {} as Navigator;
      return fetchFromApi('/service').then(() => {
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.not.objectContaining({
            'User-Agent': expect.any(String),
          }),
        });
      });
    });
  });

  describe('request failure', () => {
    it('re-throws request setup errors', () => {
      const ERR = new Error('Set sail for fail!');
      mockFetch.mockRejectedValueOnce(ERR);

      return expect(fetchFromApi('/service')).rejects.toEqual(ERR);
    });
  });

  describe('invalid account format', () => {
    it('throws a "Bad Request" error', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: BAD_REQUEST.status,
          statusText: BAD_REQUEST.statusText,
        }),
      );

      return expect(
        fetchFromApi('/service/bad_request', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Bad request — the account does not comply with an acceptable format.]`,
      );
    });
  });

  describe('unauthorized', () => {
    it('throws an "Unauthorized" error', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: UNAUTHORIZED.status,
          body: UNAUTHORIZED.body,
        }),
      );

      return expect(
        fetchFromApi('/service/unauthorized'),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Access denied due to missing hibp-api-key.]`,
      );
    });
  });

  describe('forbidden request', () => {
    it('throws a "Forbidden" error if no cf-ray header is present', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: FORBIDDEN.status,
          statusText: FORBIDDEN.statusText,
        }),
      );

      return expect(
        fetchFromApi('/service/forbidden', { apiKey }),
      ).rejects.toMatchInlineSnapshot(`[Error: Forbidden - access denied.]`);
    });

    it('throws a "Blocked Request" error if a cf-ray header is present', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          headers: BLOCKED.headers,
          status: BLOCKED.status,
        }),
      );

      return expect(
        fetchFromApi('/service/blocked', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Request blocked, contact haveibeenpwned.com if this continues (Ray ID: someRayId)]`,
      );
    });
  });

  describe('rate limited', () => {
    it('throws a "Too Many Requests" error', () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({
          status: TOO_MANY_REQUESTS.status,
          body: TOO_MANY_REQUESTS.body,
        }),
      );

      return expect(
        fetchFromApi('/service/rate_limited', { apiKey }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Rate limit is exceeded. Try again in 2 seconds.]`,
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

  describe('apiKey option', () => {
    it('is passed on as a request header', () => {
      mockFetch.mockResolvedValue(mockResponse({ status: OK.status }));

      return fetchFromApi('/service', { apiKey }).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.objectContaining({ 'HIBP-API-Key': apiKey }),
        });
      });
    });
  });

  describe('userAgent option', () => {
    it('is passed on as a request header', () => {
      mockFetch.mockResolvedValue(mockResponse({ status: OK.status }));

      const ua = 'custom UA';

      return fetchFromApi('/service', { userAgent: ua }).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.objectContaining({ 'User-Agent': ua }),
        });
      });
    });
  });

  describe('baseUrl option', () => {
    it('is used in the final URL', () => {
      mockFetch.mockResolvedValue(mockResponse({ status: OK.status }));

      const baseUrl = 'https://my-hibp-proxy:8080';
      const endpoint = '/service';

      return fetchFromApi(endpoint, { baseUrl }).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          `${baseUrl}${endpoint}`,
          expect.any(Object),
        );
      });
    });
  });
});
