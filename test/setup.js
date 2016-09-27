import {polyfill} from 'es6-promise';
if (global.Promise === undefined) {
  polyfill();
}

import moxios from 'moxios';
import hibp from '../src/hibp';

const STATUS_200 = 200;
const STATUS_400 = 400;
const STATUS_403 = 403;
const STATUS_404 = 404;
const STATUS_456 = 456;
const DOMAIN = 'foo.bar';

export const ERR = new Error('Set sail for fail!');
export const INVALID_HEADER = 'baz';
export const UNKNOWN_ERROR = 'qux';
export const ACCOUNT_BREACHED = 'foo';
export const ACCOUNT_CLEAN = 'bar';
export const BREACH_FOUND = 'foo';
export const BREACH_NOT_FOUND = 'bar';
export const EMAIL_PASTED = 'foo@bar.com';
export const EMAIL_CLEAN = 'baz@qux.com';
export const EMAIL_INVALID = 'foobar';
export const OPTS_DOM = {domain: DOMAIN};
export const OPTS_TRUNC = {truncate: true};
export const OPTS_DOM_TRUNC = {domain: DOMAIN, truncate: true};
export const RESPONSE_OBJ = {};
export const RESPONSE_ARY = [];
export const RESPONSE_CLEAN = null;

before(() => {
  moxios.install(hibp._axios);

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
      new RegExp(`/breachedaccount/${UNKNOWN_ERROR}\\??`), {
        status: STATUS_456,
        response: 'Qux'
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
  moxios.uninstall(hibp._axios);
});
