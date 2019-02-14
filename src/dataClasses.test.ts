import { mockResponse } from '../test/utils';
import axios from './internal/haveibeenpwned/axiosInstance';
import dataClasses from './dataClasses';

const mockGet = jest.spyOn(axios, 'get');

describe('dataClasses', () => {
  const data = ['some', 'data', 'classes'];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      mockGet.mockResolvedValue(mockResponse({ data }));
      expect(dataClasses()).resolves.toEqual(data);
    });
  });
});
