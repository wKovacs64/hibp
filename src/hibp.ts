import { RateLimitError } from './api/haveibeenpwned/fetchFromApi';
import { breach } from './breach';
import { breachedAccount } from './breachedAccount';
import { breaches } from './breaches';
import { dataClasses } from './dataClasses';
import { pasteAccount } from './pasteAccount';
import { pwnedPassword } from './pwnedPassword';
import { pwnedPasswordRange } from './pwnedPasswordRange';
import { search } from './search';

/*
 * Export individual named functions to allow the following:
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */

export {
  breach,
  breachedAccount,
  breaches,
  dataClasses,
  pasteAccount,
  pwnedPassword,
  pwnedPasswordRange,
  search,
  RateLimitError,
};

// Export the overall interface, primarily for typing the `hibp` object placed
// on `window` in the UMD build
export interface HIBP {
  breach: typeof breach;
  breachedAccount: typeof breachedAccount;
  breaches: typeof breaches;
  dataClasses: typeof dataClasses;
  pasteAccount: typeof pasteAccount;
  pwnedPassword: typeof pwnedPassword;
  pwnedPasswordRange: typeof pwnedPasswordRange;
  search: typeof search;
  RateLimitError: typeof RateLimitError;
}

// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript#jsdoc-comments-disappear
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSDOC2MARKDOWN_STUB = undefined;
