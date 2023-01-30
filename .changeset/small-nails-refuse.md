---
'hibp': patch
---

Replace the underlying `fetch` library. This shouldn't be noticeable to consumers, but replacing `isomorphic-unfetch` with our own conditional wrapper around `@remix-run/web-fetch` resolves a few compatibility issues the project has been facing.
