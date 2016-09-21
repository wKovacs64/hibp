import expect from 'expect.js';
import sinon from 'sinon';
import hibp from '../src/hibp';
import {
    ERR,
    INVALID_HEADER,
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

    it('should re-throw request setup errors', (done) => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      hibp.dataClasses()
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err).to.be(ERR);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, no parameters)', () => {
    it('should resolve with an object', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_BREACHED)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with truncateResults)', () => {
    it('should resolve with an object', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with domain)', () => {
    it('should resolve with an object', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with domain and ' +
      'truncateResults)', () => {
    it('should resolve with an object', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, no parameters)', () => {
    it('should resolve with null', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_CLEAN)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with truncateResults)', () => {
    it('should resolve with null', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain)', () => {
    it('should resolve with null', (done) => {
      const handler = sinon.spy();
      hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain and truncateResults)',
      () => {
        it('should resolve with null', (done) => {
          const handler = sinon.spy();
          hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC)
              .then(handler)
              .then(() => {
                expect(handler.calledOnce).to.be(true);
                expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
                done();
              })
              .catch(done);
        });
      });

  describe('breachedAccount (invalid request header)', () => {
    it('should throw an Error starting with "Forbidden"', (done) => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      hibp.breachedAccount(INVALID_HEADER)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(/^Forbidden/);
            done();
          })
          .catch(done);
    });
  });

  describe('breaches (no parameters)', () => {
    it('should resolve with an array', (done) => {
      const handler = sinon.spy();
      hibp.breaches()
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
            done();
          })
          .catch(done);
    });
  });

  describe('breaches (with domain)', () => {
    it('should resolve with an array', (done) => {
      const handler = sinon.spy();
      hibp.breaches(OPTS_DOM)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
            done();
          })
          .catch(done);
    });
  });

  describe('breach (found)', () => {
    it('should resolve with an object', (done) => {
      const handler = sinon.spy();
      hibp.breach(BREACH_FOUND)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_OBJ);
            done();
          })
          .catch(done);
    });
  });

  describe('breach (not found)', () => {
    it('should resolve with null', (done) => {
      const handler = sinon.spy();
      hibp.breach(BREACH_NOT_FOUND)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
            done();
          })
          .catch(done);
    });
  });

  describe('dataClasses', () => {
    it('should resolve with an array', (done) => {
      const handler = sinon.spy();
      hibp.dataClasses()
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (pasted email)', () => {
    it('should resolve with an array', (done) => {
      const handler = sinon.spy();
      hibp.pasteAccount(EMAIL_PASTED)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_ARY);
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (clean email)', () => {
    it('should resolve with null', (done) => {
      const handler = sinon.spy();
      hibp.pasteAccount(EMAIL_CLEAN)
          .then(handler)
          .then(() => {
            expect(handler.calledOnce).to.be(true);
            expect(handler.getCall(0).args[0]).to.be(RESPONSE_CLEAN);
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (invalid email)', () => {
    it('should throw an Error starting with "Bad request"', (done) => {
      const handler = sinon.spy();
      const errorHandler = sinon.spy();
      hibp.pasteAccount(EMAIL_INVALID)
          .then(handler)
          .catch(errorHandler)
          .then(() => {
            expect(handler.called).to.be(false);
            expect(errorHandler.calledOnce).to.be(true);
            const err = errorHandler.getCall(0).args[0];
            expect(err.message).to.match(/^Bad request/);
            done();
          })
          .catch(done);
    });
  });
});
