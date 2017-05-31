# hibp

*A Promise-based API for querying [Troy Hunt][troy]'s
[Have I been pwned?][haveibeenpwned] service.*

[![npm Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Code Coverage][coveralls-image]][coveralls-url]

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
<script src="https://unpkg.com/hibp"></script>
```

## Features

* Get all breaches for an account
* Get all breached sites in the system
* Get a single breached site
* Get all data classes
* Get all pastes for an account
* Search for an account in both breaches and pastes at the same time
* All queries return a Promise
* Available server-side (Node.js) and client-side (browser)

## Usage

```javascript
// import using ECMAScript module syntax
import hibp from 'hibp';

// or require using CommonJS module syntax
var hibp = require('hibp');
```

Now the following functions are available in the `hibp` object:

* [.breachedAccount(account, [options])](API.md#hibp.breachedAccount)
* [.breaches([options])](API.md#hibp.breaches)
* [.breach(breachName)](API.md#hibp.breach)
* [.dataClasses()](API.md#hibp.dataClasses)
* [.pasteAccount(email)](API.md#hibp.pasteAccount)
* [.search(account, [breachOptions])](API.md#hibp.search)

##### Example:

```javascript
import hibp from 'hibp';

hibp
  .search('someAccountOrEmail')
  .then((data) => {
    if (data.breaches || data.pastes) {
      // Bummer...
      console.log(data);
    } else {
      // Phew! We're clear.
      console.log('Good news — no pwnage found!');
    }
  })
  .catch((err) => {
    // Something went wrong.
    console.log(err.message);
  });
```

Please see the [API reference](API.md) for more detailed usage information and
additional examples.

#### Using in the browser

There is a Universal Module Definition (UMD) build provided in the package
`dist` directory for usage in the browser. When using this build, an `hibp`
object will be added to the browser's `window` object. Development and
production (minified) UMD builds are both provided for download:

* [https://unpkg.com/hibp/dist/hibp.js][cdn-dev]
* [https://unpkg.com/hibp/dist/hibp.min.js][cdn-prod]

You can include one of these builds directly via CDN (this example will
reference the `latest` tag version of the production build by default, but you
can specify a particular version if desired - see [unpkg][unpkg] for details):

```html
<script src="https://unpkg.com/hibp"></script>
```

Alternatively, you may bundle it in with client-side code with a module bundler
like [webpack][webpack]. If your build process honors the
`browser` field in `package.json`, you can import or require it normally:

```javascript
import hibp from 'hibp';
```

If your build process does **not** respect the `browser` field of
`package.json`, you may explicitly include or require the UMD version like so:

```javascript
import hibp from 'hibp/dist/hibp.min.js';
```

**N.B.** This module requires a Promise implementation to exist in the global
namespace prior to being loaded. Therefore, to facilitate usage on
[browsers without native Promise support][caniuse-promise], you are responsible
for providing a polyfill. I recommend [es6-promise][es6-promise].

## Try It Out

[Test hibp in your browser with RunKit.][runkit]

## Projects Using hibp

* [pwned][pwned] - a command-line tool for querying the
  '[Have I been pwned?][haveibeenpwned]' service
* [hibp-stdlib][hibp-stdlib] - a microservice on [stdlib][stdlib]

Send me a [PR][pulls] or an email and I'll add yours to the list.

## License

This module is distributed under the [MIT License][license].

[npm-image]: https://img.shields.io/npm/v/hibp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hibp
[travis-image]: https://img.shields.io/travis/wKovacs64/hibp.svg?style=flat-square
[travis-url]: https://travis-ci.org/wKovacs64/hibp
[coveralls-image]: https://img.shields.io/coveralls/wKovacs64/hibp.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/wKovacs64/hibp
[troy]: http://www.troyhunt.com
[haveibeenpwned]: https://haveibeenpwned.com
[es6-promise]: https://github.com/stefanpenner/es6-promise
[unpkg]: https://unpkg.com
[webpack]: https://webpack.github.io
[cdn-dev]: https://unpkg.com/hibp/dist/hibp.js
[cdn-prod]: https://unpkg.com/hibp/dist/hibp.min.js
[caniuse-promise]: http://caniuse.com/#search=promise
[runkit]: https://runkit.com/npm/hibp
[pwned]: https://github.com/wKovacs64/pwned
[pulls]: https://github.com/wKovacs64/hibp/pulls
[hibp-stdlib]: https://stdlib.com/services/wKovacs64/hibp
[stdlib]: https://stdlib.com
[license]: https://github.com/wKovacs64/hibp/tree/master/LICENSE.txt
