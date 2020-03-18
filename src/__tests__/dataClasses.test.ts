import { mockFetch, mockResponse } from '../../test/utils';
import dataClasses from '../dataClasses';

describe('dataClasses', () => {
  const body = ['some', 'data', 'classes'];

  describe('no parameters', () => {
    it('resolves with data from the remote API', () => {
      mockFetch.mockResolvedValue(mockResponse({ body }));
      return expect(dataClasses()).resolves.toEqual(body);
    });
  });
});
