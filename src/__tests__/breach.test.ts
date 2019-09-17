import { AxiosError, mockResponse } from '../../test/utils';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import axios from '../api/haveibeenpwned/axiosInstance';
import breach from '../breach';

const mockGet = jest.spyOn(axios, 'get');

describe('breach', () => {
  describe('found', () => {
    const data = {
      some: 'information',
      about: 'a breach',
    };

    it('resolves with data from the remote API', () => {
      mockGet.mockResolvedValue(mockResponse({ data }));
      return expect(breach('found')).resolves.toEqual(data);
    });
  });

  describe('not found', () => {
    it('resolves with null', () => {
      mockGet.mockRejectedValue(new AxiosError(NOT_FOUND));
      return expect(breach('not found')).resolves.toBeNull();
    });
  });
});
