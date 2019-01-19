import { OK } from './internal/haveibeenpwned/responses';
import axios from './internal/haveibeenpwned/axiosInstance';
import search from './search';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('search', () => {
  it('searches breaches by username', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = null;

    mockAxios.get.mockResolvedValue({
      headers: {},
      status: OK.status,
      data: breaches,
    });

    return expect(search('breached')).resolves.toEqual({
      breaches,
      pastes,
    });
  });

  it('searches breaches and pastes by email address', () => {
    const breaches = [{ stuff: 'about', a: 'breach' }];
    const pastes = [{ other: 'stuff', about: 'a paste' }];

    mockAxios.get.mockImplementation(endpoint =>
      Promise.resolve({
        headers: {},
        status: OK.status,
        data: /breachedaccount/.test(endpoint) ? breaches : pastes,
      }),
    );

    return expect(search('pasted@email.com')).resolves.toEqual({
      breaches,
      pastes,
    });
  });
});
