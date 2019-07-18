/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/api/v3#PwnedPasswords
 *
 */

export interface PwnedPasswordsApiResponse {
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
