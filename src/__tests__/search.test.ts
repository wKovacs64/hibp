import { rest } from 'msw';
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
      rest.get(/breachedaccount/, (_, res, ctx) => {
        return res.once(ctx.json(BREACHES));
      }),
    );

    return expect(search('breached')).resolves.toEqual({
      breaches: BREACHES,
      pastes: null,
    });
  });

  it('searches breaches and pastes by email address', () => {
    server.use(
      rest.get(/breachedaccount/, (_, res, ctx) => {
        return res.once(ctx.json(BREACHES));
      }),
      rest.get(/pasteaccount/, (_, res, ctx) => {
        return res.once(ctx.json(PASTES));
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
      rest.get(/breachedaccount/, (req, res, ctx) => {
        if (!req.headers.get('hibp-api-key')) {
          return res(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body as ErrorData),
          );
        }

        return res(ctx.json(BREACHES));
      }),
      rest.get(/pasteaccount/, (req, res, ctx) => {
        if (!req.headers.get('hibp-api-key')) {
          return res(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body as ErrorData),
          );
        }

        return res(ctx.json(PASTES));
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
      rest.get(/breachedaccount/, (req, res, ctx) => {
        return res(
          req.url.searchParams.get('truncateResponse') === 'false'
            ? ctx.json(BREACHES_EXPANDED)
            : ctx.json(BREACHES),
        );
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
