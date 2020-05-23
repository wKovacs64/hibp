import fetch from 'isomorphic-unfetch';
import { ResponseBody } from '../src/api/haveibeenpwned/types';

/** @internal */
interface MockResponseOptions {
  headers?: Map<string, string>;
  status?: number;
  statusText?: string;
  body?: /* PwnedPasswords */ string | /* HIBP */ ResponseBody;
}

/** @internal */
interface MockResponse {
  headers: Map<string, string>;
  ok: boolean;
  status: number;
  statusText: string;
  json: jest.Mock;
  text: jest.Mock;
}

export const mockResponse = ({
  headers = new Map<string, string>(),
  status = 200,
  statusText = 'OK',
  body = undefined,
}: MockResponseOptions = {}): MockResponse => {
  const res = {
    headers,
    status,
    statusText,
    ok: status > 199 && status < 300,
    json: jest.fn(),
    text: jest.fn(),
  };

  if (typeof body === 'string') {
    res.text.mockResolvedValue(body);
  }

  if (typeof body === 'object') {
    res.json.mockResolvedValue(body);
  }

  return res;
};

export const mockFetch = fetch as jest.Mock;
