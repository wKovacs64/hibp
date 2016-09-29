/* eslint-disable import/imports-first */
import { polyfill } from 'es6-promise';

if (global.Promise === undefined) {
  polyfill();
}

import moxios from 'moxios';
import hibp from '../src/hibp';
import {
  OK,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from '../src/responses';

const DOMAIN = 'foo.bar';

export const UNKNOWN = {
  status: 999,
  statusText: 'Unknown - something unexpected happened.',
};
export const ERR = new Error('Set sail for fail!');
export const INVALID_HEADER = 'baz';
export const RATE_LIMITED = 'quux';
export const UNEXPECTED = 'qux';
export const ACCOUNT_BREACHED = 'foo';
export const ACCOUNT_CLEAN = 'bar';
export const BREACH_FOUND = 'foo';
export const BREACH_NOT_FOUND = 'bar';
export const EMAIL_PASTED = 'foo@bar.com';
export const EMAIL_CLEAN = 'baz@qux.com';
export const EMAIL_INVALID = 'foobar';
export const OPTS_DOM = { domain: DOMAIN };
export const OPTS_TRUNC = { truncate: true };
export const OPTS_DOM_TRUNC = { domain: DOMAIN, truncate: true };
export const RESPONSE_OBJ = {};
export const RESPONSE_ARY = [];
export const RESPONSE_CLEAN = null;

before(() => {
  moxios.install(hibp._axios);

  // Configure mocked API calls and results
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${EMAIL_INVALID}`), {
      status: BAD_REQUEST.status,
    });
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${INVALID_HEADER}\\??`), {
      status: FORBIDDEN.status,
    });
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${RATE_LIMITED}\\??`), {
      status: TOO_MANY_REQUESTS.status,
      response: TOO_MANY_REQUESTS.response,
    });
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${UNEXPECTED}\\??`), {
      status: UNKNOWN.status,
      statusText: UNKNOWN.statusText,
    });
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${ACCOUNT_BREACHED}\\??`), {
      status: OK.status,
      response: RESPONSE_OBJ,
    });
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${ACCOUNT_CLEAN}\\??`), {
      status: NOT_FOUND.status,
    });
  moxios.stubRequest(
    new RegExp('/breaches\\??'), {
      status: OK.status,
      response: RESPONSE_ARY,
    });
  moxios.stubRequest(
    new RegExp(`/breach/${BREACH_FOUND}`), {
      status: OK.status,
      response: RESPONSE_OBJ,
    });
  moxios.stubRequest(
    new RegExp(`/breach/${BREACH_NOT_FOUND}`), {
      status: NOT_FOUND.status,
    });
  moxios.stubRequest(
    new RegExp('/dataclasses'), {
      status: OK.status,
      response: RESPONSE_ARY,
    });
  moxios.stubRequest(
    new RegExp(`/pasteaccount/${EMAIL_PASTED}`), {
      status: OK.status,
      response: RESPONSE_ARY,
    });
  moxios.stubRequest(
    new RegExp(`/pasteaccount/${EMAIL_CLEAN}`), {
      status: NOT_FOUND.status,
    });
});

after(() => {
  moxios.uninstall(hibp._axios);
});
