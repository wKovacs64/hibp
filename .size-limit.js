module.exports = [
  // Pre-bundled for Browser (UMD)
  {
    name: 'dist/browser/hibp.umd.min.js',
    path: 'dist/browser/hibp.umd.min.js',
    limit: '5.25 KB',
  },
  // Pre-bundled for Browser (ESM)
  {
    name: 'dist/browser/hibp.esm.min.js',
    path: 'dist/browser/hibp.esm.min.js',
    limit: '4.75 KB',
  },
  // Bundled with Webpack (CJS)
  {
    name: 'dist/cjs/breach.js',
    path: 'dist/cjs/breach.js',
    limit: '1.3 KB',
  },
  {
    name: 'dist/cjs/breachedAccount.js',
    path: 'dist/cjs/breachedAccount.js',
    limit: '1.4 KB',
  },
  {
    name: 'dist/cjs/breaches.js',
    path: 'dist/cjs/breaches.js',
    limit: '1.4 KB',
  },
  {
    name: 'dist/cjs/dataClasses.js',
    path: 'dist/cjs/dataClasses.js',
    limit: '1.3 KB',
  },
  {
    name: 'dist/cjs/pasteAccount.js',
    path: 'dist/cjs/pasteAccount.js',
    limit: '1.3 KB',
  },
  {
    name: 'dist/cjs/pwnedPassword.js',
    path: 'dist/cjs/pwnedPassword.js',
    limit: '4.1 KB',
  },
  {
    name: 'dist/cjs/pwnedPasswordRange.js',
    path: 'dist/cjs/pwnedPasswordRange.js',
    limit: '1 KB',
  },
  {
    name: 'dist/cjs/search.js',
    path: 'dist/cjs/search.js',
    limit: '2 KB',
  },
  // Bundled with Webpack (ESM)
  {
    name: 'dist/esm/breach.js',
    path: 'dist/esm/breach.js',
    limit: '1.1 KB',
  },
  {
    name: 'dist/esm/breachedAccount.js',
    path: 'dist/esm/breachedAccount.js',
    limit: '1.1 KB',
  },
  {
    name: 'dist/esm/breaches.js',
    path: 'dist/esm/breaches.js',
    limit: '1.1 KB',
  },
  {
    name: 'dist/esm/dataClasses.js',
    path: 'dist/esm/dataClasses.js',
    limit: '1.1 KB',
  },
  {
    name: 'dist/esm/pasteAccount.js',
    path: 'dist/esm/pasteAccount.js',
    limit: '1.1 KB',
  },
  {
    name: 'dist/esm/pwnedPassword.js',
    path: 'dist/esm/pwnedPassword.js',
    limit: '4.1 KB',
  },
  {
    name: 'dist/esm/pwnedPasswordRange.js',
    path: 'dist/esm/pwnedPasswordRange.js',
    limit: '1 KB',
  },
  {
    name: 'dist/esm/search.js',
    path: 'dist/esm/search.js',
    limit: '1.7 KB',
  },
];
