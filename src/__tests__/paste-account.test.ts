import { http } from 'msw';
import { server } from '../mocks/server.js';
import { EXAMPLE_PASTE } from '../../test/fixtures.js';
import { NOT_FOUND, UNAUTHORIZED } from '../api/haveibeenpwned/responses.js';
import type { ErrorData } from '../api/haveibeenpwned/types.js';
import { pasteAccount } from '../paste-account.js';

describe('pasteAccount', () => {
  const PASTE_ACCOUNT_DATA = [EXAMPLE_PASTE];

  it('honors the apiKey option', async () => {
    const apiKey = 'my-api-key';

    server.use(
      http.get('*', ({ request }) => {
        if (!request.headers.has('hibp-api-key')) {
          return new Response(JSON.stringify(UNAUTHORIZED.body), {
            status: UNAUTHORIZED.status,
          });
        }

        return new Response(JSON.stringify(PASTE_ACCOUNT_DATA));
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
        http.get('*', () => {
          return new Response(JSON.stringify(PASTE_ACCOUNT_DATA));
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
        http.get('*', () => {
          return new Response(null, { status: NOT_FOUND.status });
        }),
      );

      return expect(pasteAccount('clean@whistle.com')).resolves.toBeNull();
    });
  });
});
