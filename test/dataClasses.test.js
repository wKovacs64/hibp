import dataClasses from '../src/dataClasses';
import './mockAxios';
import { RESPONSE_ARY } from './testData';

describe('dataClasses', () => {
  const successHandler = jest.fn();

  describe('no parameters', () => {
    it('should resolve with an array', () =>
      dataClasses()
        .then(successHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(1);
          expect(successHandler.mock.calls[0][0]).toBe(RESPONSE_ARY);
        }));
  });
});
