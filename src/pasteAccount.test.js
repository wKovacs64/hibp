import {
  EMAIL_PASTED,
  EMAIL_CLEAN,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from '../test/fixtures';
import pasteAccount from './pasteAccount';

describe('pasteAccount', () => {
  describe('pasted email', () => {
    it('should resolve with an array', () =>
      expect(pasteAccount(EMAIL_PASTED)).resolves.toEqual(RESPONSE_ARY));
  });

  describe('clean email', () => {
    it('should resolve with null', () =>
      expect(pasteAccount(EMAIL_CLEAN)).resolves.toEqual(RESPONSE_CLEAN));
  });
});
