## Migration Notes

#### 10.0.1 → 11.0.0

- `pwnedPasswordRange` now returns an object mapping the matching suffix to a count representing the
  number of occurrences, rather than an array of objects each containing a matching suffix and its
  count. Code dependent on parsing the response text will need updated to deal with the new data
  format:
  ```js
  {
    "003D68EB55068C33ACE09247EE4C639306B": 3,
    "012C192B2F16F82EA0EB9EF18D9D539B0DD": 1,
    ...
  }
  ```

#### 9.0.3 → 10.0.0

- The production/minified versions of the browser build targets have been renamed:

  - ESM for Browsers (`<script type="module">`)
    - `dist/browser/hibp.esm.min.js` → `dist/browser/hibp.module.js`
  - UMD
    - `dist/browser/hibp.umd.min.js` → `dist/browser/hibp.umd.js`

- The development/non-minified versions of the UMD and ESM for browsers build targets have been
  removed. If you were using them, please update your imports to use the production/minified
  versions (see above).

- The internal directory structure of the source code is now being preserved in the CJS and ESM for
  bundlers build outputs (`dist/cjs` and `dist/esm`). If you were deep importing anything you
  probably shouldn't have been (:wink:), you may need to update your imports.

- Support for Node.js version 10.x has been dropped. You must upgrade your Node.js environment to at
  least v12.16.0.

#### 8.0.1 → 9.0.0

- Output files for all build targets have been consolidated under the `dist` directory. This should
  be transparent if you followed the documentation, but the changes are as follows:

  - CommonJS
    - `lib/hibp.js` → `dist/cjs/hibp.js`
  - ECMAScript Modules
    - `es/hibp.js` → `dist/esm/hibp.js`
  - ECMAScript Modules for Browsers (development)
    - `dist/hibp.mjs` → `dist/browser/hibp.esm.js`
  - ECMAScript Modules for Browsers (production)
    - `dist/hibp.min.mjs` → `dist/browser/hibp.esm.min.js`
  - UMD (development)
    - `dist/hibp.js` → `dist/browser/hibp.umd.js`
  - UMD (production)
    - `dist/hibp.min.js` → `dist/browser/hibp.umd.min.js`
  - TypeScript Declarations
    - `types/hibp.d.ts` → `dist/hibp.d.ts`

- Support for Node.js version 8.x has been dropped. You must upgrade your Node.js environment to at
  least v10.

#### 7.5.2 → 8.0.0

- The `breachedAccount`, `pasteAccount`, and `search` modules now have an `apiKey` option, which is
  required by v3 of the `haveibeenpwned.com` API (unless you are proxying your requests through a
  server that inserts an API key on your behalf via the `baseUrl` option). You can purchase an API
  key from Troy at [https://haveibeenpwned.com/API/Key][get-key]. See [Troy's blog
  post][api-key-blog-post] for rationale and a full explanation.
- The default value of the `truncate` option in the `breachedAccount` and `search` modules has been
  changed from `false` to `true` per Troy's recommendation. If you do not specify a value of `false`
  explicitly, each `Breach` result will only contain the breach name (no metadata).
- The default value of the `includeUnverified` option in the `breachedAccount` module has been
  changed from `false` to `true` per Troy's recommendation. Although there are not many unverified
  breaches in the system, it's possible you will get more breaches back than you did previously. You
  may explicitly disable this by specifying a value of `false` for this option.
- Support for Node.js version 6.x has been dropped. You must upgrade your Node.js environment to at
  least v8.9.0.

#### 6.0.0 → 7.0.0

- `pwnedPassword` now uses the more secure hash range API rather than submitting plain text
  passwords over the wire. The [new remote API][pwnedpasswordsbyrange] no longer makes a distinction
  between passwords that are hashses vs. plain text, so `pwnedPassword` no longer takes an options
  object as the `isAHash` option has been removed.

- `pwnedPassword` now resolves with a number representing the number of times the given password was
  exposed in a breach. Code using truthy checks should continue to function as before (when it
  returned a boolean), but explicit checks will need updated.

- `pwnedPasswordRange` now returns an array of objects containing the matching suffix and a count
  representing the number of occurrences, rather than a plain text blob of all the data directly
  from the remote API response. Code dependent on parsing the response text will need updated to
  deal with the new data format:
  ```js
  [
    { suffix: "003D68EB55068C33ACE09247EE4C639306B", count: 3 },
    { suffix: "012C192B2F16F82EA0EB9EF18D9D539B0DD", count: 1 },
    ...
  ]
  ```

#### 5.3.0 → 6.0.0

