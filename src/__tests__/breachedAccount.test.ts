import { server, rest } from '../mocks/server';
import { VERIFIED_BREACH, UNVERIFIED_BREACH } from '../../test/fixtures';
import { UNAUTHORIZED } from '../api/haveibeenpwned/responses';
import { ErrorData } from '../api/haveibeenpwned/types';
import { breachedAccount } from '../breachedAccount';

describe('breachedAccount', () => {
  const apiKey = 'my-api-key';
  const BREACHED_ACCOUNT_DATA = [
    { Name: VERIFIED_BREACH.Name },
    { Name: UNVERIFIED_BREACH.Name },
  ];
  const BREACHED_ACCOUNT_DATA_EXPANDED = [VERIFIED_BREACH, UNVERIFIED_BREACH];
  const BREACHED_ACCOUNT_DATA_NO_UNVERIFIED = [{ Name: VERIFIED_BREACH.Name }];

  it('honors the apiKey option', () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        if (!req.headers.get('hibp-api-key')) {
          return res(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body),
          );
        }

        return res(ctx.json(BREACHED_ACCOUNT_DATA));
      }),
    );

    return breachedAccount('breached')
      .catch((err) => {
        expect(err.message).toBe((UNAUTHORIZED.body as ErrorData).message);
      })
      .then(() => breachedAccount('breached', { apiKey }))
      .then((apiData) => {
        expect(apiData).toEqual(BREACHED_ACCOUNT_DATA);
      });
  });

  it('honors the truncate option', () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(
          req.url.searchParams.get('truncateResponse') === 'false'
            ? ctx.json(BREACHED_ACCOUNT_DATA_EXPANDED)
            : ctx.json(BREACHED_ACCOUNT_DATA),
        );
      }),
    );

    return breachedAccount('breached')
      .then((apiData) => {
        expect(apiData).toEqual(BREACHED_ACCOUNT_DATA);
      })
      .then(() => breachedAccount('breached', { truncate: false }))
      .then((apiData) => {
        expect(apiData).toEqual(BREACHED_ACCOUNT_DATA_EXPANDED);
      });
  });

  it('honors the includeUnverified option', () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(
          req.url.searchParams.get('includeUnverified') === 'false'
            ? ctx.json(BREACHED_ACCOUNT_DATA_NO_UNVERIFIED)
            : ctx.json(BREACHED_ACCOUNT_DATA),
        );
      }),
    );

    return breachedAccount('breached')
      .then((apiData) => {
        expect(apiData).toEqual(BREACHED_ACCOUNT_DATA);
      })
      .then(() => breachedAccount('breached', { includeUnverified: false }))
      .then((apiData) => {
        expect(apiData).toEqual(BREACHED_ACCOUNT_DATA_NO_UNVERIFIED);
      });
  });

  it('honors the domain option', () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res.once(
          req.url.searchParams.get('domain') === 'foo.bar'
            ? ctx.json(BREACHED_ACCOUNT_DATA)
            : ctx.status(418),
        );
      }),
    );

    return expect(
      breachedAccount('breached', { domain: 'foo.bar' }),
    ).resolves.toEqual(BREACHED_ACCOUNT_DATA);
  });
});
