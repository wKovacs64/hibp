import { EXAMPLE_BREACH } from '../../test/fixtures';
import { mockFetch, mockResponse } from '../../test/utils';
import { breaches } from '../breaches';

describe('breaches', () => {
  const body = [EXAMPLE_BREACH];

  beforeAll(() => {
    mockFetch.mockResolvedValue(mockResponse({ body }));
  });

  describe('no parameters', () => {
    it('resolves with data from the remote API', () =>
      expect(breaches()).resolves.toEqual(body));
  });

  describe('with domain', () => {
    it('resolves with data from the remote API', () =>
      expect(breaches({ domain: 'foo.bar' })).resolves.toEqual(body));
  });
});
