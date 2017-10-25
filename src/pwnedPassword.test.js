import {
  PASSWORD_PWNED,
  PASSWORD_CLEAN,
  OPTS_ISAHASH,
} from './__mocks__/testData';
import pwnedPassword from './pwnedPassword';

describe('pwnedPassword', () => {
  describe('pwned (no parameters)', () => {
    it('should resolve to true', () =>
      expect(pwnedPassword(PASSWORD_PWNED)).resolves.toBe(true));
  });

  describe('pwned (with isAHash)', () => {
    it('should resolve to true', () =>
      expect(pwnedPassword(PASSWORD_PWNED, OPTS_ISAHASH)).resolves.toBe(true));
  });

  describe('clean (no parameters)', () => {
    it('should resolve to false', () =>
      expect(pwnedPassword(PASSWORD_CLEAN)).resolves.toBe(false));
  });

  describe('clean (with isAHash)', () => {
    it('should resolve to false', () =>
      expect(pwnedPassword(PASSWORD_CLEAN, OPTS_ISAHASH)).resolves.toBe(false));
  });
});
