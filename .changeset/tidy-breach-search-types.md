---
"hibp": major
---

Correct `breachedAccount()` and `search().breaches` types to reflect truncation. Default and `truncate: true` searches expose only `Name`; `truncate: false` exposes full `Breach` objects. Dynamic boolean options allow either result shape. Both preserve `null`.

TypeScript consumers accessing full-only fields such as `Title` or `DataClasses` must pass `truncate: false` or narrow dynamic results. Runtime requests and responses are unchanged. Export `TruncatedBreach`, `AccountBreaches<Truncate>` and `SearchResults<Truncate>` for consumer annotations.
