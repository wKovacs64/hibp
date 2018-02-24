import {
  ERR,
  RANGE_VALID,
  RANGE_INVALID,
  UNEXPECTED,
  UNKNOWN,
} from '../../../test/fixtures';
import pwnedPasswordRange from '../../pwnedPasswordRange';
import axiosInstance from './axiosInstance';
import { RANGE_BAD_REQUEST } from './responses';

describe('internal (pwnedpassword): fetchFromApi', () => {
  describe('request failure', () => {
    let failboat;

    beforeAll(() => {
      failboat = axiosInstance.interceptors.request.use(() => {
        throw ERR;
      });
    });

    afterAll(() => {
      axiosInstance.interceptors.request.eject(failboat);
    });

    it('should re-throw request setup errors', () =>
      expect(pwnedPasswordRange(RANGE_VALID)).rejects.toEqual(ERR));
  });

  describe('invalid range', () => {
    it('should throw an Error with "Bad Request" response data', () =>
      expect(pwnedPasswordRange(RANGE_INVALID)).rejects.toHaveProperty(
        'message',
        RANGE_BAD_REQUEST.response,
      ));
  });

  describe('unexpected HTTP error', () => {
    it('should throw an Error with the response status text', () =>
      expect(pwnedPasswordRange(UNEXPECTED)).rejects.toHaveProperty(
        'message',
        UNKNOWN.statusText,
      ));
  });
});
