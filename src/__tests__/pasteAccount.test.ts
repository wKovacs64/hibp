import { AxiosError, mockResponse } from '../../test/utils';
import { NOT_FOUND } from '../api/haveibeenpwned/responses';
import axios from '../api/haveibeenpwned/axiosInstance';
import pasteAccount from '../pasteAccount';

const mockGet = jest.spyOn(axios, 'get');

describe('pasteAccount', () => {
  beforeAll(() => {
    mockGet.mockRejectedValue(new AxiosError(NOT_FOUND));
  });

  it('honors the apiKey option', () => {
    const apiKey = 'my-api-key';
    const requestConfigWithHeaders = {
      headers: {
        'HIBP-API-Key': apiKey,
      },
    };

    return pasteAccount('whatever@example.com')
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet).toHaveBeenCalledWith(
          expect.any(String),
          expect.not.objectContaining(requestConfigWithHeaders),
        );
        mockGet.mockClear();
      })
      .then(() => pasteAccount('whatever@example.com', { apiKey }))
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining(requestConfigWithHeaders),
        );
      });
  });

  describe('pasted email', () => {
    it('resolves with data from the remote API', () => {
      const data = [{ paste: 'information' }];
      mockGet.mockResolvedValue(mockResponse({ data }));
      return expect(pasteAccount('pasted@email.com')).resolves.toEqual(data);
    });
  });

  describe('clean email', () => {
    it('resolves with null', () => {
      mockGet.mockRejectedValue(new AxiosError(NOT_FOUND));
      return expect(pasteAccount('clean@whistle.com')).resolves.toBeNull();
    });
  });
});
