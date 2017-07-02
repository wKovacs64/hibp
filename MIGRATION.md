## Migration Notes

#### 4.4.0 → 5.0.0

* The biggest breaking change in `5.0.0` is the removal of the `default` export.
  `hibp` is designed as a collection of modules to be imported explicitly as
  needed and exporting a `default`-named object containing all the modules is
  arguably an anti-pattern. Instead, an anonymous object of all the named
  modules is exported, providing better dead code elimination
  support in order to produce smaller bundles when importing from `hibp`. The
  quickest upgrade path (providing invocation syntax equivalence to prior
  versions) is to change your import statement to import all the modules into a
  local `hibp` namespace, but the recommended upgrade path is to import exactly
  which modules you need and update your calls to remove the preceeding `hibp`
  references.

  ```javascript
  // 4.x
  import hibp from 'hibp';
  hibp.breachedAccount(/* ... */)

  // 5.x (upgrade option 1, one-liner quick fix)
  import * as hibp from 'hibp';
  hibp.breachedAccount(/* ... */)

  // 5.x (upgrade option 2, more explicit but requires more code changes)
  import { breachedAccount } from 'hibp';
  breachedAccount(/* ... */)
  ```

* The `browser` entry point field has been removed from `package.json` as
  webpack was using it by default when omitting the `target` option or
  explicitly using `target: 'web'` (see issue #8 for details). No `<script>` tag
  changes should be necessary, but if you were otherwise relying on the
  `browser` field to resolve to the UMD build, you will need to update your
  configuration accordingly. Also worth noting here is the fact that the non-UMD
  builds have been updated to target browsers (see issue #9), so bundling them
  instead of the UMD build when targeting browsers should remain fully
  compatible while producing smaller bundles.

* The `index.js` file has been removed entirely. It's sole purpose was to
  provide a separate entry point for the CJS/ESM (non-UMD) builds to include the
  `source-map-support` module to enable source map support in Node for debugging
  purposes. Source maps are still generated at build time and included in the
  package, so debugging is still possible but the responsibility of enabling
  support for source maps is now on the consumer. If you were importing
  `index.js` explicitly rather than relying on the entry point fields in
  `package.json`, you will need to replace that with `hibp.js`.

#### 3.0.0 → 4.0.0

* Support for Node.js versions less than 4.x has been dropped. It will probably
  still work (at least for the foreseeable future), but I'm not going out of my
  way to make sure. If you are leveraging this library in such an environment,
  you should restrict the version in your dependencies to `^3.0.0`.

#### 2.2.0 → 3.0.0

* The browser (UMD) build output has moved from the `lib` directory to the
  `dist` directory to separate it from the server-side output. A development
  (non-minified) version is also now included, which was omitted in the past as
  it would have had the same file name in the same directory as the server-side
  output.

#### 1.0.8 → 2.0.0

* All API methods which previously resolved to `undefined` (upon receiving a
  `404 Not Found` response from the remote endpoint) now resolve to `null`
  instead. This may or may not be a breaking change, depending on how strictly
  you're handling the "no data found" return value. Loose truthy/falsey checks
  like `if (breachData) { ... }` will be fine, but strict equality checks like
  `if (breachData === undefined) { ... }` will break.

  ***N.B.*** *This is a philosophical change based on various sources regarding
  the difference between null and undefined in JavaScript. In the case where a
  query responds with no data, it is an expected absence of value, as that is
  how the remote API is documented to respond when there are no relevant objects
  to return.*

  [Ryan Morr](http://goo.gl/TGTS96):
  > To distinguish between the two, you may want to think of undefined as
  > representing an unexpected absence of value and null as representing an
  > expected absence of value."

  [MDN](https://goo.gl/n85RSe):
  > In APIs, null is often retrieved in place where an object can be expected
  > but no object is relevant.

* All API methods that previously took optional, positional parameters like
  `domain` and `truncateResults` now take an options object instead. For
  example:

  1.0.8 (old):
  ```javascript
  hibp.breachedAccount(account, 'adobe.com', true)
      .then(/* ... */);
  ```

  2.0.0 (new):
  ```javascript
  hibp.breachedAccount(account, {domain: 'adobe.com', truncate: true})
      .then(/* ... */);
  ```

  This change was made to make the API more expressive and reduce ambiguity. See
  the API documentation (or JSDoc comments) for details.
