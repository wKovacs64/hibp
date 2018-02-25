import { RANGE_VALID, RESPONSE_STR } from '../test/fixtures';
import pwnedPasswordRange from './pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('should resolve with a string', () =>
      expect(pwnedPasswordRange(RANGE_VALID)).resolves.toEqual(RESPONSE_STR));
  });
});
