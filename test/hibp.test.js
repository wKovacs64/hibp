import expect from 'expect.js';
import sinon from 'sinon';
import hibp from '../src/hibp';
import {
    ERR,
    INVALID_HEADER,
    RATE_LIMITED,
    UNKNOWN_ERROR,
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
    RESPONSE_CLEAN
} from './setup';

describe('hibp', () => {
  describe('_fetchFromApi', () => {
    let failboat;

    before(() => {
      failboat = hibp._axios.interceptors.request.use(() => {
        throw ERR;
      });
    });

    after(() => {
      hibp._axios.interceptors.request.eject(failboat);
    });

    it('should re-throw request setup errors', () => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      return hibp.dataClasses()
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err).to.be(ERR);
          });
    });
  });

  describe('breachedAccount (breached account, no parameters)', () => {
    it('should resolve with an object', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_BREACHED)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
          });
    });
  });

  describe('breachedAccount (breached account, with truncateResults)', () => {
    it('should resolve with an object', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
          });
    });
  });

  describe('breachedAccount (breached account, with domain)', () => {
    it('should resolve with an object', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
          });
    });
  });

  describe('breachedAccount (breached account, with domain and ' +
      'truncateResults)', () => {
    it('should resolve with an object', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
          });
    });
  });

  describe('breachedAccount (clean account, no parameters)', () => {
    it('should resolve with null', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_CLEAN)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
          });
    });
  });

  describe('breachedAccount (clean account, with truncateResults)', () => {
    it('should resolve with null', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
          });
    });
  });

  describe('breachedAccount (clean account, with domain)', () => {
    it('should resolve with null', () => {
      const handler = sinon.spy();
      return hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
          });
    });
  });

  describe('breachedAccount (clean account, with domain and truncateResults)',
      () => {
        it('should resolve with null', () => {
          const handler = sinon.spy();
          return hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC)
              .then(handler)
              .then(() => {
                expect(handler.calledOnce).to.be(true);
                expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
              });
        });
      });

  describe('breachedAccount (invalid request header)', () => {
    it('should throw an Error starting with "Forbidden"', () => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      return hibp.breachedAccount(INVALID_HEADER)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(/^Forbidden/);
          });
    });
  });

  describe('breachedAccount (rate limited)', () => {
    it('should throw an Error starting with "Too many requests"', () => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      return hibp.breachedAccount(RATE_LIMITED)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(/^Too many requests/);
          });
    });
  });

  describe('breachedAccount (unexpected HTTP error)', () => {
    it('should throw an Error with the status text from the response', () => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      return hibp.breachedAccount(UNKNOWN_ERROR)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(new RegExp(`${UNKNOWN_ERROR}`));
          });
    });
  });

  describe('breaches (no parameters)', () => {
    it('should resolve with an array', () => {
      const handler = sinon.spy();
      return hibp.breaches()
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
          });
    });
  });

  describe('breaches (with domain)', () => {
    it('should resolve with an array', () => {
      const handler = sinon.spy();
      return hibp.breaches(OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
          });
    });
  });

  describe('breach (found)', () => {
    it('should resolve with an object', () => {
      const handler = sinon.spy();
      return hibp.breach(BREACH_FOUND)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
          });
    });
  });

  describe('breach (not found)', () => {
    it('should resolve with null', () => {
      const handler = sinon.spy();
      return hibp.breach(BREACH_NOT_FOUND)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
          });
    });
  });

  describe('dataClasses', () => {
    it('should resolve with an array', () => {
      const handler = sinon.spy();
      return hibp.dataClasses()
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
          });
    });
  });

  describe('pasteAccount (pasted email)', () => {
    it('should resolve with an array', () => {
      const handler = sinon.spy();
      return hibp.pasteAccount(EMAIL_PASTED)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
          });
    });
  });

  describe('pasteAccount (clean email)', () => {
    it('should resolve with null', () => {
      const handler = sinon.spy();
      return hibp.pasteAccount(EMAIL_CLEAN)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
          });
    });
  });

  describe('pasteAccount (invalid email)', () => {
    it('should throw an Error starting with "Bad request"', () => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      return hibp.pasteAccount(EMAIL_INVALID)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(/^Bad request/);
          });
    });
  });
});
