import moxios from 'moxios';
import axiosInstance from '../src/internal/axiosInstance';
import {
  OK,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from '../src/internal/responses';
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
  PASSWORD_PWNED,
  PASSWORD_CLEAN,
} from './testData';

before(() => {
  moxios.install(axiosInstance);

  // Configure mocked API calls and results
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(EMAIL_INVALID)}`),
    {
      status: BAD_REQUEST.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(INVALID_HEADER)}\\??`),
    {
      status: FORBIDDEN.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(RATE_LIMITED)}\\??`),
    {
      status: TOO_MANY_REQUESTS.status,
      response: TOO_MANY_REQUESTS.response,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(UNEXPECTED)}\\??`),
    {
      status: UNKNOWN.status,
      statusText: UNKNOWN.statusText,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(ACCOUNT_BREACHED)}\\??`),
    {
      status: OK.status,
      response: RESPONSE_ARY,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(ACCOUNT_CLEAN)}\\??`),
    {
      status: NOT_FOUND.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breachedaccount/${encodeURIComponent(EMAIL_PASTED)}\\??`),
    {
      status: OK.status,
      response: RESPONSE_ARY,
    },
  );
  moxios.stubRequest(new RegExp('/breaches\\??'), {
    status: OK.status,
    response: RESPONSE_ARY,
  });
  moxios.stubRequest(
    new RegExp(`/breach/${encodeURIComponent(BREACH_FOUND)}`),
    {
      status: OK.status,
      response: RESPONSE_OBJ,
    },
  );
  moxios.stubRequest(
    new RegExp(`/breach/${encodeURIComponent(BREACH_NOT_FOUND)}`),
    {
      status: NOT_FOUND.status,
    },
  );
  moxios.stubRequest(new RegExp('/dataclasses'), {
    status: OK.status,
    response: RESPONSE_ARY,
  });
  moxios.stubRequest(
    new RegExp(`/pwnedpassword/${encodeURIComponent(PASSWORD_PWNED)}`),
    {
      status: OK.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/pwnedpassword/${encodeURIComponent(PASSWORD_CLEAN)}`),
    {
      status: NOT_FOUND.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/pasteaccount/${encodeURIComponent(EMAIL_PASTED)}`),
    {
      status: OK.status,
      response: RESPONSE_ARY,
    },
  );
  moxios.stubRequest(
    new RegExp(`/pasteaccount/${encodeURIComponent(EMAIL_CLEAN)}`),
    {
      status: NOT_FOUND.status,
    },
  );
  moxios.stubRequest(
    new RegExp(`/pasteaccount/${encodeURIComponent(ACCOUNT_BREACHED)}`),
    {
      status: BAD_REQUEST.status,
    },
  );
});

after(() => {
  moxios.uninstall(axiosInstance);
});
