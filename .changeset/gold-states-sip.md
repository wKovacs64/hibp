---
'hibp': major
---

Drop support for Node 18 and remove the CommonJS and UMD builds:

- Drop support for Node.js 18 as it is [end-of-life](https://nodejs.org/en/about/releases/), making the new minimum Node.js runtime v20.19.0. Please upgrade your Node.js environment if necessary, or continue using a previous release if you are unable to upgrade your environment.

  - This also allowed us to drop the `fetch` polyfill that was only necessary in Node 18, which reduced the bundle size by approximately 33%! 📉 The library now officially has **zero dependencies**. 🎉

- Remove the CommonJS build since [you can now `require()` ESM as of Node v20.19.0](https://github.com/nodejs/node/releases/tag/v20.19.0). **Consumers in a CommonJS environment should still be able to use the library as before** (given the appropriate Node.js version).

- Remove the UMD build as all modern browsers support importing ESM via `<script type="module">` tags. See the "[Using in the browser](https://github.com/wKovacs64/hibp?tab=readme-ov-file#using-in-the-browser)" section of the README for more details.
