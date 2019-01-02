import { OK } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import breaches from './breaches';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('breaches', () => {
  const data = [{ breach: 'info' }];

  beforeAll(() => {
    mockAxios.get.mockResolvedValue({
      status: OK.status,
      data,
    });
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
