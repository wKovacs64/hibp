import { expect } from 'chai';
import sinon from 'sinon';
import search from '../src/search';
import './mockAxios';
import { ACCOUNT_BREACHED, EMAIL_PASTED } from './testData';

describe('search', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  it('should search breaches by username', () => (
    search(ACCOUNT_BREACHED)
      .then(successHandler)
      .then(() => {
        expect(successHandler.calledOnce).to.be.true;
        const result = successHandler.getCall(0).args[0];
        expect(result).to.be.an('object')
          .that.has.all.keys(['breaches', 'pastes']);
        expect(result.breaches).to.be.an('array');
        expect(result.pastes).to.be.null;
      })
  ));

  it('should search breaches and pastes by email address', () => (
    search(EMAIL_PASTED)
      .then(successHandler)
      .then(() => {
        expect(successHandler.calledOnce).to.be.true;
        const result = successHandler.getCall(0).args[0];
        expect(result).to.be.an('object')
          .that.has.all.keys(['breaches', 'pastes']);
        expect(result.breaches).to.be.an('array');
        expect(result.pastes).to.be.an('array');
      })
  ));
});
