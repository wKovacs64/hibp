import AxiosError from 'AxiosError';
import { mockResponse } from '../test/utils';
import { NOT_FOUND } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import pasteAccount from './pasteAccount';

const mockGet = jest.spyOn(axios, 'get');

describe('pasteAccount', () => {
  describe('pasted email', () => {
    it('resolves with data from the remote API', () => {
      const data = [{ paste: 'information' }];
      mockGet.mockResolvedValue(mockResponse({ data }));
      expect(pasteAccount('pasted@email.com')).resolves.toEqual(data);
    });
  });

  describe('clean email', () => {
    it('resolves with null', () => {
      mockGet.mockRejectedValue(new AxiosError(NOT_FOUND));
      expect(pasteAccount('clean@whistle.com')).resolves.toBeNull();
    });
  });
});
