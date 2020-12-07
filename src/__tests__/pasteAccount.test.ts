import { server, rest } from '../mocks/server';
import { EXAMPLE_PASTE } from '../../test/fixtures';
import { NOT_FOUND, UNAUTHORIZED } from '../api/haveibeenpwned/responses';
import { pasteAccount } from '../pasteAccount';
import { ErrorData } from '../api/haveibeenpwned/types';

describe('pasteAccount', () => {
  const PASTE_ACCOUNT_DATA = [EXAMPLE_PASTE];

  it('honors the apiKey option', () => {
    const apiKey = 'my-api-key';

    server.use(
      rest.get('*', (req, res, ctx) => {
        if (!req.headers.get('hibp-api-key')) {
          return res(
            ctx.status(UNAUTHORIZED.status),
            ctx.json(UNAUTHORIZED.body),
          );
        }

        return res(ctx.json(PASTE_ACCOUNT_DATA));
      }),
    );

    return pasteAccount('whatever@example.com')
      .catch((err) => {
        expect(err.message).toBe((UNAUTHORIZED.body as ErrorData).message);
      })
      .then(() => pasteAccount('whatever@example.com', { apiKey }))
      .then((apiData) => {
        expect(apiData).toEqual(PASTE_ACCOUNT_DATA);
      });
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
