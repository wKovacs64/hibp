import dataClasses from '../src/dataClasses';
import './mockAxios';
import { RESPONSE_ARY } from './testData';

describe('dataClasses', () => {
  describe('no parameters', () => {
    it('should resolve with an array', () =>
      expect(dataClasses()).resolves.toEqual(RESPONSE_ARY));
  });
});
