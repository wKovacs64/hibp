/** @internal */
export const BAD_REQUEST = {
  status: 400 as const,
  statusText:
    "Bad request — the account does not comply with an acceptable format.",
};

/** @internal */
export const UNAUTHORIZED = {
  status: 401 as const,
};

/** @internal */
export const FORBIDDEN = {
  status: 403 as const,
  statusText: "Forbidden - access denied.",
};

/** @internal */
export const NOT_FOUND = {
  status: 404 as const,
  statusText: "Not found.",
};

/** @internal */
export const TOO_MANY_REQUESTS = {
  status: 429 as const,
};
