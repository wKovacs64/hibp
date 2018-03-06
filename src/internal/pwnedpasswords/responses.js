/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/API/v2#PwnedPasswords
 *
 */

export const RANGE_OK = {
  status: 200,
};

export const RANGE_BAD_REQUEST = {
  status: 400,
  response: 'The hash prefix was not in a valid format',
};
