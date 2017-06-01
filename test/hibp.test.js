import { expect } from 'chai';
import sinon from 'sinon';
import hibp from '../src';
import './mockAxios';
import {
  BAD_REQUEST,
  FORBIDDEN,
  TOO_MANY_REQUESTS,
} from '../src/responses';
import {
  UNKNOWN,
  ERR,
  INVALID_HEADER,
  RATE_LIMITED,
  UNEXPECTED,
  ACCOUNT_BREACHED,
  ACCOUNT_CLEAN,
  BREACH_FOUND,
  BREACH_NOT_FOUND,
  EMAIL_PASTED,
  EMAIL_CLEAN,
  EMAIL_INVALID,
  OPTS_DOM,
  OPTS_TRUNC,
  OPTS_DOM_TRUNC,
  RESPONSE_OBJ,
  RESPONSE_ARY,
  RESPONSE_CLEAN,
} from './testData';

describe('hibp', () => {
  const successHandler = sinon.spy();
  const errorHandler = sinon.spy();

  afterEach(() => {
    successHandler.reset();
    errorHandler.reset();
  });

  describe('_fetchFromApi (request failure)', () => {
    let failboat;

    before(() => {
      failboat = hibp._axios.interceptors.request.use(() => {
        throw ERR;
      });
    });

    after(() => {
      hibp._axios.interceptors.request.eject(failboat);
    });

    it('should re-throw request setup errors', () => (
      hibp.dataClasses()
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err).to.equal(ERR);
        })
    ));
  });

  describe('_fetchFromApi (invalid account format)', () => {
    it('should throw an Error with "Bad Request" status text', () => (
      hibp.breachedAccount(EMAIL_INVALID)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(BAD_REQUEST.statusText));
        })
    ));
  });

  describe('_fetchFromApi (invalid request header)', () => {
    it('should throw an Error with "Forbidden" status text', () => (
      hibp.breachedAccount(INVALID_HEADER)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(FORBIDDEN.statusText));
        })
    ));
  });

  describe('_fetchFromApi (rate limited)', () => {
    it('should throw an Error with "Too Many Requests" response data', () => (
      hibp.breachedAccount(RATE_LIMITED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(TOO_MANY_REQUESTS.response));
        })
    ));
  });

  describe('_fetchFromApi (unexpected HTTP error)', () => {
    it('should throw an Error with the response status text', () => (
      hibp.breachedAccount(UNEXPECTED)
        .then(successHandler)
        .catch(errorHandler)
        .then(() => {
          expect(successHandler.called).to.be.false;
          expect(errorHandler.calledOnce).to.be.true;
          const err = errorHandler.getCall(0).args[0];
          expect(err.message).to.match(new RegExp(UNKNOWN.statusText));
        })
    ));
  });

  describe('breachedAccount (breached account, no parameters)', () => {
    it('should resolve with an object', () => (
      hibp.breachedAccount(ACCOUNT_BREACHED)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breachedAccount (breached account, with truncateResults)', () => {
    it('should resolve with an object', () => (
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breachedAccount (breached account, with domain)', () => {
    it('should resolve with an object', () => (
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breachedAccount (breached account, with domain and ' +
    'truncateResults)', () => {
    it('should resolve with an object', () => (
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breachedAccount (clean account, no parameters)', () => {
    it('should resolve with null', () => (
      hibp.breachedAccount(ACCOUNT_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('breachedAccount (clean account, with truncateResults)', () => {
    it('should resolve with null', () => (
      hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('breachedAccount (clean account, with domain)', () => {
    it('should resolve with null', () => (
      hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('breachedAccount (clean account, with domain and truncateResults)',
    () => {
      it('should resolve with null', () => (
        hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC)
          .then(successHandler)
          .then(() => {
            expect(successHandler.calledOnce).to.be.true;
            expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
          })
      ));
    });

  describe('breaches (no parameters)', () => {
    it('should resolve with an array', () => (
      hibp.breaches()
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breaches (with domain)', () => {
    it('should resolve with an array', () => (
      hibp.breaches(OPTS_DOM)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('breach (found)', () => {
    it('should resolve with an object', () => (
      hibp.breach(BREACH_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_OBJ);
        })
    ));
  });

  describe('breach (not found)', () => {
    it('should resolve with null', () => (
      hibp.breach(BREACH_NOT_FOUND)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('dataClasses', () => {
    it('should resolve with an array', () => (
      hibp.dataClasses()
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('pasteAccount (pasted email)', () => {
    it('should resolve with an array', () => (
      hibp.pasteAccount(EMAIL_PASTED)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_ARY);
        })
    ));
  });

  describe('pasteAccount (clean email)', () => {
    it('should resolve with null', () => (
      hibp.pasteAccount(EMAIL_CLEAN)
        .then(successHandler)
        .then(() => {
          expect(successHandler.calledOnce).to.be.true;
          expect(successHandler.getCall(0).args[0]).to.equal(RESPONSE_CLEAN);
        })
    ));
  });

  describe('search', () => {
    it('should search breaches by username', () => (
      hibp.search(ACCOUNT_BREACHED)
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
      hibp.search(EMAIL_PASTED)
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
});
