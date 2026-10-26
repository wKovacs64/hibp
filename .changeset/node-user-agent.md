---
"hibp": patch
---

Send the default `hibp <version>` User-Agent in every non-browser runtime. The SDK skipped it whenever a global `navigator` existed, which Node.js 21+, Bun, Deno, and Cloudflare Workers all define. Those requests went out with the runtime's User-Agent (e.g. `node`), or none at all on Cloudflare Workers. Browser pages and workers still send their own User-Agent, because setting one triggers a CORS preflight that haveibeenpwned.com rejects.
