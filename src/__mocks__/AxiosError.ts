import { HaveIBeenPwnedApiResponse } from 'internal/haveibeenpwned/responses';
import { PwnedPasswordsApiResponse } from 'internal/pwnedpasswords/responses';

type ApiResponse = HaveIBeenPwnedApiResponse | PwnedPasswordsApiResponse;

/** @internal */
export default class AxiosError extends Error {
  response: ApiResponse;

  constructor(response: ApiResponse) {
    super();
    this.response = response;
  }
}
