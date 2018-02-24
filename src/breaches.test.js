import { OPTS_DOM, RESPONSE_ARY } from '../test/fixtures';
import breaches from './breaches';

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
