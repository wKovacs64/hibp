import { RESPONSE_ARY } from '../test/fixtures';
import dataClasses from './dataClasses';

describe('dataClasses', () => {
  describe('no parameters', () => {
    it('should resolve with an array', () =>
      expect(dataClasses()).resolves.toEqual(RESPONSE_ARY));
  });
});
