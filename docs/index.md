---
title: hibp
---

<a href="https://wkovacs64.github.io/hibp">
  <img
    alt="logo"
    title="logo"
    src="https://wkovacs64.github.io/hibp/logo.png"
    align="right"
    width="85"
  />
</a>

## Installation

Locally, via npm:

```shell
npm install hibp
```

See the [browser](#using-in-the-browser) section below for information on how to
use via `<script>` tag.

## Features (🔑 = [requires](https://www.troyhunt.com/authentication-and-the-have-i-been-pwned-api/) an [API key](https://haveibeenpwned.com/API/Key))

- Get a single breach event
- Get all breaches for an account 🔑
- Get all breach events in the system
- Get all data classes
- Get all pastes for an account 🔑
- [Securely](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange)
  check a password to see if it has been exposed in a data breach
- Check a SHA-1 prefix to see if it has been exposed in a data breach
- Search for an account in both breaches and pastes at the same time 🔑
- All queries return a Promise
- Available server-side (Node.js) and client-side (browser)
- Written in TypeScript, so all modules come fully typed

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

- [breach](https://github.com/wKovacs64/hibp/tree/master/API.md#breach)
- [breachedAccount](https://github.com/wKovacs64/hibp/tree/master/API.md#breachedaccount)
- [breaches](https://github.com/wKovacs64/hibp/tree/master/API.md#breaches)
- [dataClasses](https://github.com/wKovacs64/hibp/tree/master/API.md#dataclasses)
- [pasteAccount](https://github.com/wKovacs64/hibp/tree/master/API.md#pasteaccount)
- [pwnedPassword](https://github.com/wKovacs64/hibp/tree/master/API.md#pwnedpassword)
- [pwnedPasswordRange](https://github.com/wKovacs64/hibp/tree/master/API.md#pwnedpasswordrange)
- [search](https://github.com/wKovacs64/hibp/tree/master/API.md#search)

Please see the
[API reference](https://github.com/wKovacs64/hibp/tree/master/API.md) for more
detailed usage information and examples.

#### Quick-Start Example

```javascript
import { search } from 'hibp';

search('someAccountOrEmail', { apiKey: 'my-api-key' })
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

#### Using in the browser

**Prerequisite:** This module requires a Promise implementation to exist in the
global namespace prior to being loaded. Therefore, to facilitate usage in
[browsers without native Promise support](https://caniuse.com/#search=promise),
you are responsible for providing a polyfill. I recommend
[es6-promise](https://github.com/stefanpenner/es6-promise).

You have several options for using this library in a browser environment:

1. Bundled

   The most efficient and recommended method is to bundle it with client-side
   code using a module bundler like [webpack](https://webpack.js.org). If your
   build process honors the `module` field in `package.json`, you can import the
   ECMAScript module as described [above](#usage). Otherwise, the `main` field
   resolves to the CommonJS module version.

1. UMD

   There is also a Universal Module Definition (UMD) build provided for usage in
   the browser. When using this build, an `hibp` object will be added to the
   browser's `window` object.

   The recommended way to include the UMD build (when using a `<script>` tag) is
   to use the [unpkg](https://unpkg.com) CDN, specifying the exact version you
   want. If you don't specify a version, the `latest` tag will be used, which
   could be dangerous if/when there are breaking changes made to the API. See
   [unpkg](https://unpkg.com) for details and advanced version specification,
   but generally you will want to do the following (replacing `x.y.z` with the
   version you want):

   ```html
   <script src="https://unpkg.com/hibp@x.y.z"></script>
   ```

   Development and production (minified) UMD builds are also provided for manual
   download if desired:

   - [https://unpkg.com/hibp/dist/browser/hibp.umd.js](https://unpkg.com/hibp/dist/browser/hibp.umd.js)
   - [https://unpkg.com/hibp/dist/browser/hibp.umd.min.js](https://unpkg.com/hibp/dist/browser/hibp.umd.min.js)
     <br><br>

1. ESM for Browsers

   Modern browsers now [support](https://caniuse.com/#feat=es6-module) importing
   ECMAScript modules via `<script type="module">` tags. Like the UMD option
   above, this build is also available the [unpkg](https://unpkg.com) CDN (and
   the same versioning rules apply), but you must specify the full path
   (including the file extension). For example:

   ```html
   <script type="module">
     // Replace x.y.z with the desired hibp version      ↓ ↓ ↓
     import { dataClasses } from 'https://unpkg.com/hibp@x.y.z/dist/browser/hibp.esm.min.js';

     const logDataClasses = async () => {
       console.table(await dataClasses());
     };

     logDataClasses();
   </script>
   ```

   Development and production (minified) ESM builds are also provided for manual
   download if desired:

   - [https://unpkg.com/hibp/dist/browser/hibp.esm.js](https://unpkg.com/hibp/dist/browser/hibp.esm.js)
   - [https://unpkg.com/hibp/dist/browser/hibp.esm.min.js](https://unpkg.com/hibp/dist/browser/hibp.esm.min.js)

   For more information on ESM in the browser, check out
   [Using JS modules in the browser](https://v8.dev/features/modules#browser).

## Try It Out

[Test hibp in your browser with RunKit.](https://runkit.com/npm/hibp)

## Projects Using hibp

- [pwned](https://github.com/wKovacs64/pwned) - a command-line tool for querying
  the '[Have I been pwned?](https://haveibeenpwned.com)' service
- [Password Lense](https://pwl.netlify.com/) - a static web application to
  reveal character types in a password
- [Hasura Backend Plus](https://nhost.github.io/hasura-backend-plus/) -
  Authentication & Storage for Hasura
- [Staart API](https://staart.js.org/api/) - a Node.js backend starter for SaaS
  startups
- [BanManager-WebUI](https://github.com/BanManagement/BanManager-WebUI) - Web
  interface for BanManager

Send me a [PR](https://github.com/wKovacs64/hibp/pulls) or an email and I'll add
yours to the list!

## License

This module is distributed under the
[MIT License](https://github.com/wKovacs64/hibp/tree/master/LICENSE.txt).
