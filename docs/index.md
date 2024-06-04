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

In Node.js:

```shell
npm install hibp
```

In [Deno](https://deno.land/):

```ts
// Replace x.y.z with the desired hibp version
import * as hibp from 'npm:hibp@x.y.z';
```

See the [browser](#using-in-the-browser) section below for information on how to use it in the
browser.

## Features (🔑 = [requires](https://www.troyhunt.com/authentication-and-the-have-i-been-pwned-api/) an [API key](https://haveibeenpwned.com/API/Key))

- Get a single breach event
- Get all breaches for an account 🔑
- Get all breach events in the system
- Get all data classes
- Get all pastes for an account 🔑
- [Securely](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) check a password to
  see if it has been exposed in a data breach
- Check a SHA-1 or NTLM prefix to see if it has been exposed in a data breach
- Search for an account in both breaches and pastes at the same time 🔑
- Get your subscription status 🔑
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

- [breach](https://github.com/wKovacs64/hibp/tree/main/API.md#breach)
- [breachedAccount](https://github.com/wKovacs64/hibp/tree/main/API.md#breachedaccount)
- [breaches](https://github.com/wKovacs64/hibp/tree/main/API.md#breaches)
- [dataClasses](https://github.com/wKovacs64/hibp/tree/main/API.md#dataclasses)
- [pasteAccount](https://github.com/wKovacs64/hibp/tree/main/API.md#pasteaccount)
- [pwnedPassword](https://github.com/wKovacs64/hibp/tree/main/API.md#pwnedpassword)
- [pwnedPasswordRange](https://github.com/wKovacs64/hibp/tree/main/API.md#pwnedpasswordrange)
- [search](https://github.com/wKovacs64/hibp/tree/main/API.md#search)
- [subscriptionStatus](https://github.com/wKovacs64/hibp/tree/main/API.md#subscriptionstatus)

Please see the [API reference](https://github.com/wKovacs64/hibp/tree/main/API.md) for more detailed
usage information and examples.

#### Quick-Start Example

```javascript
import { search } from 'hibp';

async function main() {
  try {
    const data = await search('someAccountOrEmail', { apiKey: 'my-api-key' });
    if (data.breaches || data.pastes) {
      // Bummer...
      console.log(data);
    } else {
      // Phew! We're clear.
      console.log('Good news — no pwnage found!');
    }
  } catch (err) {
    // Something went wrong.
    console.log(err.message);
  }
}

main();
```

#### Rate Limiting

The haveibeenpwned.com API [rate limits](https://haveibeenpwned.com/API/v3#RateLimiting) requests to
prevent abuse. In the event you get rate limited, the module will throw a custom `RateLimitError`
which will include a `retryAfterSeconds` property so you know when you can try the call again (as a
`number`, unless the remote API did not provide one, in which case it will be `undefined` - but that
_should_ never happen).

#### Using in the browser

You have several options for using this library in a browser environment:

1. Bundled

   The most efficient and recommended method is to bundle it with client-side code using a module
   bundler like [webpack](https://webpack.js.org) or, more likely, whatever your framework of choice
   uses under the hood.

1. UMD

   There is also a Universal Module Definition (UMD) build provided for usage in the browser. When
   using this build, an `hibp` object will be added to the browser's `window` object.

   The recommended way to include the UMD build (when using a `<script>` tag) is to use the
   [unpkg](https://unpkg.com) CDN, specifying the exact version you want. If you don't specify a
   version, the `latest` tag will be used, which could be dangerous if/when there are breaking
   changes made to the API. See [unpkg](https://unpkg.com) for details and advanced version
   specification, but generally you will want to do the following (replacing `x.y.z` with the
   version you want):

   ```html
   <script src="https://unpkg.com/hibp@x.y.z"></script>
   ```

1. ESM for Browsers

   Modern browsers now [support](https://caniuse.com/#feat=es6-module) importing ECMAScript modules
   via `<script type="module">` tags. Like the UMD option above, this build is also available the
   [unpkg](https://unpkg.com) CDN (and the same versioning rules apply), but you must specify the
   full path (including the file extension). For example:

   ```html
   <script type="module">
     // Replace x.y.z with the desired hibp version      ↓ ↓ ↓
     import { dataClasses } from 'https://unpkg.com/hibp@x.y.z/dist/browser/hibp.module.js';

     const logDataClasses = async () => {
       console.table(await dataClasses());
     };

     logDataClasses();
   </script>
   ```

   For more information on ESM in the browser, check out
   [Using JS modules in the browser](https://v8.dev/features/modules#browser).

## Try It Out

[Test hibp in your browser with RunKit.](https://runkit.com/npm/hibp)

## Projects Using hibp

- [pwned](https://github.com/wKovacs64/pwned) - a command-line tool for querying the
  '[Have I been pwned?](https://haveibeenpwned.com)' service
- [Password Lense](https://pwl.netlify.com/) - a static web application to reveal character types in
  a password
- [Plasmic](https://www.plasmic.app/) - the open-source visual builder for your tech stack
- [Medplum](https://www.medplum.com/) - fast and easy healthcare dev
- [Hasura Backend Plus](https://nhost.github.io/hasura-backend-plus/) - Authentication & Storage for
  Hasura
- [Staart API](https://staart.js.org/api/) - a Node.js backend starter for SaaS startups
- [BanManager-WebUI](https://github.com/BanManagement/BanManager-WebUI) - Web interface for
  BanManager

Send me a [PR](https://github.com/wKovacs64/hibp/pulls) or an email and I'll add yours to the list!

## License

This module is distributed under the
[MIT License](https://github.com/wKovacs64/hibp/tree/main/LICENSE.txt).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wKovacs64"><img src="https://avatars.githubusercontent.com/u/1288694?v=4?s=100" width="100px;" alt="Justin Hall"/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/commits?author=wKovacs64" title="Code">💻</a> <a href="https://github.com/wKovacs64/hibp/commits?author=wKovacs64" title="Documentation">📖</a> <a href="#infra-wKovacs64" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-wKovacs64" title="Maintenance">🚧</a> <a href="https://github.com/wKovacs64/hibp/pulls?q=is%3Apr+reviewed-by%3AwKovacs64" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/wKovacs64/hibp/commits?author=wKovacs64" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.troyhunt.com"><img src="https://avatars.githubusercontent.com/u/273244?v=4?s=100" width="100px;" alt="Troy Hunt"/><br /><sub><b>Troy Hunt</b></sub></a><br /><a href="#data-troyhunt" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jellekralt.com"><img src="https://avatars.githubusercontent.com/u/214558?v=4?s=100" width="100px;" alt="Jelle Kralt"/><br /><sub><b>Jelle Kralt</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/commits?author=jellekralt" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/timaschew"><img src="https://avatars.githubusercontent.com/u/110870?v=4?s=100" width="100px;" alt="Anton W"/><br /><sub><b>Anton W</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/issues?q=author%3Atimaschew" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/danieladams456"><img src="https://avatars.githubusercontent.com/u/3953840?v=4?s=100" width="100px;" alt="Daniel Adams"/><br /><sub><b>Daniel Adams</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/commits?author=danieladams456" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/d0gb3r7"><img src="https://avatars.githubusercontent.com/u/454308?v=4?s=100" width="100px;" alt="Markus Dolic"/><br /><sub><b>Markus Dolic</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/issues?q=author%3Ayelworc" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/textbook/about"><img src="https://avatars.githubusercontent.com/u/785939?v=4?s=100" width="100px;" alt="Jonathan Sharpe"/><br /><sub><b>Jonathan Sharpe</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/commits?author=textbook" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ArcadeRenegade"><img src="https://avatars.githubusercontent.com/u/13874898?v=4?s=100" width="100px;" alt="Ryan"/><br /><sub><b>Ryan</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/issues?q=author%3AArcadeRenegade" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PodStuart"><img src="https://avatars.githubusercontent.com/u/107403965?v=4?s=100" width="100px;" alt="Stuart McGregor"/><br /><sub><b>Stuart McGregor</b></sub></a><br /><a href="https://github.com/wKovacs64/hibp/issues?q=author%3APodStuart" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
