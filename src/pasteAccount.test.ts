import AxiosError from 'AxiosError';
import { OK, NOT_FOUND } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import pasteAccount from './pasteAccount';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('pasteAccount', () => {
  describe('pasted email', () => {
    const data = [{ paste: 'information' }];

    beforeAll(() => {
      mockAxios.get.mockResolvedValue({
        status: OK.status,
        data,
      });
    });

    it('resolves with data from the remote API', () =>
      expect(pasteAccount('pasted@email.com')).resolves.toEqual(data));
  });

  describe('clean email', () => {
    beforeAll(() => {
      mockAxios.get.mockRejectedValue(new AxiosError(NOT_FOUND));
    });

    it('resolves with null', () =>
      expect(pasteAccount('clean@whistle.com')).resolves.toBeNull());
  });
});
