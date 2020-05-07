module.exports = [
  // Pre-bundled for Browser (UMD)
  {
    path: 'dist/browser/hibp.umd.min.js',
    limit: '5.25 KB',
  },
  // Pre-bundled for Browser (ESM)
  {
    path: 'dist/browser/hibp.esm.min.js',
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
    path: 'dist/esm/breach.js',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/breachedAccount.js',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/breaches.js',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/dataClasses.js',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/pasteAccount.js',
    limit: '1.1 KB',
  },
  {
    path: 'dist/esm/pwnedPassword.js',
    limit: '4.1 KB',
  },
  {
    path: 'dist/esm/pwnedPasswordRange.js',
    limit: '1 KB',
  },
  {
    path: 'dist/esm/search.js',
    limit: '1.7 KB',
  },
];
