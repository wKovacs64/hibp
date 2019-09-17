import { mockResponse } from '../../test/utils';
import axios from '../api/haveibeenpwned/axiosInstance';
import dataClasses from '../dataClasses';

const mockGet = jest.spyOn(axios, 'get');

describe('dataClasses', () => {
  const data = ['some', 'data', 'classes'];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      mockGet.mockResolvedValue(mockResponse({ data }));
      return expect(dataClasses()).resolves.toEqual(data);
    });
  });
});
