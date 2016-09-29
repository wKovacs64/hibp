export const OK = {
  status: 200,
};

export const BAD_REQUEST = {
  status: 400,
  statusText: 'Bad request — the account does not comply with an acceptable ' +
    'format.',
};

export const FORBIDDEN = {
  status: 403,
  statusText: 'Forbidden - no user agent has been specified in the request.',
};

export const NOT_FOUND = {
  status: 404,
  statusText: 'Not found - the account could not be found and has therefore ' +
    'not been pwned.',
};

export const TOO_MANY_REQUESTS = {
  status: 429,
  statusText: 'Too many requests - the rate limit has been exceeded.',
  data: 'Rate limit exceeded, refer to acceptable use of the API: ' +
    'https://haveibeenpwned.com/API/v2#AcceptableUse',
};
