# Change Log

## 15.2.0

### Minor Changes

- [#562](https://github.com/wKovacs64/hibp/pull/562) [`ab40e4a`](https://github.com/wKovacs64/hibp/commit/ab40e4a1a63809376dde86cc5341055558344d3f) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `signal` option to all modules for user-controlled request cancellation via `AbortSignal`.

## 15.1.0

### Minor Changes

- [#543](https://github.com/wKovacs64/hibp/pull/543) [`70db0e1`](https://github.com/wKovacs64/hibp/commit/70db0e181d050b89eee34b326d6fb6247a5075bd) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `stealerLogsByEmailDomain` module.

- [#541](https://github.com/wKovacs64/hibp/pull/541) [`655b473`](https://github.com/wKovacs64/hibp/commit/655b473741b6ef358684c2c56c0bd4746ba0baf5) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `stealerLogsByEmail` module.

- [#542](https://github.com/wKovacs64/hibp/pull/542) [`682cff7`](https://github.com/wKovacs64/hibp/commit/682cff74c56322b348afab607da6786ff4c01691) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `stealerLogsByWebsiteDomain` module.

- [#539](https://github.com/wKovacs64/hibp/pull/539) [`a0c6e9a`](https://github.com/wKovacs64/hibp/commit/a0c6e9a01ad25931320e8dc79993faf11b127524) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `subscribedDomains` module.

- [#537](https://github.com/wKovacs64/hibp/pull/537) [`e15c6a7`](https://github.com/wKovacs64/hibp/commit/e15c6a7e053ded3e79ac407a33a213890d642454) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `latestBreach` module.

- [#538](https://github.com/wKovacs64/hibp/pull/538) [`f08af27`](https://github.com/wKovacs64/hibp/commit/f08af2795aac451d2d4abd9bca144214554b2575) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `breachedDomain` module.

### Patch Changes

- [#535](https://github.com/wKovacs64/hibp/pull/535) [`d47d462`](https://github.com/wKovacs64/hibp/commit/d47d46252c96990e35e785239189ca4834a80b4a) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `IncludesStealerLogs` field to `SubscriptionStatus` interface and docs.

## 15.0.1

### Patch Changes

- [#510](https://github.com/wKovacs64/hibp/pull/510) [`879fe9f`](https://github.com/wKovacs64/hibp/commit/879fe9fc3a7853eef69146841be32cdcfab0aa25) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Export the API data model types that were missing in v15.0.0.

## 15.0.0

### Major Changes

- [#509](https://github.com/wKovacs64/hibp/pull/509) [`e8d4986`](https://github.com/wKovacs64/hibp/commit/e8d498622020fe0c99847f915839ce382bf4d817) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop support for Node 18 and remove the CommonJS and UMD builds:
  - Drop support for Node.js 18 as it is [end-of-life](https://nodejs.org/en/about/releases/), making the new minimum Node.js runtime v20.19.0. Please upgrade your Node.js environment if necessary, or continue using a previous release if you are unable to upgrade your environment.
    - This also allowed us to drop the `fetch` polyfill that was only necessary in Node 18, which reduced the bundle size by approximately 33%! 📉 The library now officially has **zero dependencies**. 🎉

  - Remove the CommonJS build since [you can now `require()` ESM as of Node v20.19.0](https://github.com/nodejs/node/releases/tag/v20.19.0). **Consumers in a CommonJS environment should still be able to use the library as before** (given the appropriate Node.js version).
  - Remove the UMD build as all modern browsers support importing ESM via `<script type="module">` tags. See the "[Using in the browser](https://github.com/wKovacs64/hibp?tab=readme-ov-file#using-in-the-browser)" section of the README for more details.

### Minor Changes

- [#506](https://github.com/wKovacs64/hibp/pull/506) [`56fdf38`](https://github.com/wKovacs64/hibp/commit/56fdf3829846962231b08026d31ef195cde2fdef) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop `JSSHA` dependency in favor of a native Web Crypto API SHA-1 hashing implementation. This change reduces the size of the library by approximately 30%! 📉

## 14.1.3

### Patch Changes

- [#502](https://github.com/wKovacs64/hibp/pull/502) [`e810e6b`](https://github.com/wKovacs64/hibp/commit/e810e6be91024f5554ed22b9004031cea57171fd) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update `undici` to v6.21.1 (only matters on Node v18).

## 14.1.2

### Patch Changes

- [#479](https://github.com/wKovacs64/hibp/pull/479) [`f212d87`](https://github.com/wKovacs64/hibp/commit/f212d87a09c31063a655d4ce440e5a4b61f6dcae) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Fix error handling for 401 Unauthorized API responses. The [haveibeenpwned.com API (v3)](https://haveibeenpwned.com/API/v3#Authorisation) changed its response type from a JSON body to text.

## 14.1.1

### Patch Changes

- [#464](https://github.com/wKovacs64/hibp/pull/464) [`1dd6547`](https://github.com/wKovacs64/hibp/commit/1dd65475a93a32a0ddcd93bf1696869b266372cf) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Fix consumption from Next.js client components.

## 14.1.0

### Minor Changes

- [#462](https://github.com/wKovacs64/hibp/pull/462) [`b6076f2`](https://github.com/wKovacs64/hibp/commit/b6076f21449dac656a2f65137c67af240ae81ed2) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add the `timeoutMs` option to all modules, allowing the consumer to specify a timeout for the underlying network request (in milliseconds). Requests that take longer than the sppecified timeout period will throw/reject. There is no default timeout, as `fetch` itself has no timeout by default and providing one would be arbitrary, unexpected, and a breaking change.

- [#458](https://github.com/wKovacs64/hibp/pull/458) [`0a82b8d`](https://github.com/wKovacs64/hibp/commit/0a82b8d9ea7240735defebf48677e3a00c9634e2) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Only polyfill global `fetch` on Node.js v18, and use `undici` instead of `@remix-run/web-fetch`. This also enables use of `hibp` in web workers and extension background threads.

### Patch Changes

- [#461](https://github.com/wKovacs64/hibp/pull/461) [`aa90167`](https://github.com/wKovacs64/hibp/commit/aa90167cbaffc21bf6e99877bafc00ce7b14dc86) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Fix a bug in `pwnedPassword` and `pwnedPasswordRange` modules where the `addPadding` and `userAgent` options could not be used simultaneously.

## 14.0.3

### Patch Changes

- [#438](https://github.com/wKovacs64/hibp/pull/438) [`3da8b89`](https://github.com/wKovacs64/hibp/commit/3da8b89dd835be1a059c7e51d41dbe6e542db184) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Restore missing TypeScript declarations that were forgotten in v14.0.2 (PR #436).

## 14.0.2

### Patch Changes

- [#436](https://github.com/wKovacs64/hibp/pull/436) [`961d6e0`](https://github.com/wKovacs64/hibp/commit/961d6e000e20a4894443fa1c7f98c4224c590ff1) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Fix CommonJS exports that broke in v14.0.0.

  CommonJS consumers were getting an `ERR_REQUIRE_ESM` error as of v14.0.0 due to changing the project source to ESM in PR #420. This change resolves that by publishing the CommonJS files in `dist/cjs` with a `.cjs` file extension and the ESM files in `dist/esm` with the `.js` file extension.

## 14.0.1

### Patch Changes

- [#428](https://github.com/wKovacs64/hibp/pull/428) [`4a69884`](https://github.com/wKovacs64/hibp/commit/4a69884b3268b00bdf17808796d1d03ba9cc801a) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add descriptions to each config option for a better IDE experience.

## 14.0.0

### Major Changes

- [#410](https://github.com/wKovacs64/hibp/pull/410) [`2643a0c`](https://github.com/wKovacs64/hibp/commit/2643a0c6fbe7fba1787563087fa35ff36a9f8e1e) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop support for Node.js 16 as it is [end-of-life](https://nodejs.org/en/download/releases), making the new minimum Node.js runtime v18.0.0. Please upgrade your Node.js environment if necessary, or continue using a previous release if you are unable to upgrade your environment.

### Minor Changes

- [#425](https://github.com/wKovacs64/hibp/pull/425) [`cee2364`](https://github.com/wKovacs64/hibp/commit/cee236425a96855499b3b2d2b693ed83214efef8) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add a new `subscriptionStatus` module for retrieving the current subscription status of your HIBP API key. See https://haveibeenpwned.com/API/v3#SubscriptionStatus for more information.

- [#426](https://github.com/wKovacs64/hibp/pull/426) [`5ff6e28`](https://github.com/wKovacs64/hibp/commit/5ff6e2893b947c72addd2aec4777b8f863208c61) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Refresh the project logo.

- [#422](https://github.com/wKovacs64/hibp/pull/422) [`be78f73`](https://github.com/wKovacs64/hibp/commit/be78f73a4c62bbd7f947a3a2ea1c108811304850) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `mode` option to the `pwnedPasswordRange` module to enable support for returning NTLM suffixes.

- [#421](https://github.com/wKovacs64/hibp/pull/421) [`174ede4`](https://github.com/wKovacs64/hibp/commit/174ede4c9f8a0d5bf873502f6cfc7d4619f2b7d2) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `addPadding` option to `pwnedPassword` and `pwnedPasswordRange` modules. See https://www.troyhunt.com/enhancing-pwned-passwords-privacy-with-padding/ for more information.

### Patch Changes

- [#427](https://github.com/wKovacs64/hibp/pull/427) [`173a615`](https://github.com/wKovacs64/hibp/commit/173a6157c6e3e89d27922bea47b9c9da155a37f0) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Fix the `subscriptionStatus` implementation from PR #425 so that it supports a proxy that inserts the `HIBP-API-Key` header (via the `baseUrl` option) in the case where the consumer doesn't have direct access to the API key.

- [#424](https://github.com/wKovacs64/hibp/pull/424) [`a512452`](https://github.com/wKovacs64/hibp/commit/a51245292e04d18c16538b9ce266fa1f0619c12c) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Properly merge consumer-provided options with internal defaults.

- [#419](https://github.com/wKovacs64/hibp/pull/419) [`799669b`](https://github.com/wKovacs64/hibp/commit/799669b89e7fe58bfd781e0023c6bef92ee6e811) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Update the `Breach` model to include the `IsMalware` and `IsSubscriptionFree` fields.

## 13.0.0

### Major Changes

- [#383](https://github.com/wKovacs64/hibp/pull/383) [`b837a57`](https://github.com/wKovacs64/hibp/commit/b837a57abf29bcc00d4d3a14bbfe38d4f80ca97d) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop support for Node.js 14 as it is [end-of-life](https://nodejs.org/en/about/releases/), making the new minimum Node.js runtime v16.0.0. Please upgrade your Node.js environment if necessary, or continue using a previous release if you are unable to upgrade your environment.

- [#381](https://github.com/wKovacs64/hibp/pull/381) [`6711b59`](https://github.com/wKovacs64/hibp/commit/6711b5924d0f8bf2c8ba03462b305af1bf901b3f) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop support for browsers without native Promise implementations. In reality, this likely didn't change anything.

## 12.0.1

### Patch Changes

- [#372](https://github.com/wKovacs64/hibp/pull/372) [`d2fb74f`](https://github.com/wKovacs64/hibp/commit/d2fb74f076e5f1873adc3e99f9894f77f3a64317) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Publish types next to their CJS/ESM source files.

  For reference, see the following Twitter thread from Andrew Branch: https://mobile.twitter.com/atcb/status/1634653474041503744?t=8RVawwsEHrxnCD8BaITckg

## 12.0.0

### Major Changes

- [#368](https://github.com/wKovacs64/hibp/pull/368) [`91909c1`](https://github.com/wKovacs64/hibp/commit/91909c19ec97ad8f444512943290e5dff88a0e06) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Drop support for Node.js 12 as it is [end-of-life](https://nodejs.org/en/about/releases/), making the new minimum Node.js runtime v14.13.1. Please upgrade your Node.js environment if necessary, or continue using a previous release if you are unable to upgrade your environment.

### Patch Changes

- [#367](https://github.com/wKovacs64/hibp/pull/367) [`95d6217`](https://github.com/wKovacs64/hibp/commit/95d6217d3290fc4f132384d61cefe4624b64cdaf) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Replace the underlying `fetch` library. This shouldn't be noticeable to consumers, but replacing `isomorphic-unfetch` with our own conditional wrapper around `@remix-run/web-fetch` resolves a few compatibility issues the project has been facing.

## 11.1.1

### Patch Changes

- [#365](https://github.com/wKovacs64/hibp/pull/365) [`ec26254`](https://github.com/wKovacs64/hibp/commit/ec2625486c8500484befa4d4d203bb820a338967) Thanks [@wKovacs64](https://github.com/wKovacs64)! - Add `types` to the `exports` map in `package.json` to fix ESM consumers.
