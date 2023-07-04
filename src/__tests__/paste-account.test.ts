import { rest } from 'msw';
import { server } from '../mocks/server';
import { EXAMPLE_PASTE } from '../../test/fixtures';
import { NOT_FOUND, UNAUTHORIZED } from '../api/haveibeenpwned/responses';
import type { ErrorData } from '../api/haveibeenpwned/types';
import { pasteAccount } from '../paste-account';

describe('pasteAccount', () => {
  const PASTE_ACCOUNT_DATA = [EXAMPLE_PASTE];

  it('honors the apiKey option', async () => {
    const apiKey = 'my-api-key';

    server.use(
      rest.get('*', (req, res, ctx) => {
        if (!req.headers.get('hibp-api-key')) {
          return res(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body as ErrorData),
          );
        }

        return res(ctx.json(PASTE_ACCOUNT_DATA));
      }),
    );

    await expect(pasteAccount('whatever@example.com')).rejects.toThrow(
      (UNAUTHORIZED.body as ErrorData).message,
    );
    await expect(
      pasteAccount('whatever@example.com', { apiKey }),
    ).resolves.toEqual(PASTE_ACCOUNT_DATA);
  });

  describe('pasted email', () => {
    it('resolves with data from the remote API', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res(ctx.json(PASTE_ACCOUNT_DATA));
        }),
      );

      return expect(pasteAccount('pasted@email.com')).resolves.toEqual(
        PASTE_ACCOUNT_DATA,
      );
    });
  });

  describe('clean email', () => {
    it('resolves with null', () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res(ctx.status(NOT_FOUND.status));
        }),
      );

      return expect(pasteAccount('clean@whistle.com')).resolves.toBeNull();
    });
  });
});
