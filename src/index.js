// Enable source maps support in Node (not needed in UMD build)
import 'source-map-support/register';

/*
 * Export individual named functions in an anonymous object to allow the
 * following (and support tree-shaking):
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */
export * from './hibp';

/*
 * Export the hibp namespace as the default export to allow the following:
 *
 * import hibp from 'hibp'; // ESM (without tree-shaking!)
 */
export { default } from './hibp';
