import breach from '../src/breach';
import './mockAxios';
import {
  BREACH_FOUND,
  BREACH_NOT_FOUND,
  RESPONSE_OBJ,
  RESPONSE_CLEAN,
} from './testData';

describe('breach', () => {
  const successHandler = jest.fn();

  afterEach(() => {
    successHandler.mockReset();
  });

  describe('found', () => {
    it('should resolve with an object', () =>
      breach(BREACH_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.mock.calls.length).toBe(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_OBJ);
        }));
  });

  describe('not found', () => {
    it('should resolve with null', () =>
      breach(BREACH_NOT_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.mock.calls.length).toBe(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_CLEAN);
        }));
  });
});
