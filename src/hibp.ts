import { RateLimitError } from './api/haveibeenpwned/fetch-from-api.js';
import { breach } from './breach.js';
import { breachedAccount } from './breached-account.js';
import { breaches } from './breaches.js';
import { dataClasses } from './data-classes.js';
import { latestBreach } from './latest-breach.js';
import { pasteAccount } from './paste-account.js';
import { pwnedPassword } from './pwned-password.js';
import { pwnedPasswordRange } from './pwned-password-range.js';
import { search } from './search.js';
import { subscriptionStatus } from './subscription-status.js';

export type * from './api/haveibeenpwned/types.js';

/*
 * Export individual named functions to allow the following:
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */

export {
  RateLimitError,
  breach,
  breachedAccount,
  breaches,
  dataClasses,
  latestBreach,
  pasteAccount,
  pwnedPassword,
  pwnedPasswordRange,
  search,
  subscriptionStatus,
};

// Export the overall interface
export interface HIBP {
  RateLimitError: typeof RateLimitError;
  breach: typeof breach;
  breachedAccount: typeof breachedAccount;
  breaches: typeof breaches;
  dataClasses: typeof dataClasses;
  latestBreach: typeof latestBreach;
  pasteAccount: typeof pasteAccount;
  pwnedPassword: typeof pwnedPassword;
  pwnedPasswordRange: typeof pwnedPasswordRange;
  search: typeof search;
  subscriptionStatus: typeof subscriptionStatus;
}

// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript#jsdoc-comments-disappear
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSDOC2MARKDOWN_STUB = undefined;
