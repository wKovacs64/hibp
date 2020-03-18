import { mockFetch, mockResponse } from '../../test/utils';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import breach from '../breach';

describe('breach', () => {
  describe('found', () => {
    const body = {
      some: 'information',
      about: 'a breach',
    };

    it('resolves with data from the remote API', () => {
      mockFetch.mockResolvedValue(mockResponse({ body }));
      return expect(breach('found')).resolves.toEqual(body);
    });
  });

  describe('not found', () => {
    it('resolves with null', () => {
      mockFetch.mockResolvedValue(mockResponse({ status: NOT_FOUND.status }));
      return expect(breach('not found')).resolves.toBeNull();
    });
  });
});
