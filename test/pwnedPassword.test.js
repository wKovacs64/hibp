import { expect } from 'chai';
import sinon from 'sinon';
import pwnedPassword from '../src/pwnedPassword';
import './mockAxios';
import { PASSWORD_PWNED, PASSWORD_CLEAN, OPTS_ISAHASH } from './testData';

describe('pwnedPassword', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('pwned (no parameters)', () => {
    it('should resolve to true', () => (
      pwnedPassword(PASSWORD_PWNED)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.be.true;
        })
    ));
  });

  describe('pwned (with isAHash)', () => {
    it('should resolve to true', () => (
      pwnedPassword(PASSWORD_PWNED, OPTS_ISAHASH)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.be.true;
        })
    ));
  });

  describe('clean (no parameters)', () => {
    it('should resolve to false', () => (
      pwnedPassword(PASSWORD_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.be.false;
        })
    ));
  });

  describe('clean (with isAHash)', () => {
    it('should resolve to false', () => (
      pwnedPassword(PASSWORD_CLEAN, OPTS_ISAHASH)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.be.false;
        })
    ));
  });
});
