import { PASSWORD_PWNED, PASSWORD_CLEAN } from '../test/fixtures';
import pwnedPassword from './pwnedPassword';

describe('pwnedPassword', () => {
  describe('pwned', () => {
    it('should resolve to number > 0', () =>
      expect(pwnedPassword(PASSWORD_PWNED)).resolves.toBeGreaterThan(0));
  });

  describe('clean', () => {
    it('should resolve to 0', () =>
      expect(pwnedPassword(PASSWORD_CLEAN)).resolves.toBe(0));
  });
});
