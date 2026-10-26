---
"hibp": patch
---

Complete the exported `Breach` type with required `IsStealerLog: boolean`,
`Attribution: string | null`, and `DisclosureUrl: string | null` fields, matching
[public HIBP responses](https://haveibeenpwned.com/api/v3/breaches).

TypeScript consumers constructing `Breach` objects, including mocks and fixtures,
must supply these fields. Handle null when reading attribution or disclosure URLs.
The SDK continues returning the upstream response without transforming it.
