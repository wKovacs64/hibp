import pwnedPassword from '../src/pwnedPassword';
import './mockAxios';
import { PASSWORD_PWNED, PASSWORD_CLEAN, OPTS_ISAHASH } from './testData';

describe('pwnedPassword', () => {
  const successHandler = jest.fn();

  describe('pwned (no parameters)', () => {
    it('should resolve to true', () =>
      pwnedPassword(PASSWORD_PWNED)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(true);
        }));
  });

  describe('pwned (with isAHash)', () => {
    it('should resolve to true', () =>
      pwnedPassword(PASSWORD_PWNED, OPTS_ISAHASH)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(true);
        }));
  });

  describe('clean (no parameters)', () => {
    it('should resolve to false', () =>
      pwnedPassword(PASSWORD_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(false);
        }));
  });

  describe('clean (with isAHash)', () => {
    it('should resolve to false', () =>
      pwnedPassword(PASSWORD_CLEAN, OPTS_ISAHASH)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(false);
        }));
  });
});
