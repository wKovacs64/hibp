import { mockResponse } from '../test/utils';
import axios from './internal/haveibeenpwned/axiosInstance';
import breaches from './breaches';

const mockGet = jest.spyOn(axios, 'get');

describe('breaches', () => {
  const data = [{ breach: 'info' }];

  beforeAll(() => {
    mockGet.mockResolvedValue(mockResponse({ data }));
  });

  describe('no parameters', () => {
    it('resolves with data from the remote API', () =>
      expect(breaches()).resolves.toEqual(data));
  });

  describe('with domain', () => {
    it('resolves with data from the remote API', () =>
      expect(breaches({ domain: 'foo.bar' })).resolves.toEqual(data));
  });
});
