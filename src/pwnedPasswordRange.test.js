import { RANGE_VALID, RANGE_INVALID } from '../test/fixtures';
import pwnedPasswordRange from './pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('should resolve', () =>
      expect(pwnedPasswordRange(RANGE_VALID)).resolves.toBeDefined());
  });

  describe('invalid range', () => {
    it('should reject', () =>
      expect(pwnedPasswordRange(RANGE_INVALID)).rejects.toBeDefined());
  });
});
