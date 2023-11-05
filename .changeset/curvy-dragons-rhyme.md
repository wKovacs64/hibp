---
'hibp': patch
---

Fix the `subscriptionStatus` implementation from PR #425 so that it supports a proxy that inserts the `HIBP-API-Key` header (via the `baseUrl` option) in the case where the consumer doesn't have direct access to the API key.
