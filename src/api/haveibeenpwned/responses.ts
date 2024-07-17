/**
 * Known potential responses from the remote API.
 *
 * Unfortunately, the API does not send a decent human-readable message back
 * with each response, but they are documented on the website:
 * https://haveibeenpwned.com/api/v3#ResponseCodes
 *
 * These objects simply provide a mapping between the HTTP response status code
 * and the corresponding human-readable message so we can throw a more
 * descriptive error for the consumer. (They are also leveraged in our tests.)
 */

import type { ResponseBody } from './types.js';

/** @internal */
export interface HaveIBeenPwnedApiResponse {
  headers: Map<string, string>;
  status: number;
  statusText?: string;
  body?: ResponseBody;
  text?: string;
}

const emptyHeaders = new Map<string, string>();

/** @internal */
export const BAD_REQUEST: HaveIBeenPwnedApiResponse = {
  headers: emptyHeaders,
  status: 400,
  statusText: 'Bad request — the account does not comply with an acceptable format.',
};

/**
 * The API includes a human-readable error message as text in the body of this
 * response type. Manually populating the message here purely for use in tests.
 *
 * @internal
 */
export const UNAUTHORIZED: HaveIBeenPwnedApiResponse = {
  headers: emptyHeaders,
  status: 401,
  text: `Your request to the API couldn't be authorised. Check you have the right value in the "hibp-api-key" header, refer to the documentation for more: https://haveibeenpwned.com/API/v3#Authorisation`,
};

/** @internal */
export const FORBIDDEN: HaveIBeenPwnedApiResponse = {
  headers: emptyHeaders,
  status: 403,
  statusText: 'Forbidden - access denied.',
};

/** @internal */
export const BLOCKED: HaveIBeenPwnedApiResponse = {
  headers: new Map([['cf-ray', 'someRayId']]),
  status: 403,
};

/** @internal */
export const NOT_FOUND: HaveIBeenPwnedApiResponse = {
  headers: emptyHeaders,
  status: 404,
};

/**
 * The API includes a JSON object containing a human-readable message in the
 * body of this response type. Manually populating the message here purely for
 * use in tests.
 *
 * @internal
 */
export const TOO_MANY_REQUESTS: HaveIBeenPwnedApiResponse = {
  headers: new Map([['retry-after', '2']]),
  status: 429,
  body: {
    statusCode: 429,
    message: 'Rate limit is exceeded. Try again in 2 seconds.',
  },
};
