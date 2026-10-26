---
"hibp": patch
---

Complete `SubscriptionStatus` with the [documented HIBP fields](https://haveibeenpwned.com/API/v3#SubscriptionStatus): `MaxBreachedDomains` (`number | null`), `IncludesBulkDomainAdd`, `IncludesAutoSubdomainVerification`, `IncludesCustomerDomains`, and `IncludesKAnon` (`boolean`). These fields are required, so TypeScript consumers constructing subscription status objects, including mocks and fixtures, must supply them. A `null` domain limit means unlimited domains. Runtime response handling is unchanged.
