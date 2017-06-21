import { expect } from 'chai';
import sinon from 'sinon';
import breachedAccount from '../src/breachedAccount';
import './mockAxios';
import {
  ACCOUNT_BREACHED,
  ACCOUNT_CLEAN,
  OPTS_DOM,
  OPTS_TRUNC,
  OPTS_DOM_TRUNC,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from './testData';

describe('breachedAccount', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('breached (no parameters)', () => {
    it('should resolve with an object', () => (
      breachedAccount(ACCOUNT_BREACHED)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breached (with truncateResults)', () => {
    it('should resolve with an object', () => (
      breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breached (with domain)', () => {
    it('should resolve with an object', () => (
      breachedAccount(ACCOUNT_BREACHED, OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breached (with domain and truncateResults)', () => {
    it('should resolve with an object', () => (
      breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('clean (no parameters)', () => {
    it('should resolve with null', () => (
      breachedAccount(ACCOUNT_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('clean (with truncateResults)', () => {
    it('should resolve with null', () => (
      breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('clean (with domain)', () => {
    it('should resolve with null', () => (
      breachedAccount(ACCOUNT_CLEAN, OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('clean (with domain and truncateResults)', () => {
    it('should resolve with null', () => (
      breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });
});
