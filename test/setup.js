// eslint-disable-next-line import/no-extraneous-dependencies
import moxios from 'moxios';
import hibpAxiosInstance from '../src/internal/haveibeenpwned/axiosInstance';
import ppAxiosInstance from '../src/internal/pwnedpasswords/axiosInstance';

import {
  OK,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from '../src/internal/haveibeenpwned/responses';
import {
  RANGE_OK,
  RANGE_BAD_REQUEST,
} from '../src/internal/pwnedpasswords/responses';
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
  RANGE_PASSWORD_PWNED,
  RANGE_PASSWORD_CLEAN,
  RANGE_INVALID,
  RANGE_PASSWORD_PWNED_RESPONSE,
  RANGE_PASSWORD_CLEAN_RESPONSE,
} from './fixtures';

beforeAll(() => {
  moxios.install(hibpAxiosInstance);
  moxios.install(ppAxiosInstance);

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
  moxios.stubRequest(
    new RegExp(`/range/${encodeURIComponent(RANGE_PASSWORD_PWNED)}`),
    {
      status: RANGE_OK.status,
      response: RANGE_PASSWORD_PWNED_RESPONSE,
    },
  );
  moxios.stubRequest(
    new RegExp(`/range/${encodeURIComponent(RANGE_PASSWORD_CLEAN)}`),
    {
      status: RANGE_OK.status,
      response: RANGE_PASSWORD_CLEAN_RESPONSE,
    },
  );
  moxios.stubRequest(
    new RegExp(`/range/${encodeURIComponent(RANGE_INVALID)}`),
    {
      status: RANGE_BAD_REQUEST.status,
      response: RANGE_BAD_REQUEST.response,
    },
  );
  moxios.stubRequest(
    new RegExp(`/range/${encodeURIComponent(UNEXPECTED)}\\??`),
    {
      status: UNKNOWN.status,
      statusText: UNKNOWN.statusText,
    },
  );
  // All other requests
  moxios.stubRequest(/.*/, {
    status: 500,
    responseText: 'API request URL not mocked!',
  });
});

afterAll(() => {
  moxios.uninstall(hibpAxiosInstance);
  moxios.uninstall(ppAxiosInstance);
});
