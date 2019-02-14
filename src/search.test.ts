import { mockResponse } from '../test/utils';
import axios from './internal/haveibeenpwned/axiosInstance';
import search from './search';

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
});
