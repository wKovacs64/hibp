import {
  ERR,
  INVALID_HEADER,
  RATE_LIMITED,
  EMAIL_INVALID,
  UNEXPECTED,
  UNKNOWN,
} from '../../../test/fixtures';
import dataClasses from '../../dataClasses';
import breachedAccount from '../../breachedAccount';
import axiosInstance from './axiosInstance';
import { BAD_REQUEST, FORBIDDEN, TOO_MANY_REQUESTS } from './responses';

describe('internal (haveibeenpwned): fetchFromApi', () => {
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
      expect(dataClasses()).rejects.toEqual(ERR));
  });

  describe('invalid account format', () => {
    it('should throw an Error with "Bad Request" status text', () =>
      expect(breachedAccount(EMAIL_INVALID)).rejects.toHaveProperty(
        'message',
        BAD_REQUEST.statusText,
      ));
  });

  describe('invalid request header', () => {
    it('should throw an Error with "Forbidden" status text', () =>
      expect(breachedAccount(INVALID_HEADER)).rejects.toHaveProperty(
        'message',
        FORBIDDEN.statusText,
      ));
  });

  describe('rate limited', () => {
    it('should throw an Error with "Too Many Requests" response data', () =>
      expect(breachedAccount(RATE_LIMITED)).rejects.toHaveProperty(
        'message',
        TOO_MANY_REQUESTS.response,
      ));
  });

  describe('unexpected HTTP error', () => {
    it('should throw an Error with the response status text', () =>
      expect(breachedAccount(UNEXPECTED)).rejects.toHaveProperty(
        'message',
        UNKNOWN.statusText,
      ));
  });
});
