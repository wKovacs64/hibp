import { mockFetch, mockResponse } from '../../test/utils';
import { search } from '../search';

describe('search', () => {
  it('searches breaches by username', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = null;

    mockFetch.mockResolvedValue(mockResponse({ body: breaches }));

    return expect(search('breached')).resolves.toEqual({
      breaches,
      pastes,
    });
  });

  it('searches breaches and pastes by email address', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = [{ other: 'stuff', about: 'a paste' }];

    mockFetch.mockImplementation((endpoint) =>
      Promise.resolve(
        mockResponse({
          body: /breachedaccount/.test(endpoint) ? breaches : pastes,
        }),
      ),
    );

    return expect(search('pasted@email.com')).resolves.toEqual({
      breaches,
      pastes,
    });
  });

  it('forwards the apiKey option correctly', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const apiKey = 'my-api-key';
    const headers = {
      'HIBP-API-Key': apiKey,
    };

    mockFetch.mockResolvedValue(mockResponse({ body: breaches }));

    return search('breached')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.not.objectContaining(headers),
        });
        mockFetch.mockClear();
      })
      .then(() => search('breached', { apiKey }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.objectContaining(headers),
        });
      });
  });

  it('forwards the truncate option correctly', () => {
    return search('breached')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).not.toMatch(
          /truncateResponse=false/,
        );
        mockFetch.mockClear();
      })
      .then(() => search('breached', { truncate: false }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).toMatch(/truncateResponse=false/);
      });
  });
});
