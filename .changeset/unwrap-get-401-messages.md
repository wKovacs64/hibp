---
"hibp": patch
---

GET operations reject a 401 with the JSON body's `message` as `error.message` (e.g. `Access denied due to missing hibp-api-key.`) instead of the raw JSON body, matching domain verification POST operations. Plain-text 401 bodies are still used as-is, and an empty 401 body rejects with the HTTP status (e.g. `401 Unauthorized`). A 429 without a JSON body now rejects with `RateLimitError` carrying the HTTP status as its message, instead of `SyntaxError`.
