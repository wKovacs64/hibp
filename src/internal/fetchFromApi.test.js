import {
  ERR,
  INVALID_HEADER,
  RATE_LIMITED,
  UNEXPECTED,
  EMAIL_INVALID,
} from '../__mocks__/testData';
import dataClasses from '../dataClasses';
import breachedAccount from '../breachedAccount';
import axiosInstance from './axiosInstance';

describe('internal: fetchFromApi', () => {
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
      expect(dataClasses()).rejects.toThrowErrorMatchingSnapshot());
  });

  describe('invalid account format', () => {
    it('should throw a "Bad Request" error', () =>
      expect(
        breachedAccount(EMAIL_INVALID),
      ).rejects.toThrowErrorMatchingSnapshot());
  });

  describe('invalid request header', () => {
    it('should throw a "Forbidden" error', () =>
      expect(
        breachedAccount(INVALID_HEADER),
      ).rejects.toThrowErrorMatchingSnapshot());
  });

  describe('rate limited', () => {
    it('should throw a "Too Many Requests" error', () =>
      expect(
        breachedAccount(RATE_LIMITED),
      ).rejects.toThrowErrorMatchingSnapshot());
  });

  describe('unexpected HTTP error', () => {
    it('should throw an "Unknown" error', () =>
      expect(
        breachedAccount(UNEXPECTED),
      ).rejects.toThrowErrorMatchingSnapshot());
  });
});
