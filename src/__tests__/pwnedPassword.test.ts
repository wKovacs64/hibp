import { EXAMPLE_PASSWORD_HASHES } from '../../test/fixtures';
import { mockFetch, mockResponse } from '../../test/utils';
import { pwnedPassword } from '../pwnedPassword';

describe('pwnedPassword', () => {
  mockFetch.mockResolvedValue(mockResponse({ body: EXAMPLE_PASSWORD_HASHES }));

  describe('pwned', () => {
    it('resolves to number > 0', () =>
      expect(pwnedPassword('password')).resolves.toBeGreaterThan(0));
  });

  describe('clean', () => {
    it('resolves to 0', () =>
      expect(pwnedPassword('kjfhsdksjf454145jkhk!!!')).resolves.toBe(0));
  });
});
