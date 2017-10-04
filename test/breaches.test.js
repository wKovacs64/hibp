import breaches from '../src/breaches';
import './mockAxios';
import { OPTS_DOM, RESPONSE_ARY } from './testData';

describe('breaches', () => {
  const successHandler = jest.fn();

  describe('no parameters', () => {
    it('should resolve with an array', () =>
      breaches()
        .then(successHandler)
        .then(() => {
          expect(successHandler.mock.calls.length).toBe(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_ARY);
        }));
  });

  describe('with domain', () => {
    it('should resolve with an array', () =>
      breaches(OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.mock.calls.length).toBe(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_ARY);
        }));
  });
});
