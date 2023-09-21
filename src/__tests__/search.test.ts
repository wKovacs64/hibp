import { http } from 'msw';
import { server } from '../mocks/server';
import { VERIFIED_BREACH, EXAMPLE_PASTE } from '../../test/fixtures';
import { search } from '../search';
import { UNAUTHORIZED } from '../api/haveibeenpwned/responses';
import type { ErrorData } from '../api/haveibeenpwned/types';

describe('search', () => {
  const BREACHES = [{ Name: VERIFIED_BREACH.Name }];
  const BREACHES_EXPANDED = [VERIFIED_BREACH];
  const PASTES = [EXAMPLE_PASTE];

  it('searches breaches by username', () => {
    server.use(
      http.get(/breachedaccount/, () => {
        return new Response(JSON.stringify(BREACHES));
      }),
    );

    return expect(search('breached')).resolves.toEqual({
      breaches: BREACHES,
      pastes: null,
    });
  });

  it('searches breaches and pastes by email address', () => {
    server.use(
      http.get(/breachedaccount/, () => {
        return new Response(JSON.stringify(BREACHES));
      }),
      http.get(/pasteaccount/, () => {
        return new Response(JSON.stringify(PASTES));
      }),
    );

    return expect(search('pasted@email.com')).resolves.toEqual({
      breaches: BREACHES,
      pastes: PASTES,
    });
  });

  it('forwards the apiKey option correctly', async () => {
    const apiKey = 'my-api-key';

    server.use(
      http.get(/breachedaccount/, ({ request }) => {
        if (!request.headers.has('hibp-api-key')) {
          return new Response(JSON.stringify(UNAUTHORIZED.body), {
            status: UNAUTHORIZED.status,
          });
        }

        return new Response(JSON.stringify(BREACHES));
      }),
      http.get(/pasteaccount/, ({ request }) => {
        if (!request.headers.has('hibp-api-key')) {
          return new Response(JSON.stringify(UNAUTHORIZED.body), {
            status: UNAUTHORIZED.status,
          });
        }

        return new Response(JSON.stringify(PASTES));
      }),
    );

    await expect(search('breached@foo.bar')).rejects.toThrow(
      (UNAUTHORIZED.body as ErrorData).message,
    );
    await expect(search('breached@foo.bar', { apiKey })).resolves.toEqual({
      breaches: BREACHES,
      pastes: PASTES,
    });
  });

  it('forwards the truncate option correctly', async () => {
    server.use(
      http.get(/breachedaccount/, ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get('truncateResponse') === 'false') {
          return new Response(JSON.stringify(BREACHES_EXPANDED));
        }
        return new Response(JSON.stringify(BREACHES));
      }),
    );

    await expect(search('breached')).resolves.toEqual({
      breaches: BREACHES,
      pastes: null,
    });
    await expect(search('breached', { truncate: false })).resolves.toEqual({
      breaches: BREACHES_EXPANDED,
      pastes: null,
    });
  });
});
