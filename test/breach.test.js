import { expect } from 'chai';
import sinon from 'sinon';
import breach from '../src/breach';
import './mockAxios';
import {
  BREACH_FOUND,
  BREACH_NOT_FOUND,
  RESPONSE_OBJ,
  RESPONSE_CLEAN,
} from './testData';

describe('breach', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('found', () => {
    it('should resolve with an object', () =>
      breach(BREACH_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_OBJ);
        }));
  });

  describe('not found', () => {
    it('should resolve with null', () =>
      breach(BREACH_NOT_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        }));
  });
});
