---
"hibp": patch
---

Send the default `hibp <version>` User-Agent in Node.js 21+, Bun, and Deno. These runtimes define a global `navigator`, which the SDK mistook for a browser, so requests went out with the runtime's default User-Agent (e.g. `node`). Browsers still send their own.
