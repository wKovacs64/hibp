import {
  BREACH_FOUND,
  BREACH_NOT_FOUND,
  RESPONSE_OBJ,
  RESPONSE_CLEAN,
} from '../test/fixtures';
import breach from './breach';

describe('breach', () => {
  describe('found', () => {
    it('should resolve with an object', () =>
      expect(breach(BREACH_FOUND)).resolves.toEqual(RESPONSE_OBJ));
  });

  describe('not found', () => {
    it('should resolve with null', () =>
      expect(breach(BREACH_NOT_FOUND)).resolves.toEqual(RESPONSE_CLEAN));
  });
});
