import { mockFetch, mockResponse } from '../../test/utils';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import breachedAccount from '../breachedAccount';

describe('breachedAccount', () => {
  const body = [{ some: 'stuff' }];

  beforeAll(() => {
    mockFetch.mockResolvedValue(mockResponse({ body }));
  });

  it('honors the apiKey option', () => {
    const apiKey = 'my-api-key';
    const headers = {
      'HIBP-API-Key': apiKey,
    };

    return breachedAccount('breached')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.not.objectContaining(headers),
        });
        mockFetch.mockClear();
      })
      .then(() => breachedAccount('breached', { apiKey }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
          headers: expect.objectContaining(headers),
        });
      });
  });

  it('honors the truncate option', () => {
    return breachedAccount('breached')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).not.toMatch(
          /truncateResponse=false/,
        );
        mockFetch.mockClear();
      })
      .then(() => breachedAccount('breached', { truncate: false }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).toMatch(/truncateResponse=false/);
      });
  });

  it('honors the includeUnverified option', () => {
    return breachedAccount('breached')
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).not.toMatch(
          /includeUnverified=false/,
        );
        mockFetch.mockClear();
      })
      .then(() => breachedAccount('breached', { includeUnverified: false }))
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).toMatch(/includeUnverified=false/);
      });
  });

  describe('breached', () => {
    describe('no parameters', () => {
      it('resolves with body from the remote API', () =>
        expect(breachedAccount('breached')).resolves.toEqual(body));
    });

    describe('with truncateResults', () => {
      it('resolves with body from the remote API', () =>
        expect(
          breachedAccount('breached', { truncate: false }),
        ).resolves.toEqual(body));
    });

    describe('with domain', () => {
      it('resolves with body from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar' }),
        ).resolves.toEqual(body));
    });

    describe('with includeUnverified', () => {
      it('resolves with body from the remote API', () =>
        expect(
          breachedAccount('breached', { includeUnverified: false }),
        ).resolves.toEqual(body));
    });

    describe('with domain and truncateResults', () => {
      it('resolves with body from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar', truncate: false }),
        ).resolves.toEqual(body));
    });
  });

  describe('clean', () => {
    beforeAll(() => {
      mockFetch.mockResolvedValue(mockResponse({ status: NOT_FOUND.status }));
    });

    describe('no parameters', () => {
      it('resolves with null', () =>
        expect(breachedAccount('clean')).resolves.toBeNull());
    });

    describe('with truncateResults', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { truncate: false }),
        ).resolves.toBeNull());
    });

    describe('with domain', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { domain: 'foo.bar' }),
        ).resolves.toBeNull());
    });

    describe('with includeUnverified', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { includeUnverified: false }),
        ).resolves.toBeNull());
    });

    describe('with domain and truncateResults', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { domain: 'foo.bar', truncate: false }),
        ).resolves.toBeNull());
    });
  });
});
