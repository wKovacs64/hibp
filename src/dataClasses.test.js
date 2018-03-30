import { OK } from './internal/haveibeenpwned/responses';
import mockAxios from './internal/haveibeenpwned/axiosInstance';
import dataClasses from './dataClasses';

describe('dataClasses', () => {
  const data = ['some', 'data', 'classes'];

  beforeAll(() => {
    mockAxios.get.mockResolvedValue({
      status: OK.status,
      data,
    });
  });

  describe('no parameters', () => {
    it('resolves with data from the remote API', () =>
      expect(dataClasses()).resolves.toEqual(data));
  });
});
