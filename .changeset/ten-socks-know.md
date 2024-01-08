---
'hibp': patch
---

Fix CommonJS exports that broke in v14.0.0.

CommonJS consumers were getting an `ERR_REQUIRE_ESM` error as of v14.0.0 due to changing the project source to ESM in PR #420. This change resolves that by publishing the CommonJS files in `dist/cjs` with a `.cjs` file extension and the ESM files in `dist/esm` with the `.js` file extension.
