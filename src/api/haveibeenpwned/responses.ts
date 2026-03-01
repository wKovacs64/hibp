/**
 * Known potential responses from the remote API.
 *
 * Unfortunately, the API does not send a decent human-readable message back with each response, but
 * they are documented on the website: https://haveibeenpwned.com/api/v3#ResponseCodes
 *
 * These objects simply provide a mapping between the HTTP response status code and the
 * corresponding human-readable message so we can throw a more descriptive error for the consumer.
 * (They are also leveraged in our tests.)
 */

/** @internal */
export const BAD_REQUEST = {
  status: 400 as const,
  statusText:
    "Bad request — the account does not comply with an acceptable format.",
};

/**
 * The API includes a human-readable error message as text in the body of this
 * response type. Manually populating the message here purely for use in tests.
 *
 * @internal
 */
export const UNAUTHORIZED = {
  status: 401 as const,
  body: `Your request to the API couldn't be authorised. Check you have the right value in the "hibp-api-key" header, refer to the documentation for more: https://haveibeenpwned.com/API/v3#Authorisation`,
};

/** @internal */
export const FORBIDDEN = {
  status: 403 as const,
  statusText: "Forbidden - access denied.",
};

/** @internal */
export const BLOCKED = {
  headers: new Map([["cf-ray", "someRayId"]]),
  status: 403 as const,
};

/** @internal */
export const NOT_FOUND = {
  status: 404 as const,
};

/**
 * The API includes a JSON object containing a human-readable message in the
 * body of this response type. Manually populating the message here purely for
 * use in tests.
 *
 * @internal
 */
export const TOO_MANY_REQUESTS = {
  headers: new Map([["retry-after", "2"]]),
  status: 429 as const,
  body: {
    statusCode: 429 as const,
    message: "Rate limit is exceeded. Try again in 2 seconds.",
  },
};
