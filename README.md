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

_An unofficial TypeScript SDK for [Troy Hunt][troy]'s [Have I been pwned?][haveibeenpwned] service._

[![npm Version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]
[![All Contributors](https://img.shields.io/github/all-contributors/wKovacs64/hibp?style=flat-square)](#contributors-)

## Installation

In Node.js:

```shell
npm install hibp
```

In [Deno][deno]:

```ts
// Replace x.y.z with the desired hibp version
import * as hibp from 'npm:hibp@x.y.z';
```

See the [browser](#using-in-the-browser) section below for information on how to use it in the
browser.

## Features (🔑 = [requires][api-key-blog-post] an [API key][get-api-key])

- Get a single breach event
- Get all breaches for an account 🔑
- Get all breach events in the system
- Get all data classes
- Get all pastes for an account 🔑
- [Securely][search-by-range] check a password to see if it has been exposed in a data breach
- Check a SHA-1 or NTLM prefix to see if it has been exposed in a data breach
- Search for an account in both breaches and pastes at the same time 🔑
- Get your subscription status 🔑
- All queries return a Promise
- Available server-side (e.g., Node.js) and client-side (browser)
- Written in TypeScript, so all modules come fully typed

## Usage

```typescript
// import individual modules as needed
import { dataClasses, search } from 'hibp';

// or, import all modules into a local namespace
import * as hibp from 'hibp';
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
- [subscriptionStatus](API.md#subscriptionstatus)

Please see the [API reference](API.md) for more detailed usage information and examples.

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

void main();
```

#### Rate Limiting

The haveibeenpwned.com API [rate limits][haveibeenpwned-rate-limiting] requests to prevent abuse. In
the event you get rate limited, the module will throw a custom `RateLimitError` which will include a
`retryAfterSeconds` property so you know when you can try the call again (as a `number`, unless the
remote API did not provide one, in which case it will be `undefined` - but that _should_ never
happen).

#### Using in the browser

You have a couple of options for using this library in a browser environment:

1. Bundled

   The most efficient and recommended method is to bundle it with client-side code using a module
   bundler, most likely dictated by your web application framework of choice.

1. ESM for Browsers

   Alternatively, you can also import the library directly in your HTML via `<script type="module">`
   tags in [modern browsers][caniuse-esm]. The pre-bundled module is available through the
   [unpkg][unpkg] CDN, but you must specify the full path (including the file extension). It's also
   strongly recommended to include the exact version number as well, otherwise the `latest` tag will
   be used, which could be dangerous if/when there are breaking changes made to the API. See
   [unpkg][unpkg] for details and advanced version specification, but you will probably want to do
   the following (replacing `x.y.z` with the version you want):

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

   For more information on ESM in the browser, check out [Using JS modules in the
   browser][js-modules].

## Try It Out

[Test hibp in your browser with StackBlitz.][stackblitz]

## Projects Using hibp

- [pwned][pwned] - a command-line tool for querying the '[Have I been pwned?][haveibeenpwned]'
  service
- [Password Lense][pwl] - a static web application to reveal character types in a password
- [Plasmic](https://www.plasmic.app/) - the open-source visual builder for your tech stack
- [Medplum](https://www.medplum.com/) - fast and easy healthcare dev
- [Hasura Backend Plus](https://nhost.github.io/hasura-backend-plus/) - Authentication & Storage for
  Hasura
- [Staart API](https://staart.js.org/api/) - a Node.js backend starter for SaaS startups
- [BanManager-WebUI](https://github.com/BanManagement/BanManager-WebUI) - Web interface for
  BanManager

Send me a [PR][pulls] or an email and I'll add yours to the list!

## License

This module is distributed under the [MIT License][license].

[npm-image]: https://img.shields.io/npm/v/hibp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hibp
[ci-image]:
  https://img.shields.io/github/actions/workflow/status/wKovacs64/hibp/ci.yml?logo=github&style=flat-square
[ci-url]: https://github.com/wKovacs64/hibp/actions?query=workflow%3Aci
[coverage-image]: https://img.shields.io/codecov/c/github/wKovacs64/hibp/main.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/wKovacs64/hibp/branch/main
[deno]: https://deno.land/
[troy]: https://www.troyhunt.com
[haveibeenpwned]: https://haveibeenpwned.com
[haveibeenpwned-rate-limiting]: https://haveibeenpwned.com/API/v3#RateLimiting
[search-by-range]: https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
[api-key-blog-post]: https://www.troyhunt.com/authentication-and-the-have-i-been-pwned-api/
[get-api-key]: https://haveibeenpwned.com/API/Key
[unpkg]: https://unpkg.com
[caniuse-esm]: https://caniuse.com/#feat=es6-module
[js-modules]: https://v8.dev/features/modules#browser
[stackblitz]: https://stackblitz.com/edit/stackblitz-starters-atyrc52c?file=index.js
[pwned]: https://github.com/wKovacs64/pwned
[pulls]: https://github.com/wKovacs64/hibp/pulls
[pwl]: https://pwl.netlify.com/
[license]: https://github.com/wKovacs64/hibp/tree/main/LICENSE.txt

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
