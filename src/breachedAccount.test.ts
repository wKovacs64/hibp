import AxiosError from 'AxiosError';
import { mockResponse } from '../test/utils';
import { NOT_FOUND } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import breachedAccount from './breachedAccount';

const mockGet = jest.spyOn(axios, 'get');

describe('breachedAccount', () => {
  const data = [{ some: 'stuff' }];

  beforeAll(() => {
    mockGet.mockResolvedValue(mockResponse({ data }));
  });

  it('honors the truncate option', () => {
    return breachedAccount('breached')
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).not.toMatch(/truncateResponse=false/);
        mockGet.mockClear();
      })
      .then(() => breachedAccount('breached', { truncate: false }))
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).toMatch(/truncateResponse=false/);
      });
  });

  it('honors the includeUnverified option', () => {
    return breachedAccount('breached')
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).not.toMatch(/includeUnverified=false/);
        mockGet.mockClear();
      })
      .then(() => breachedAccount('breached', { includeUnverified: false }))
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).toMatch(/includeUnverified=false/);
      });
  });

  describe('breached', () => {
    describe('no parameters', () => {
      it('resolves with data from the remote API', () =>
        expect(breachedAccount('breached')).resolves.toEqual(data));
    });

    describe('with truncateResults', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { truncate: false }),
        ).resolves.toEqual(data));
    });

    describe('with domain', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar' }),
        ).resolves.toEqual(data));
    });

    describe('with includeUnverified', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { includeUnverified: false }),
        ).resolves.toEqual(data));
    });

    describe('with domain and truncateResults', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar', truncate: false }),
        ).resolves.toEqual(data));
    });
  });

  describe('clean', () => {
    beforeAll(() => {
      mockGet.mockRejectedValue(new AxiosError(NOT_FOUND));
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
