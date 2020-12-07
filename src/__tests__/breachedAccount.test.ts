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

  /* eslint-disable jest/no-commented-out-tests */
  // describe('breached', () => {
  // describe('no extra parameters (apiKey only)', () => {
  //   it('resolves with body from the remote API', () => {
  //     server.use(
  //       rest.get('*', (_, res, ctx) => {
  //         return res.once(ctx.json(breachedAccountData));
  //       }),
  //     );
  //     return expect(breachedAccount('breached')).resolves.toEqual(
  //       breachedAccountData,
  //     );
  //   });
  // });
  // describe('with truncateResults', () => {
  //   it('resolves with body from the remote API', () => {
  //     server.use(
  //       rest.get('*', (req, res, ctx) => {
  //         return res.once(
  //           req.url.searchParams.get('truncateResponse') === 'false'
  //             ? ctx.json(breachedAccountDataExpanded)
  //             : ctx.json(breachedAccountData),
  //         );
  //       }),
  //     );
  //     return expect(
  //       breachedAccount('breached', { truncate: false }),
  //     ).resolves.toEqual(breachedAccountDataExpanded);
  //   });
  // });
  // describe('with domain', () => {
  //   it('resolves with body from the remote API', () => {
  //     server.use(
  //       rest.get('*', (req, res, ctx) => {
  //         return res.once(
  //           req.url.searchParams.get('domain') === 'foo.bar'
  //             ? ctx.json(breachedAccountData)
  //             : ctx.status(404),
  //         );
  //       }),
  //     );
  //     return expect(
  //       breachedAccount('breached', { domain: 'foo.bar' }),
  //     ).resolves.toEqual(breachedAccountData);
  //   });
  // });
  // describe('with includeUnverified', () => {
  //   it('resolves with body from the remote API', () => {
  //     server.use(
  //       rest.get('*', (req, res, ctx) => {
  //         return res.once(
  //           req.url.searchParams.get('includeUnverified') === 'false'
  //             ? ctx.json(breachedAccountDataNoUnverified)
  //             : ctx.json(breachedAccountData),
  //         );
  //       }),
  //     );
  //     return expect(
  //       breachedAccount('breached', { includeUnverified: false }),
  //     ).resolves.toEqual(breachedAccountDataNoUnverified);
  //   });
  // });
  // describe('with domain and truncateResults', () => {
  //   it('resolves with body from the remote API', () => {
  //     server.use(
  //       rest.get('*', (req, res, ctx) => {
  //         return res.once(
  //           req.url.searchParams.get('domain') === 'foo.bar' &&
  //             req.url.searchParams.get('truncateResponse') === 'false'
  //             ? ctx.json(breachedAccountDataExpanded)
  //             : ctx.json(breachedAccountData),
  //         );
  //       }),
  //     );
  //     return expect(
  //       breachedAccount('breached', { domain: 'foo.bar', truncate: false }),
  //     ).resolves.toEqual(breachedAccountDataExpanded);
  //   });
  // });
  // });

  // describe('clean', () => {
  //   describe('no parameters', () => {
  //     it('resolves with null', () => {
  //       server.use(
  //         rest.get('*', (_, res, ctx) => {
  //           return res.once(ctx.status(NOT_FOUND.status));
  //         }),
  //       );

  //       return expect(breachedAccount('clean')).resolves.toBeNull();
  //     });
  //   });

  //   describe('with truncateResults', () => {
  //     it('resolves with null', () => {
  //       server.use(
  //         rest.get('*', (req, res, ctx) => {
  //           return res.once(
  //             req.url.searchParams.get('truncateResponse') === 'false'
  //               ? ctx.status(NOT_FOUND.status)
  //               : ctx.status(418),
  //           );
  //         }),
  //       );

  //       return expect(
  //         breachedAccount('clean', { truncate: false }),
  //       ).resolves.toBeNull();
  //     });
  //   });

  //   describe('with domain', () => {
  //     it('resolves with null', () => {
  //       server.use(
  //         rest.get('*', (req, res, ctx) => {
  //           return res.once(
  //             req.url.searchParams.get('domain') === 'foo.bar'
  //               ? ctx.status(NOT_FOUND.status)
  //               : ctx.status(418),
  //           );
  //         }),
  //       );

  //       return expect(
  //         breachedAccount('clean', { domain: 'foo.bar' }),
  //       ).resolves.toBeNull();
  //     });
  //   });

  //   describe('with includeUnverified', () => {
  //     it('resolves with null', () => {
  //       server.use(
  //         rest.get('*', (req, res, ctx) => {
  //           return res.once(
  //             req.url.searchParams.get('includeUnverified') === 'false'
  //               ? ctx.status(NOT_FOUND.status)
  //               : ctx.status(418),
  //           );
  //         }),
  //       );

  //       return expect(
  //         breachedAccount('clean', { includeUnverified: false }),
  //       ).resolves.toBeNull();
  //     });
  //   });

  //   describe('with domain and truncateResults', () => {
  //     it('resolves with null', () => {
  //       server.use(
  //         rest.get('*', (req, res, ctx) => {
  //           return res.once(
  //             req.url.searchParams.get('domain') === 'foo.bar' &&
  //               req.url.searchParams.get('truncateResponse') === 'false'
  //               ? ctx.status(NOT_FOUND.status)
  //               : ctx.status(418),
  //           );
  //         }),
  //       );

  //       return expect(
  //         breachedAccount('clean', { domain: 'foo.bar', truncate: false }),
  //       ).resolves.toBeNull();
  //     });
  //   });
  // });
});
