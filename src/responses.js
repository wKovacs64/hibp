/**
 * Known potential responses from the remote API.
 *
 * Unfortunately, the API does not send a decent human-readable message back
 * with each response, but they are documented on the website:
 * https://haveibeenpwned.com/api/v2#ResponseCodes
 *
 * These objects simply provide a mapping between the HTTP response status code
 * and the corresponding human-readable message so we can throw a more
 * descriptive error for the consumer. (They are also leveraged in our tests.)
 */

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

/**
 * This response has unique behavior. For some reason, the API includes a
 * human-readable message in the response body for this one. Manually populating
 * the message here purely for use in tests.
 */
export const TOO_MANY_REQUESTS = {
  status: 429,
  response: 'Rate limit exceeded, refer to acceptable use of the API: ' +
    'https://haveibeenpwned.com/API/v2#AcceptableUse',
};
