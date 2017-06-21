import { expect } from 'chai';
import sinon from 'sinon';
import breaches from '../src/breaches';
import './mockAxios';
import { OPTS_DOM, RESPONSE_ARY } from './testData';

describe('breaches', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('no parameters', () => {
    it('should resolve with an array', () => (
      breaches().then(successHandler).then(() => {
        expect(successHandler.calledOnce).to.be.true;
        expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
      })
    ));
  });

  describe('with domain', () => {
    it('should resolve with an array', () => (
      breaches(OPTS_DOM).then(successHandler).then(() => {
        expect(successHandler.calledOnce).to.be.true;
        expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
      })
    ));
  });
});
