/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/API/v2#PwnedPasswords
 *
 */

export interface PwnedPasswordsApiResponse {
  // eslint-disable-next-line no-restricted-globals
  status: number;
  data?: string;
}

/** @internal */
export const OK = {
  status: 200,
};

/** @internal */
export const BAD_REQUEST = {
  status: 400,
  data: 'The hash prefix was not in a valid format',
};
