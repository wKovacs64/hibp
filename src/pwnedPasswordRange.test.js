import { RANGE_PASSWORD_PWNED, RESPONSE_STR } from '../test/fixtures';
import pwnedPasswordRange from './pwnedPasswordRange';

describe('pwnedPasswordRange', () => {
  describe('valid range', () => {
    it('should resolve with a string', () =>
      expect(pwnedPasswordRange(RANGE_PASSWORD_PWNED)).resolves.toEqual(
        RESPONSE_STR,
      ));
  });
});
