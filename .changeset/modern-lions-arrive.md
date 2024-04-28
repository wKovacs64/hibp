---
'hibp': minor
---

Add the `timeoutMs` option to all modules, allowing the consumer to specify a timeout for the underlying network request (in milliseconds). Requests that take longer than the sppecified timeout period will throw/reject. There is no default timeout, as `fetch` itself has no timeout by default and providing one would be arbitrary, unexpected, and a breaking change.
