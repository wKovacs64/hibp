# Change Log

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
