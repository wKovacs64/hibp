module.exports = [
  // Pre-bundled for Browser (UMD)
  {
    path: 'dist/browser/hibp.umd.js',
    limit: '5.25 KB',
  },
  // Pre-bundled for Browser (ESM)
  {
    path: 'dist/browser/hibp.module.js',
    limit: '4.75 KB',
  },
  // Bundled with Webpack (CJS)
  {
    path: 'dist/cjs/breach.js',
    limit: '1.3 KB',
  },
  {
    path: 'dist/cjs/breachedAccount.js',
    limit: '1.4 KB',
  },
  {
    path: 'dist/cjs/breaches.js',
    limit: '1.4 KB',
  },
  {
    path: 'dist/cjs/dataClasses.js',
    limit: '1.3 KB',
  },
  {
    path: 'dist/cjs/pasteAccount.js',
    limit: '1.3 KB',
  },
  {
    path: 'dist/cjs/pwnedPassword.js',
    limit: '4.1 KB',
  },
  {
    path: 'dist/cjs/pwnedPasswordRange.js',
    limit: '1 KB',
  },
  {
    path: 'dist/cjs/search.js',
    limit: '2 KB',
  },
  // Bundled with Webpack (ESM)
  {
    path: 'dist/esm/breach.mjs',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/breachedAccount.mjs',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/breaches.mjs',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/dataClasses.mjs',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/pasteAccount.mjs',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/pwnedPassword.mjs',
    limit: '4.1 KB',
  },
  {
    path: 'dist/esm/pwnedPasswordRange.mjs',
    limit: '1 KB',
  },
  {
    path: 'dist/esm/search.mjs',
    limit: '1.7 KB',
  },
];
