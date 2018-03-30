/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/API/v2#PwnedPasswords
 *
 */

export const OK = {
  status: 200,
};

export const BAD_REQUEST = {
  status: 400,
  data: 'The hash prefix was not in a valid format',
};
