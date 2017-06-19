import breach from './breach';
import breachedAccount from './breachedAccount';
import breaches from './breaches';
import dataClasses from './dataClasses';
import pasteAccount from './pasteAccount';
import search from './search';

/*
 * Export individual named functions in an anonymous object to allow the
 * following (and support tree-shaking):
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */

/**
 * An object/namespace containing all the hibp functions.
 */
export {
  breach,
  breachedAccount,
  breaches,
  dataClasses,
  pasteAccount,
  search,
};

/*
 * Export the hibp namespace as the default export to allow the following:
 *
 * import hibp from 'hibp'; // ESM (without tree-shaking!)
 */

/**
 * An object/namespace containing all the hibp functions.
 * @namespace hibp
 */
export default {
  breach,
  breachedAccount,
  breaches,
  dataClasses,
  pasteAccount,
  search,
};
