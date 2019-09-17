import { HaveIBeenPwnedApiResponse } from '../src/api/haveibeenpwned/responses';
import { PwnedPasswordsApiResponse } from '../src/api/pwnedpasswords/responses';

type ApiResponse = HaveIBeenPwnedApiResponse | PwnedPasswordsApiResponse;

/** @internal */
export class AxiosError extends Error {
  response: ApiResponse;

  constructor(response: ApiResponse) {
    super();
    this.response = response;
  }
}

export function mockResponse({
  headers = {},
  status = 200,
  data = {},
  config = {},
  statusText = '',
}): import('axios').AxiosResponse {
  return {
    headers,
    status,
    data,
    config,
    statusText,
  };
}
