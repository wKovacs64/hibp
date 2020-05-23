import { EXAMPLE_PASTE } from '../../test/fixtures';
import { mockFetch, mockResponse } from '../../test/utils';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import { pasteAccount } from '../pasteAccount';

describe('pasteAccount', () => {
  it('honors the apiKey option', () => {
    const apiKey = 'my-api-key';
    const headers = {
      'HIBP-API-Key': apiKey,
    };
    mockFetch.mockResolvedValue(mockResponse({ status: NOT_FOUND.status }));

    return pasteAccount('whatever@example.com')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.not.objectContaining(headers),
        });
        mockFetch.mockClear();
      })
      .then(() => pasteAccount('whatever@example.com', { apiKey }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.objectContaining(headers),
        });
      });
  });

  describe('pasted email', () => {
    it('resolves with data from the remote API', () => {
      const body = [EXAMPLE_PASTE];
      mockFetch.mockResolvedValue(mockResponse({ body }));
      return expect(pasteAccount('pasted@email.com')).resolves.toEqual(body);
    });
  });

  describe('clean email', () => {
    it('resolves with null', () => {
      mockFetch.mockResolvedValue(mockResponse({ status: NOT_FOUND.status }));
      return expect(pasteAccount('clean@whistle.com')).resolves.toBeNull();
    });
  });
});
