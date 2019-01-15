import breach from './breach';
import breachedAccount from './breachedAccount';
import breaches from './breaches';
import dataClasses from './dataClasses';
import pasteAccount from './pasteAccount';
import pwnedPassword from './pwnedPassword';
import pwnedPasswordRange from './pwnedPasswordRange';
import search from './search';

/*
 * Export individual named functions to allow the following:
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */
/**
 * A namespace containing all of the hibp functions.
 *
 * @namespace hibp
 * @example
 * import * as hibp from 'hibp';
 * // Now all hibp functions are available on the hibp object:
 * hibp.dataClasses().then(...)
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
}

// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript#jsdoc-comments-disappear
// eslint-disable-next-line typescript/no-unused-vars
const JSDOC2MARKDOWN_STUB = undefined;
