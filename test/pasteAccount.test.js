import pasteAccount from '../src/pasteAccount';
import './mockAxios';
import {
  EMAIL_PASTED,
  EMAIL_CLEAN,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from './testData';

describe('pasteAccount', () => {
  const successHandler = jest.fn();

  describe('pasted email', () => {
    it('should resolve with an array', () =>
      pasteAccount(EMAIL_PASTED)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_ARY);
        }));
  });

  describe('clean email', () => {
    it('should resolve with null', () =>
      pasteAccount(EMAIL_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_CLEAN);
        }));
  });
});
