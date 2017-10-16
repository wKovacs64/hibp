import breaches from '../src/breaches';
import './mockAxios';
import { OPTS_DOM, RESPONSE_ARY } from './testData';

describe('breaches', () => {
  describe('no parameters', () => {
    it('should resolve with an array', () =>
      expect(breaches()).resolves.toEqual(RESPONSE_ARY));
  });

  describe('with domain', () => {
    it('should resolve with an array', () =>
      expect(breaches(OPTS_DOM)).resolves.toEqual(RESPONSE_ARY));
  });
});
