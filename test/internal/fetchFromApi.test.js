import { expect } from 'chai';
import sinon from 'sinon';
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
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('request failure', () => {
    let failboat;

    before(() => {
      failboat = axiosInstance.interceptors.request.use(() => {
        throw ERR;
      });
    });

    after(() => {
      axiosInstance.interceptors.request.eject(failboat);
    });

    it('should re-throw request setup errors', () =>
      dataClasses()
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err).to.equal(ERR);
        }));
  });

  describe('invalid account format', () => {
    it('should throw an Error with "Bad Request" status text', () =>
      breachedAccount(EMAIL_INVALID)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(BAD_REQUEST.statusText));
        }));
  });

  describe('invalid request header', () => {
    it('should throw an Error with "Forbidden" status text', () =>
      breachedAccount(INVALID_HEADER)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(FORBIDDEN.statusText));
        }));
  });

  describe('rate limited', () => {
    it('should throw an Error with "Too Many Requests" response data', () =>
      breachedAccount(RATE_LIMITED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(TOO_MANY_REQUESTS.response));
        }));
  });

  describe('unexpected HTTP error', () => {
    it('should throw an Error with the response status text', () =>
      breachedAccount(UNEXPECTED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(UNKNOWN.statusText));
        }));
  });
});
