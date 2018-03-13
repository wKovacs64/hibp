import {
  RANGE_PASSWORD_PWNED,
  RANGE_PASSWORD_PWNED_RESPONSE_PARSED,
} from '../test/fixtures';
import pwnedPasswordRange from './pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('should resolve with a string', () =>
      expect(pwnedPasswordRange(RANGE_PASSWORD_PWNED)).resolves.toEqual(
        RANGE_PASSWORD_PWNED_RESPONSE_PARSED,
      ));
  });
});
