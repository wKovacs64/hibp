import { OK } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import dataClasses from './dataClasses';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('dataClasses', () => {
  const data = ['some', 'data', 'classes'];

  beforeAll(() => {
    mockAxios.get.mockResolvedValue({
      headers: {},
      status: OK.status,
      data,
    });
  });

  describe('no parameters', () => {
    it('resolves with data from the remote API', () =>
      expect(dataClasses()).resolves.toEqual(data));
  });
});
