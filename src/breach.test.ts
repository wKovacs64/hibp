import AxiosError from 'AxiosError';
import { OK, NOT_FOUND } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import breach from './breach';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('breach', () => {
  describe('found', () => {
    const data = {
      some: 'information',
      about: 'a breach',
    };

    beforeAll(() => {
      mockAxios.get.mockResolvedValue({
        status: OK.status,
        data,
      });
    });

    it('resolves with data from the remote API', () =>
      expect(breach('found')).resolves.toEqual(data));
  });

  describe('not found', () => {
    beforeAll(() => {
      mockAxios.get.mockRejectedValue(new AxiosError(NOT_FOUND));
    });

    it('resolves with null', () =>
      expect(breach('not found')).resolves.toBeNull());
  });
});
