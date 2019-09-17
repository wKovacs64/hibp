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

export interface ResponseBody {
  statusCode: number;
  message: string;
}

export interface HaveIBeenPwnedApiResponse {
  headers: { 'cf-ray'?: string };
  status: number;
  statusText?: string;
  data?: ResponseBody;
}

/** @internal */
export const OK: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 200,
};

/** @internal */
export const BAD_REQUEST: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 400,
  statusText:
    'Bad request — the account does not comply with an acceptable format.',
};

/**
 * This response has unique behavior. For some reason, the API includes an
 * object in the response body for this one, containing a human-readable
 * message. Manually populating the message here purely for use in tests.
 *
 * @internal
 */
export const UNAUTHORIZED: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 401,
  data: {
    statusCode: 401,
    message: 'Access denied due to missing hibp-api-key.',
  },
};

/** @internal */
export const FORBIDDEN: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 403,
  statusText: 'Forbidden - access denied.',
};

/** @internal */
export const BLOCKED: HaveIBeenPwnedApiResponse = {
  headers: { 'cf-ray': 'someRayId' },
  status: 403,
};

/** @internal */
export const NOT_FOUND: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 404,
};

/**
 * This response has unique behavior. For some reason, the API includes an
 * object in the response body for this one, containing a human-readable
 * message. Manually populating the message here purely for use in tests.
 *
 * @internal
 */
export const TOO_MANY_REQUESTS: HaveIBeenPwnedApiResponse = {
  headers: {},
  status: 429,
  data: {
    statusCode: 429,
    message: 'Rate limit is exceeded. Try again in 2 seconds.',
  },
};
