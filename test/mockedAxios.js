import moxios from 'moxios';
import hibp from '../src/hibp';
import {
  OK,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from '../src/responses';
import {
  EMAIL_INVALID,
  INVALID_HEADER,
  RATE_LIMITED,
  UNEXPECTED,
  UNKNOWN,
  ACCOUNT_BREACHED,
  RESPONSE_OBJ,
  ACCOUNT_CLEAN,
  RESPONSE_ARY,
  BREACH_FOUND,
  BREACH_NOT_FOUND,
  EMAIL_PASTED,
  EMAIL_CLEAN,
} from './testData';

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
