/* eslint-env mocha */
/* global describe, it, beforeEach, afterEach */
'use strict';

// Polyfill global Promise if necessary
if (global.Promise === undefined) {
  require('es6-promise').polyfill();
}

const expect = require('expect.js');
const fetchMock = require('fetch-mock/es5/server');
const mockery = require('mockery');

// Test data
const URL_PATTERN = '^https://haveibeenpwned.com/api';
const DOMAIN = 'foo.bar';
const DIRTY_ACCOUNT = 'foo';
const CLEAN_ACCOUNT = 'bar';
const DIRTY_SITE = 'foo.bar';
const CLEAN_SITE = 'baz.qux';
const DIRTY_EMAIL = 'foo@bar.com';
const CLEAN_EMAIL = 'baz@qux.com';
const INVALID_EMAIL = 'foobar';
const INVALID_HEADER = 'invalidheader';

// Configure mocked fetch calls and results
fetchMock.mock(`${URL_PATTERN}/breachedaccount/${DIRTY_ACCOUNT}`, {});
fetchMock.mock(`${URL_PATTERN}/breachedaccount/${CLEAN_ACCOUNT}`, 404);
fetchMock.mock(`${URL_PATTERN}/breachedaccount/${INVALID_HEADER}`, 403);
fetchMock.mock(`${URL_PATTERN}/breaches`, []);
fetchMock.mock(`${URL_PATTERN}/breach/${DIRTY_SITE}`, {});
fetchMock.mock(`${URL_PATTERN}/breach/${CLEAN_SITE}`, 404);
fetchMock.mock(`${URL_PATTERN}/dataclasses`, []);
fetchMock.mock(`${URL_PATTERN}/pasteaccount/${DIRTY_EMAIL}`, []);
fetchMock.mock(`${URL_PATTERN}/pasteaccount/${CLEAN_EMAIL}`, 404);
fetchMock.mock(`${URL_PATTERN}/pasteaccount/${INVALID_EMAIL}`, 400);

describe('hibp', () => {
  let hibp;

  beforeEach(() => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });
    mockery.registerMock('node-fetch', fetchMock.fetchMock);
    hibp = require('../hibp.js');
  });

  afterEach(() => {
    hibp = undefined;
    mockery.deregisterMock('node-fetch');
    mockery.disable();
  });

  describe('breachedAccount (dirty account, no parameters)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(DIRTY_ACCOUNT);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(DIRTY_ACCOUNT)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (dirty account, with truncateResults)', () => {
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(DIRTY_ACCOUNT, true);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(DIRTY_ACCOUNT, true)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (dirty account, with domain)', () => {
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(DIRTY_ACCOUNT, DOMAIN);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(DIRTY_ACCOUNT, DOMAIN)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (dirty account, with domain and truncateResults)',
      () => {
        it('should return a Promise', (done) => {
          let comboQuery = hibp.breachedAccount(DIRTY_ACCOUNT, DOMAIN, true);
          expect(comboQuery).to.be.a(Promise);
          expect(comboQuery).to.have.property('then');
          done();
        });

        it('should resolve with an object', (done) => {
          hibp.breachedAccount(DIRTY_ACCOUNT, DOMAIN, true)
              .then((breachData) => {
                expect(breachData).to.be.an('object');
                done();
              })
              .catch(done);
        });
      });

  describe('breachedAccount (clean account, no parameters)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(CLEAN_ACCOUNT);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(CLEAN_ACCOUNT)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with truncateResults)', () => {
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(CLEAN_ACCOUNT, true);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(CLEAN_ACCOUNT, true)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain)', () => {
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(CLEAN_ACCOUNT, DOMAIN);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(CLEAN_ACCOUNT, DOMAIN)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain and truncateResults)',
      () => {
        it('should return a Promise', (done) => {
          let comboQuery = hibp.breachedAccount(CLEAN_ACCOUNT, DOMAIN, true);
          expect(comboQuery).to.be.a(Promise);
          expect(comboQuery).to.have.property('then');
          done();
        });

        it('should resolve with undefined', (done) => {
          hibp.breachedAccount(CLEAN_ACCOUNT, DOMAIN, true)
              .then((breachData) => {
                expect(breachData).to.be(undefined);
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
      hibp.breachedAccount(INVALID_HEADER)
          .catch((err) => {
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
      hibp.breaches()
          .then((breachData) => {
            expect(breachData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('breaches (with domain)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breaches('adobe.com');
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.breaches('adobe.com')
          .then((breachData) => {
            expect(breachData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('breach (dirty site)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breach(DIRTY_SITE);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breach(DIRTY_SITE)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breach (clean site)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breach(CLEAN_SITE);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breach(CLEAN_SITE)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
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
      hibp.dataClasses()
          .then((dataClasses) => {
            expect(dataClasses).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (dirty email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(DIRTY_EMAIL);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.pasteAccount(DIRTY_EMAIL)
          .then((pasteData) => {
            expect(pasteData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (clean email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(CLEAN_EMAIL);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.pasteAccount(CLEAN_EMAIL)
          .then((pasteData) => {
            expect(pasteData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (invalid email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(INVALID_EMAIL);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should throw an Error starting with "Bad request"', (done) => {
      hibp.pasteAccount(INVALID_EMAIL)
          .catch((err) => {
            expect(err.message).to.match(/^Bad request/);
            done();
          });
    });
  });
});
