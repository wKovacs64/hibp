---
"hibp": patch
---

`breaches()`, `subscribedDomains()`, and `subscriptionStatus()` reject on HTTP 404 instead of resolving `null`, which their return types exclude. haveibeenpwned.com does not send 404 for these endpoints, so this only affects responses from elsewhere, such as a proxy at a custom `baseUrl`.
