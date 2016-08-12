import expect from 'expect.js';
import moxios from 'moxios';
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
    RESPONSE_CLEAN,
    STATUS_200,
    STATUS_400,
    STATUS_403,
    STATUS_404
} from './setup';

describe('hibp', () => {
  before(() => {
    moxios.install(hibp.axios);

    // Configure mocked API calls and results
    moxios.stubRequest(
        new RegExp(`/breachedaccount/${ACCOUNT_BREACHED}\\??`), {
          status: STATUS_200,
          response: RESPONSE_OBJ
        });
    moxios.stubRequest(
        new RegExp(`/breachedaccount/${ACCOUNT_CLEAN}\\??`), {
          status: STATUS_404
        });
    moxios.stubRequest(
        new RegExp(`/breachedaccount/${INVALID_HEADER}\\??`), {
          status: STATUS_403
        });
    moxios.stubRequest(
        new RegExp('/breaches\\??'), {
          status: STATUS_200,
          response: RESPONSE_ARY
        });
    moxios.stubRequest(
        new RegExp(`/breach/${BREACH_FOUND}`), {
          status: STATUS_200,
          response: RESPONSE_OBJ
        });
    moxios.stubRequest(
        new RegExp(`/breach/${BREACH_NOT_FOUND}`), {
          status: STATUS_404
        });
    moxios.stubRequest(
        new RegExp('/dataclasses'), {
          status: STATUS_200,
          response: RESPONSE_ARY
        });
    moxios.stubRequest(
        new RegExp(`/pasteaccount/${EMAIL_PASTED}`), {
          status: STATUS_200,
          response: RESPONSE_ARY
        });
    moxios.stubRequest(
        new RegExp(`/pasteaccount/${EMAIL_CLEAN}`), {
          status: STATUS_404
        });
    moxios.stubRequest(
        new RegExp(`/pasteaccount/${EMAIL_INVALID}`), {
          status: STATUS_400
        });
  });

  after(() => {
    moxios.uninstall(hibp.axios);
  });

  describe('fetchFromApi', () => {
    let failboat;

    before(() => {
      failboat = hibp.axios.interceptors.request.use(() => {
        throw ERR;
      });
    });

    after(() => {
      hibp.axios.interceptors.request.eject(failboat);
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
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(ACCOUNT_BREACHED);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_TRUNC);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let comboQuery = hibp.breachedAccount(ACCOUNT_BREACHED, OPTS_DOM_TRUNC);
      expect(comboQuery).to.be.a(Promise);
      expect(comboQuery).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(ACCOUNT_CLEAN);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_TRUNC);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

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
        it('should return a Promise', (done) => {
          let comboQuery = hibp.breachedAccount(ACCOUNT_CLEAN, OPTS_DOM_TRUNC);
          expect(comboQuery).to.be.a(Promise);
          expect(comboQuery).to.have.property('then');
          done();
        });

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
    it('should return a Promise', (done) => {
      let invalidQuery = hibp.breachedAccount(INVALID_HEADER);
      expect(invalidQuery).to.be.a(Promise);
      expect(invalidQuery).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.breaches();
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.breaches(OPTS_DOM);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.breach(BREACH_FOUND);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.breach(BREACH_NOT_FOUND);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.dataClasses();
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_PASTED);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_CLEAN);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_INVALID);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

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
