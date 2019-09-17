import { mockResponse } from '../../test/utils';
import axios from '../api/haveibeenpwned/axiosInstance';
import search from '../search';

const mockGet = jest.spyOn(axios, 'get');

describe('search', () => {
  it('searches breaches by username', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = null;

    mockGet.mockResolvedValue(mockResponse({ data: breaches }));

    return expect(search('breached')).resolves.toEqual({
      breaches,
      pastes,
    });
  });

  it('searches breaches and pastes by email address', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = [{ other: 'stuff', about: 'a paste' }];

    mockGet.mockImplementation(endpoint =>
      Promise.resolve(
        mockResponse({
          data: /breachedaccount/.test(endpoint) ? breaches : pastes,
        }),
      ),
    );

    return expect(search('pasted@email.com')).resolves.toEqual({
      breaches,
      pastes,
    });
  });

  it('forwards the apiKey option correctly', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const apiKey = 'my-api-key';
    const requestConfigWithHeaders = {
      headers: {
        'HIBP-API-Key': apiKey,
      },
    };

    mockGet.mockResolvedValue(mockResponse({ data: breaches }));

    return search('breached')
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet).toHaveBeenCalledWith(
          expect.any(String),
          expect.not.objectContaining(requestConfigWithHeaders),
        );
        mockGet.mockClear();
      })
      .then(() => search('breached', { apiKey }))
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining(requestConfigWithHeaders),
        );
      });
  });

  it('forwards the truncate option correctly', () => {
    return search('breached')
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).not.toMatch(/truncateResponse=false/);
        mockGet.mockClear();
      })
      .then(() => search('breached', { truncate: false }))
      .then(() => {
        expect(mockGet).toHaveBeenCalledTimes(1);
        expect(mockGet.mock.calls[0][0]).toMatch(/truncateResponse=false/);
      });
  });
});
