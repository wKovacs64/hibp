# Change Log

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