- Support for Node.js versions less than 6.x has been dropped. If you are leveraging this library in
  such an environment, you should restrict the version in your dependencies to `^5.3.0`.

#### 4.4.0 → 5.0.0

- The biggest breaking change in `5.0.0` is the removal of the `default` export. `hibp` is designed
  as a collection of modules to be imported explicitly as needed and exporting a `default`-named
  object containing all the modules is arguably an anti-pattern. Instead, an anonymous object of all
  the named modules is exported, providing better dead code elimination support in order to produce
  smaller bundles when importing from `hibp`. The quickest upgrade path (providing invocation syntax
  equivalence to prior versions) is to change your import statement to import all the modules into a
  local `hibp` namespace, but the recommended upgrade path is to import exactly which modules you
  need and update your calls to remove the preceding `hibp` references.

  ```javascript
  // 4.x
  import hibp from 'hibp';
  hibp.breachedAccount(/* ... */).then(/* ... */);

  // 5.x (upgrade option 1, one-liner quick fix)
  import * as hibp from 'hibp';
  hibp.breachedAccount(/* ... */).then(/* ... */);

  // 5.x (upgrade option 2, more explicit but requires more code changes)
  import { breachedAccount } from 'hibp';
  breachedAccount(/* ... */).then(/* ... */);
  ```

- The `browser` entry point field has been removed from `package.json` as webpack was using it by
  default when omitting the `target` option or explicitly using `target: 'web'` (see issue #8 for
  details). No `<script>` tag changes should be necessary, but if you were otherwise relying on the
  `browser` field to resolve to the UMD build, you will need to update your configuration
  accordingly. Also worth noting here is the fact that the non-UMD builds have been updated to
  target browsers (see issue #9), so bundling them instead of the UMD build when targeting browsers
  should remain fully compatible while producing smaller bundles.

- The `index.js` file has been removed entirely. It's sole purpose was to provide a separate entry
  point for the CJS/ESM (non-UMD) builds to include the `source-map-support` module to enable source
  map support in Node for debugging purposes. Source maps are still generated at build time and
  included in the package, so debugging is still possible but the responsibility of enabling support
  for source maps is now on the consumer. If you were importing `index.js` explicitly rather than
  relying on the entry point fields in `package.json`, you will need to replace that with `hibp.js`.

#### 3.0.0 → 4.0.0

- Support for Node.js versions less than 4.x has been dropped. It will probably still work (at least
  for the foreseeable future), but I'm not going out of my way to make sure. If you are leveraging
  this library in such an environment, you should restrict the version in your dependencies to
  `^3.0.0`.

#### 2.2.0 → 3.0.0

- The browser (UMD) build output has moved from the `lib` directory to the `dist` directory to
  separate it from the server-side output. A development (non-minified) version is also now
  included, which was omitted in the past as it would have had the same file name in the same
  directory as the server-side output.

#### 1.0.8 → 2.0.0

- All API methods which previously resolved to `undefined` (upon receiving a `404 Not Found`
  response from the remote endpoint) now resolve to `null` instead. This may or may not be a
  breaking change, depending on how strictly you're handling the "no data found" return value. Loose
  truthy/falsey checks like `if (breachData) { ... }` will be fine, but strict equality checks like
  `if (breachData === undefined) { ... }` will break.

  **_N.B._** _This is a philosophical change based on various sources regarding the difference
  between null and undefined in JavaScript. In the case where a query responds with no data, it is
  an expected absence of value, as that is how the remote API is documented to respond when there
  are no relevant objects to return._

  [Ryan Morr](http://goo.gl/TGTS96):

  > To distinguish between the two, you may want to think of undefined as representing an unexpected
  > absence of value and null as representing an expected absence of value."

  [MDN](https://goo.gl/n85RSe):

  > In APIs, null is often retrieved in place where an object can be expected but no object is
  > relevant.

- All API methods that previously took optional, positional parameters like `domain` and
  `truncateResults` now take an options object instead. For example:

  1.0.8 (old):

  ```javascript
  hibp.breachedAccount(account, 'adobe.com', true).then(/* ... */);
  ```

  2.0.0 (new):

  ```javascript
  hibp.breachedAccount(account, { domain: 'adobe.com', truncate: true }).then(/* ... */);
  ```

  This change was made to make the API more expressive and reduce ambiguity. See the API
  documentation (or JSDoc comments) for details.

[pwnedpasswordsbyrange]: https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
[api-key-blog-post]: https://www.troyhunt.com/authentication-and-the-have-i-been-pwned-api/
[get-key]: https://haveibeenpwned.com/API/Key
