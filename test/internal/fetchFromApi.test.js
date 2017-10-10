import dataClasses from '../../src/dataClasses';
import breachedAccount from '../../src/breachedAccount';
import axiosInstance from '../../src/internal/axiosInstance';
import '../mockAxios';
import {
  BAD_REQUEST,
  FORBIDDEN,
  TOO_MANY_REQUESTS,
} from '../../src/internal/responses';
import {
  UNKNOWN,
  ERR,
  INVALID_HEADER,
  RATE_LIMITED,
  UNEXPECTED,
  EMAIL_INVALID,
} from '../testData';

describe('internal: fetchFromApi', () => {
  const successHandler = jest.fn();
  const errorHandler = jest.fn();

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
      dataClasses()
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(0);
          expect(errorHandler).toHaveBeenCalledTimes(1);
          const err = errorHandler.mock.calls[0][0];
          expect(err).toBe(ERR);
        }));
  });

  describe('invalid account format', () => {
    it('should throw an Error with "Bad Request" status text', () =>
      breachedAccount(EMAIL_INVALID)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(0);
          expect(errorHandler).toHaveBeenCalledTimes(1);
          const err = errorHandler.mock.calls[0][0];
          expect(err.message).toMatch(new RegExp(BAD_REQUEST.statusText));
        }));
  });

  describe('invalid request header', () => {
    it('should throw an Error with "Forbidden" status text', () =>
      breachedAccount(INVALID_HEADER)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(0);
          expect(errorHandler).toHaveBeenCalledTimes(1);
          const err = errorHandler.mock.calls[0][0];
          expect(err.message).toMatch(new RegExp(FORBIDDEN.statusText));
        }));
  });

  describe('rate limited', () => {
    it('should throw an Error with "Too Many Requests" response data', () =>
      breachedAccount(RATE_LIMITED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(0);
          expect(errorHandler).toHaveBeenCalledTimes(1);
          const err = errorHandler.mock.calls[0][0];
          expect(err.message).toMatch(new RegExp(TOO_MANY_REQUESTS.response));
        }));
  });

  describe('unexpected HTTP error', () => {
    it('should throw an Error with the response status text', () =>
      breachedAccount(UNEXPECTED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler).toHaveBeenCalledTimes(0);
          expect(errorHandler).toHaveBeenCalledTimes(1);
          const err = errorHandler.mock.calls[0][0];
          expect(err.message).toMatch(new RegExp(UNKNOWN.statusText));
        }));
  });
});
