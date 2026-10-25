---
"hibp": major
---

Correct `Paste.Title` to an optional string and `Paste.Date` to `string | null`, matching the [HIBP paste model](https://haveibeenpwned.com/API/v3#PasteModel).

TypeScript consumers of `Paste`, `pasteAccount()`, and `search()` must handle absent titles and null dates before using them as strings. This can introduce compile errors with strict null checks; HTTP response handling is unchanged.
