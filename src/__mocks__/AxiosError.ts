import { HaveIBeenPwnedApiResponse } from 'api/haveibeenpwned/responses';
import { PwnedPasswordsApiResponse } from 'api/pwnedpasswords/responses';

type ApiResponse = HaveIBeenPwnedApiResponse | PwnedPasswordsApiResponse;

/** @internal */
export default class AxiosError extends Error {
  response: ApiResponse;

  constructor(response: ApiResponse) {
    super();
    this.response = response;
  }
}
