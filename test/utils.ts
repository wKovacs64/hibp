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
