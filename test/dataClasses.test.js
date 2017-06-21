import { expect } from 'chai';
import sinon from 'sinon';
import dataClasses from '../src/dataClasses';
import './mockAxios';
import { RESPONSE_ARY } from './testData';

describe('dataClasses', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('no parameters', () => {
    it('should resolve with an array', () => (
      dataClasses().then(successHandler).then(() => {
        expect(successHandler.calledOnce).to.be.true;
        expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
      })
    ));
  });
});
