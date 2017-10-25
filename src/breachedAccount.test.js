import {
  ACCOUNT_BREACHED,
  ACCOUNT_CLEAN,
  OPTS_DOM,
  OPTS_TRUNC,
  OPTS_DOM_TRUNC,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from './__mocks__/testData';
import breachedAccount from './breachedAccount';

describe('breachedAccount', () => {
  describe('breached (no parameters)', () => {
    it('should resolve with an object', () =>
      expect(breachedAccount(ACCOUNT_BREACHED)).resolves.toEqual(RESPONSE_ARY));
  });

  describe('breached (with truncateResults)', () => {
    it('should resolve with an object', () =>
      expect(breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC)).resolves.toEqual(
        RESPONSE_ARY,
      ));
  });

  describe('breached (with domain)', () => {
    it('should resolve with an object', () =>
      expect(breachedAccount(ACCOUNT_BREACHED, OPTS_DOM)).resolves.toEqual(
        RESPONSE_ARY,
      ));
  });

  describe('breached (with domain and truncateResults)', () => {
    it('should resolve with an object', () =>
      expect(
        breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC),
      ).resolves.toEqual(RESPONSE_ARY));
  });

  describe('clean (no parameters)', () => {
    it('should resolve with null', () =>
      expect(breachedAccount(ACCOUNT_CLEAN)).resolves.toEqual(RESPONSE_CLEAN));
  });

  describe('clean (with truncateResults)', () => {
    it('should resolve with null', () =>
      expect(breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC)).resolves.toEqual(
        RESPONSE_CLEAN,
      ));
  });

  describe('clean (with domain)', () => {
    it('should resolve with null', () =>
      expect(breachedAccount(ACCOUNT_CLEAN, OPTS_DOM)).resolves.toEqual(
        RESPONSE_CLEAN,
      ));
  });

  describe('clean (with domain and truncateResults)', () => {
    it('should resolve with null', () =>
      expect(breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC)).resolves.toEqual(
        RESPONSE_CLEAN,
      ));
  });
});
