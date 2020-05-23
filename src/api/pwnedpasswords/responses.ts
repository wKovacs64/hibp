/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/api/v3#PwnedPasswords
 *
 */

/** @internal */
export interface PwnedPasswordsApiResponse {
  status: number;
  body?: string;
}

/** @internal */
export const OK: PwnedPasswordsApiResponse = {
  status: 200,
};

/** @internal */
export const BAD_REQUEST: PwnedPasswordsApiResponse = {
  status: 400,
  body: 'The hash prefix was not in a valid format',
};
