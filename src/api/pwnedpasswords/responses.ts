/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/api/v3#PwnedPasswords
 *
 */

/** @internal */
export const BAD_REQUEST = {
  status: 400 as const,
  body: "The hash prefix was not in a valid format",
};
