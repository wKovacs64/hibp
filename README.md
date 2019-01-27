<a href="https://wkovacs64.github.io/hibp">
  <img
    alt="logo"
    title="logo"
    src="https://wkovacs64.github.io/hibp/logo.png"
    align="right"
    width="85"
  />
</a>

# hibp

_A Promise-based API for querying [Troy Hunt][troy]'s [Have I been
pwned?][haveibeenpwned] service._

[![npm Version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]

## Installation

Locally via yarn:

```shell
yarn add hibp
```

Or, npm:

```shell
npm install --save hibp
```

Browser via CDN (see [below](#using-in-the-browser) for more information):

```html
<script src="https://unpkg.com/hibp@7.5.0"></script>
```

## Features

- Get a single breach event
- Get all breaches for an account
- Get all breach events in the system
- Get all data classes
- Get all pastes for an account
- [Securely][search-by-range] check a password to see if it has been exposed in
  a data breach
- Check a SHA-1 prefix to see if it has been exposed in a data breach
- Search for an account in both breaches and pastes at the same time
- All queries return a Promise
- Available server-side (Node.js) and client-side (browser)

## Usage

##### ECMAScript module syntax:

```javascript
// import individual modules as needed
import { dataClasses, search } from 'hibp';
// or, import all modules into a local namespace
import * as hibp from 'hibp';
```

##### CommonJS module syntax:

```javascript
// require individual modules as needed
const { dataClasses, search } = require('hibp');
// or, require all modules into a local namespace
const hibp = require('hibp');
```

The following modules are available:

- [breach](API.md#breach)
- [breachedAccount](API.md#breachedaccount)
- [breaches](API.md#breaches)
- [dataClasses](API.md#dataclasses)
- [pasteAccount](API.md#pasteaccount)
- [pwnedPassword](API.md#pwnedpassword)
- [pwnedPasswordRange](API.md#pwnedpasswordrange)
- [search](API.md#search)

Please see the [API reference](API.md) for more detailed usage information and
examples.

#### Quick-Start Example

```javascript
import { search } from 'hibp';

search('someAccountOrEmail')
  .then(data => {
    if (data.breaches || data.pastes) {
      // Bummer...
      console.log(data);
    } else {
      // Phew! We're clear.
      console.log('Good news — no pwnage found!');
    }
  })
  .catch(err => {
    // Something went wrong.
    console.log(err.message);
  });
```

#### Using in the browser

---

**Warning:** As of January, 2019, `haveibeenpwned.com` has started blocking
requests to the `breachedaccount` API endpoint when originating from within a
browser (based on the `User-Agent` field of the request headers), which affects
the `breachedAccount` and `search` functions. To use these functions in a
browser, you will likely have to proxy your request through a server of your
own. The `baseUrl` option was added to facilitate this workaround. See issue
[#60][60] for more details and discussion.

---

**Prerequisite:** This module requires a Promise implementation to exist in the
global namespace prior to being loaded. Therefore, to facilitate usage in
[browsers without native Promise support][caniuse-promise], you are responsible
for providing a polyfill. I recommend [es6-promise][es6-promise].

You have several options for using this library in a browser environment:

1. Bundled

   The most performant and recommended method is to bundle it with client-side
   code using a module bundler like [webpack][webpack]. If your build process
   honors the `module` field in `package.json`, you can import the ECMAScript
   module as described [above](#usage). Otherwise, the `main` field resolves to
   the CommonJS module version.

1. UMD

   There is also a Universal Module Definition (UMD) build provided in the
   package `dist` directory for usage in the browser. When using this build, an
   `hibp` object will be added to the browser's `window` object.

   The recommended way to include the UMD build (when using a `<script>` tag) is
   to use the [unpkg][unpkg] CDN, specifying the exact version you want. If you
   don't specify a version, the `latest` tag will be used, which could be
   dangerous if/when there are breaking changes made to the API. See
   [unpkg][unpkg] for details and advanced version specification, but generally
   you will want to do the following (replacing `x.y.z` with the version you
   want):

   ```html
   <script src="https://unpkg.com/hibp@x.y.z"></script>
   ```

   Development and production (minified) UMD builds are also provided for manual
   download if desired:

   - [https://unpkg.com/hibp/dist/hibp.js][cdn-umd-dev]
   - [https://unpkg.com/hibp/dist/hibp.min.js][cdn-umd-prod]

1. ESM for Browsers

   Modern browsers now [support][caniuse-esm] importing ECMAScript modules via
   `<script type="module">` tags. Like the UMD option above, this build is also
   available the [unpkg][unpkg] CDN (and the same versioning rules apply), but
   you must specify the full path including the `.mjs` file extension. For
   example:

   ```html
   <script type="module">
     import { dataClasses } from 'https://unpkg.com/hibp/dist/hibp.min.mjs@x.y.z';

     const logDataClasses = async () => {
       console.table(await dataClasses());
     };

     logDataClasses();
   </script>
   ```

   Development and production (minified) ESM builds are also provided for manual
   download if desired:

   - [https://unpkg.com/hibp/dist/hibp.mjs][cdn-mjs-dev]
   - [https://unpkg.com/hibp/dist/hibp.min.mjs][cdn-mjs-prod]

   For more information on ESM in the browser, check out [Using JavaScript
   modules on the web][esm-primer].

## Try It Out

[Test hibp in your browser with RunKit.][runkit]

## Projects Using hibp

- [pwned][pwned] - a command-line tool for querying the '[Have I been
  pwned?][haveibeenpwned]' service
- [hibp-stdlib][hibp-stdlib] - a microservice on [StdLib][stdlib]
- [Password Lense][pwl] - a static web application to reveal character types in
  a password

Send me a [PR][pulls] or an email and I'll add yours to the list.

## License

This module is distributed under the [MIT License][license].

[npm-image]: https://img.shields.io/npm/v/hibp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hibp
[ci-image]:
  https://img.shields.io/circleci/project/github/wKovacs64/hibp/master.svg?style=flat-square
[ci-url]: https://circleci.com/gh/wKovacs64/hibp
[coverage-image]:
  https://img.shields.io/codecov/c/github/wKovacs64/hibp/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/wKovacs64/hibp/branch/master
[troy]: https://www.troyhunt.com
[haveibeenpwned]: https://haveibeenpwned.com
[search-by-range]:
  https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
[unpkg]: https://unpkg.com
[cdn-umd-dev]: https://unpkg.com/hibp/dist/hibp.js
[cdn-umd-prod]: https://unpkg.com/hibp/dist/hibp.min.js
[caniuse-esm]: https://caniuse.com/#feat=es6-module
[cdn-mjs-dev]: https://unpkg.com/hibp/dist/hibp.mjs
[cdn-mjs-prod]: https://unpkg.com/hibp/dist/hibp.min.mjs
[esm-primer]: https://developers.google.com/web/fundamentals/primers/modules
[webpack]: https://webpack.js.org
[caniuse-promise]: https://caniuse.com/#search=promise
[es6-promise]: https://github.com/stefanpenner/es6-promise
[runkit]: https://runkit.com/npm/hibp
[pwned]: https://github.com/wKovacs64/pwned
[pulls]: https://github.com/wKovacs64/hibp/pulls
[hibp-stdlib]: https://stdlib.com/@wKovacs64/lib/hibp
[stdlib]: https://stdlib.com
[pwl]: https://pwl.netlify.com/
[license]: https://github.com/wKovacs64/hibp/tree/master/LICENSE.txt
[60]: https://github.com/wKovacs64/hibp/issues/60
