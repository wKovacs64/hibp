---
"hibp": patch
---

Accept `undefined` for every optional option property, so consumers using `exactOptionalPropertyTypes` can pass possibly-unset values, such as `{ domain }` where `domain` is `string | undefined`, without conditional spreads. hibp treats `undefined` the same as an omitted option.
