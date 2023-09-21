import { http } from 'msw';
import { server } from '../mocks/server';
import { VERIFIED_BREACH, UNVERIFIED_BREACH } from '../../test/fixtures';
import { UNAUTHORIZED } from '../api/haveibeenpwned/responses';
import type { ErrorData } from '../api/haveibeenpwned/types';
import { breachedAccount } from '../breached-account';

describe('breachedAccount', () => {
  const apiKey = 'my-api-key';
  const BREACHED_ACCOUNT_DATA = [
    { Name: VERIFIED_BREACH.Name },
    { Name: UNVERIFIED_BREACH.Name },
  ];
  const BREACHED_ACCOUNT_DATA_EXPANDED = [VERIFIED_BREACH, UNVERIFIED_BREACH];
  const BREACHED_ACCOUNT_DATA_NO_UNVERIFIED = [{ Name: VERIFIED_BREACH.Name }];

  it('honors the apiKey option', async () => {
    server.use(
      http.get('*', ({ request }) => {
        if (!request.headers.get('hibp-api-key')) {
          return new Response(JSON.stringify(UNAUTHORIZED.body), {
            status: UNAUTHORIZED.status,
          });
        }

        return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
      }),
    );

    await expect(breachedAccount('breached')).rejects.toThrow(
      (UNAUTHORIZED.body as ErrorData).message,
    );
    await expect(breachedAccount('breached', { apiKey })).resolves.toEqual(
      BREACHED_ACCOUNT_DATA,
    );
  });

  it('honors the truncate option', async () => {
    server.use(
      http.get('*', ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get('truncateResponse') === 'false') {
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA_EXPANDED));
        }
        return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
      }),
    );

    await expect(breachedAccount('breached')).resolves.toEqual(
      BREACHED_ACCOUNT_DATA,
    );
    await expect(
      breachedAccount('breached', { truncate: false }),
    ).resolves.toEqual(BREACHED_ACCOUNT_DATA_EXPANDED);
  });

  it('honors the includeUnverified option', async () => {
    server.use(
      http.get('*', ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get('includeUnverified') === 'false') {
          return new Response(
            JSON.stringify(BREACHED_ACCOUNT_DATA_NO_UNVERIFIED),
          );
        }
        return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
      }),
    );

    await expect(breachedAccount('breached')).resolves.toEqual(
      BREACHED_ACCOUNT_DATA,
    );
    await expect(
      breachedAccount('breached', { includeUnverified: false }),
    ).resolves.toEqual(BREACHED_ACCOUNT_DATA_NO_UNVERIFIED);
  });

  it('honors the domain option', () => {
    server.use(
      http.get('*', ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get('domain') === 'foo.bar') {
          return new Response(JSON.stringify(BREACHED_ACCOUNT_DATA));
        }
        return new Response(null, { status: 418 });
      }),
    );

    return expect(
      breachedAccount('breached', { domain: 'foo.bar' }),
    ).resolves.toEqual(BREACHED_ACCOUNT_DATA);
  });
});
