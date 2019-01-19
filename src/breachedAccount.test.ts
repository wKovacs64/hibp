import AxiosError from 'AxiosError';
import { OK, NOT_FOUND } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import breachedAccount from './breachedAccount';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('breachedAccount', () => {
  describe('breached', () => {
    const data = [{ some: 'stuff' }];

    beforeAll(() => {
      mockAxios.get.mockResolvedValue({
        headers: {},
        status: OK.status,
        data,
      });
    });

    describe('no parameters', () => {
      it('resolves with data from the remote API', () =>
        expect(breachedAccount('breached')).resolves.toEqual(data));
    });

    describe('with truncateResults', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { truncate: true }),
        ).resolves.toEqual(data));
    });

    describe('with domain', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar' }),
        ).resolves.toEqual(data));
    });

    describe('with domain and truncateResults', () => {
      it('resolves with data from the remote API', () =>
        expect(
          breachedAccount('breached', { domain: 'foo.bar', truncate: true }),
        ).resolves.toEqual(data));
    });
  });

  describe('clean', () => {
    beforeAll(() => {
      mockAxios.get.mockRejectedValue(new AxiosError(NOT_FOUND));
    });

    describe('no parameters', () => {
      it('resolves with null', () =>
        expect(breachedAccount('clean')).resolves.toBeNull());
    });

    describe('with truncateResults', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { truncate: true }),
        ).resolves.toBeNull());
    });

    describe('with domain', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { domain: 'foo.bar' }),
        ).resolves.toBeNull());
    });

    describe('with domain and truncateResults', () => {
      it('resolves with null', () =>
        expect(
          breachedAccount('clean', { domain: 'foo.bar', truncate: true }),
        ).resolves.toBeNull());
    });
  });
});
