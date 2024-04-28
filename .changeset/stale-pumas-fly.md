---
'hibp': minor
---

Only polyfill global `fetch` on Node.js v18, and use `undici` instead of `@remix-run/web-fetch`. This also enables use of `hibp` in web workers and extension background threads.
