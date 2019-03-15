# Change Log

The changelog is automatically updated using
[semantic-release](https://github.com/semantic-release/semantic-release). You
can see it on the [releases page](../../releases).

---

<details>
<summary>Historical Change Log</summary>

#### Version 7.5.1 _(2019-03-05)_

- Fixed an issue preventing the use of `hibp` in React Native development mode
  ([8e5b4de7][8e5b4de7])

#### Version 7.5.0 _(2019-01-27)_

- Added a `userAgent` option to all functions to facilitate specifying your own
  `User-Agent` header value for requests made to the haveibeenpwned.com and
  pwnedpasswords.com APIs ([#63][63])
- Added a `baseUrl` option to all functions to facilitate specifying your own
  URL for requests that would normally be made to
  `https://haveibeenpwned.com/api` and `https://api.pwnedpasswords.com` to
  facilitate proxying the requests through your own server (which may be
  necessary if you wish to use the `breachedAccount` and `search` functions
  after January, 2019 as `haveibeenpwned.com` no longer accepts
  `breachedaccount` endpoint requests originating from a browser)

  See issue [#60][60] for more details and discussion.

#### Version 7.4.0 _(2019-01-19)_

- Added an `includeUnverified` option to the `breachedAccount` function to
  include "unverified" breaches in the results ([be01ad12][be01ad12])
- Generalized the 403 Forbidden response message to simply "access denied" as
  this type of response from `haveibeenpwned.com` is no longer limited to a
  missing `User-Agent` header field ([15e02f97][15e02f97])
- Added a new error specific to 403 Forbidden responses that includes the Ray ID
  from Cloudflare so users can contact `haveibeenpwned.com` when they are being
  blocked ([cd74e40d][cd74e40d])
- Removed (and prevented future creation of) empty `remote-api` bundle in the
  ESM build
- Defined and exported the `hibp` namespace for typing the UMD build

#### Version 7.3.0 _(2019-01-05)_

- Converted to TypeScript ([#56][56])

#### Version 7.2.3 _(2018-12-20)_

- Fixed build on Windows ([48d25282][48d25282])
- Moved CI from Travis to Circle ([#52][52])
- Moved coverage reports from Coveralls to Codecov ([#53][53])

#### Version 7.2.2 _(2018-11-26)_

- Updated a **development-only** dependency (`start-server-and-test`) to remove
  a compromised transitive dependency (`flatmap-stream@0.1.1`). See
  [dominictarr/event-stream#116][dominictarr/event-stream#116] for further
  details.
- Removed redundant pre-publish build step

#### Version 7.2.1 _(2018-10-23)_

- Fixed the CommonJS build ([3f33becf][3f33becf])

#### Version 7.2.0 _(2018-10-16)_

- Added an ESM for browsers build ([#49][49])

#### Version 7.1.3 _(2018-06-26)_

- Fixed custom `User-Agent` request header implementation ([#40][40])

#### Version 7.1.2 _(2018-06-26)_

- Fixed `Forbidden` errors by adding a custom `User-Agent` request header when
  running outside the browser ([#39][39])

#### Version 7.1.1 _(2018-04-04)_

- Fixed build scripts to prevent including test-only mocks in published output

#### Version 7.1.0 _(2018-04-04)_

- Added npm `prepare` script to facilitate installing from hosted git
- Replaced [js-sha1][js-sha1] with [jsSHA][jssha]
- Fixed a misleading comment in the `hibp` export documentation
- Integrated [Renovate][renovate] for automated dependency updates
- Changed mocking strategy and refactored tests

#### Version 7.0.0 _(2018-03-13)_

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- Modified `pwnedPassword` to use the more secure hash range API
  ([@danieladams456][danieladams456] in [#23][23])
- Modified `pwnedPasswordRange` to resolve with array of objects
  ([@danieladams456][danieladams456] in [#24][24])

#### Version 6.0.0 _(2018-02-25)_

- Restored `puppeteer` to a development dependency
- Cleaned up some tests

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- Dropped support for Node < 6

#### Version 5.3.0 _(2018-02-24)_

- Added `"sideEffects": false` to support Webpack 4 tree-shaking
- Added support for searching pwned passwords by range (#21)
- Switched API endpoint for `pwnedPassword` module to new `pwnedpasswords.com`
  domain

#### Version 5.2.5 _(2017-12-07)_

- Removed `puppeteer` optional dependency as it was causing downstream consumers
  to download Chromium (particularly, when running things with `npx`). The
  `test:umd` script now requires you manually install `puppeteer` before running
  it, which will be done automatically in CI.

#### Version 5.2.4 _(2017-12-07)_

- Reverted `puppeteer` to `0.12.0` ~~as `0.13.0` was causing downstream
  consumers to download Chromium.~~

#### Version 5.2.3 _(2017-12-07)_

- Reformated some documentation files
- Updated dependencies

#### Version 5.2.2 _(2017-11-08)_

- Internal maintenance

#### Version 5.2.1 _(2017-11-07)_

- Internal maintenance

#### Version 5.2.0 _(2017-08-04)_

- Added [`pwnedPassword`][hibp-pwnedpassword] method to check a password to see
  if it has been previously exposed in a data breach (#16)

#### Version 5.1.0 _(2017-07-10)_

- Replaced webpack with rollup for UMD bundling (#15)
- Updated dependencies

#### Version 5.0.0 _(2017-07-01)_

- Targeted browsers in CommonJS/ES Module builds (#11)
- Updated dependencies

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- Removed `index.js`, the `source-map-support` entry point (#7)
- Replaced `browser` field in package.json with `unpkg` (#12)
- Removed the top-level `default` export (#14)

#### Version 4.4.0 _(2017-06-22)_

- Separated functions into individual modules (fixed tree-shaking)
- Provided safer UMD script tag instructions
- Explicitly targeted browsers in UMD build (resulting in reduced file size)
- Updated dependencies

#### Version 4.3.0 _(2017-06-08)_

- Added [`search`][hibp-search] method for querying breaches and pastes
  simultaneously (like the search form on the [website][haveibeenpwned])
- Set the AMD module name in the UMD build to `hibp` rather than anonymous
- Updated dependencies

#### Version 4.2.1 _(2017-05-27)_

- Fixed UMD build that broke in 4.2.0

#### Version 4.2.0 _(2017-05-25)_

- Fixed return type in `breachedAccount` documentation
- Added support for tree-shaking bundlers
- Optimized tests
- Updated dependencies

#### Version 4.1.1 _(2017-01-16)_

- Published `example` directory for RunKit support
- Removed `old` directory from package that slipped in by mistake

#### Version 4.1.0 _(2017-01-16)_

- Encoded user input used in API query string parameters
- Added RunKit information for live trial usage

#### Version 4.0.1 _(2017-01-04)_

- First release of 2017! :tada:
- Reduced size of UMD build by 75%
- Updated dependencies

#### Version 4.0.0 _(2016-12-10)_

- Tweaked toolchain configs
- Restructured test data
- Updated dependencies

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- Dropped support for Node < 4

#### Version 3.0.0 _(2016-10-23)_

- Added `yarn.lock` for experimental [yarn][yarn] support
- Removed expect.js dependency from the test environment
- Expanded usage documentation
- Updated dependencies

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- The browser (UMD) version has moved from the `lib` directory to the `dist`
  directory.

#### Version 2.2.0 _(2016-10-03)_

- Added fallback for unexpected HTTP responses (thanks @jellekralt)
- Added handling for new HTTP 429 (Too Many Requests) rate-limiting responses
- Improved tests
- Switched code style from SemiStandard to Airbnb
- Updated dependencies

#### Version 2.1.0 _(2016-09-04)_

- Replaced **npmcdn.com** with **unpkg.com** in the documentation as the service
  is being renamed
- Inherited support for `http_proxy` and `https_proxy` environment variables
  from Axios 0.14.0
- Simplified build scripts
- Refactored test environment
- Updated dependencies

#### Version 2.0.0 _(2016-08-07)_

##### New:

- Added browser support

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

- Changed API methods to resolve to null instead of undefined when no data was
  found
- Changed API methods to take a configuration object rather than optional,
  positional parameters

#### Version 1.0.8 _(2016-08-06)_

- Updated description and example usage
- Switched test coverage from istanbul to nyc
- Improved cross-platform compatibility for development
- Updated dependencies

#### Version 1.0.7 _(2016-07-21)_

- Minor performance increase
- Fixed API documentation for 'breaches' query
- Updated dependencies

#### Version 1.0.6 _(2016-06-28)_

- Increased visibility in npm search
- Minor improvements to development environment

#### Version 1.0.5 _(2016-04-22)_

- Removed temporary 'breach' hack as the API endpoint has been fixed
- Updated dependencies

#### Version 1.0.4 _(2016-04-12)_

- Changed temporary 'breach' hack to match author's intentions

  _The API author (Troy Hunt) indicated there is no hard format restrictions on
  a breach name, so the concept of an invalid breach name is not in play here.
  The API will respond with HTTP status 404 (not found) once the fix has been
  applied. This change mimics that behavior as opposed to responding with HTTP
  status 400 (bad request), which was my initial interpretation._

#### Version 1.0.3 _(2016-04-10)_

- Updated documentation

#### Version 1.0.2 _(2016-04-10)_

- Shield clients from broken '[breach][singlebreach]' endpoint when querying for
  an invalid breach name

  _Currently, the endpoint responds with HTTP status 200 and "page not found"
  HTML in the body if an invalid breach name is queried (e.g. 'adobe.com',
  instead of the proper breach name, 'adobe'). Based on the response codes
  described in the API documentation, I believe it should respond with HTTP
  status 400 (bad request). Prior to this patch, it lead to a confusing one-off
  scenario for clients consuming this module. This change should provide a
  consistent experience by intercepting this specific case and throwing a "bad
  request" error instead of a `SyntaxError` from trying to parse HTML. I brought
  this API behavioral discrepancy to the API author's attention and he agreed it
  was broken and noted that a fix is incoming._

- Updated tests

#### Version 1.0.1 _(2016-04-08)_

- Removed `preferGlobal` option from package.json

#### Version 1.0.0 _(2016-04-08)_

- Initial release

</details>

[hibp-pwnedpassword]: API.md#module_pwnedPassword
[hibp-search]: API.md#module_search
[haveibeenpwned]: https://haveibeenpwned.com
[singlebreach]: https://haveibeenpwned.com/API/v2#SingleBreach
[yarn]: https://yarnpkg.com
[danieladams456]: https://github.com/danieladams456
[23]: https://github.com/wKovacs64/hibp/pull/23
[24]: https://github.com/wKovacs64/hibp/pull/24
[renovate]: https://renovateapp.com/
[js-sha1]: https://github.com/emn178/js-sha1
[jssha]: https://github.com/Caligatio/jsSHA
[39]: https://github.com/wKovacs64/hibp/pull/39
[40]: https://github.com/wKovacs64/hibp/pull/40
[49]: https://github.com/wKovacs64/hibp/pull/49
[3f33becf]:
  https://github.com/wKovacs64/hibp/commit/3f33becfa23b80abc45fbeaad6c8c9f85113d126
[dominictarr/event-stream#116]:
  https://github.com/dominictarr/event-stream/issues/116
[48d25282]:
  https://github.com/wKovacs64/hibp/commit/48d25282407d2b1d3cdfac51f311d018a6a16d25
[52]: https://github.com/wKovacs64/hibp/pull/52
[53]: https://github.com/wKovacs64/hibp/pull/53
[56]: https://github.com/wKovacs64/hibp/pull/56
[be01ad12]:
  https://github.com/wKovacs64/hibp/commit/be01ad1253b7ceb3c7f844049451a4e8e9e3a858
[15e02f97]:
  https://github.com/wKovacs64/hibp/commit/15e02f970286a410a275fe3457f559050632e5bd
[cd74e40d]:
  https://github.com/wKovacs64/hibp/commit/cd74e40de95143252ab99f5c070a84e54b1365a6
[60]: https://github.com/wKovacs64/hibp/issues/60
[63]: https://github.com/wKovacs64/hibp/pull/63
[64]: https://github.com/wKovacs64/hibp/pull/64
[8e5b4de7]:
  https://github.com/wKovacs64/hibp/commit/8e5b4de79d25d834e14b8917101b4e0209d52f14
