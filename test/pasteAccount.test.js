import { expect } from 'chai';
import sinon from 'sinon';
import pasteAccount from '../src/pasteAccount';
import './mockAxios';
import {
  EMAIL_PASTED,
  EMAIL_CLEAN,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from './testData';

describe('pasteAccount', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('pasted email', () => {
    it('should resolve with an array', () => (
      pasteAccount(EMAIL_PASTED)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('clean email', () => {
    it('should resolve with null', () => (
      pasteAccount(EMAIL_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });
});
