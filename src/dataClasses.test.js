import { RESPONSE_ARY } from './__mocks__/testData';
import dataClasses from './dataClasses';

describe('dataClasses', () => {
  describe('no parameters', () => {
    it('should resolve with an array', () =>
      expect(dataClasses()).resolves.toEqual(RESPONSE_ARY));
  });
});
