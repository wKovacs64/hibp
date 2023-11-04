import { RateLimitError } from './api/haveibeenpwned/fetch-from-api.js';
import { breach } from './breach.js';
import { breachedAccount } from './breached-account.js';
import { breaches } from './breaches.js';
import { dataClasses } from './data-classes.js';
import { pasteAccount } from './paste-account.js';
import { pwnedPassword } from './pwned-password.js';
import { pwnedPasswordRange } from './pwned-password-range.js';
import { search } from './search.js';

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
