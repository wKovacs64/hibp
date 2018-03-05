import { RANGE_PWNED_PASSWORD, RESPONSE_STR } from '../test/fixtures';
import pwnedPasswordRange from './pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('should resolve with a string', () =>
      expect(pwnedPasswordRange(RANGE_PWNED_PASSWORD)).resolves.toEqual(
        RESPONSE_STR,
      ));
  });
});
