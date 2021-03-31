module.exports = [
  // Pre-bundled for Browser (UMD)
  {
    path: 'dist/browser/hibp.umd.js',
    limit: '5.3 kB',
  },
  // Pre-bundled for Browser (ESM)
  {
    path: 'dist/browser/hibp.module.js',
    limit: '4.6 kB',
  },
  // Bundled with Webpack (CJS)
  {
    path: 'dist/cjs/breach.js',
    limit: '1.3 kB',
  },
  {
    path: 'dist/cjs/breachedAccount.js',
    limit: '1.4 kB',
  },
  {
    path: 'dist/cjs/breaches.js',
    limit: '1.4 kB',
  },
  {
    path: 'dist/cjs/dataClasses.js',
    limit: '1.3 kB',
  },
  {
    path: 'dist/cjs/pasteAccount.js',
    limit: '1.3 kB',
  },
  {
    path: 'dist/cjs/pwnedPassword.js',
    limit: '4.1 kB',
  },
  {
    path: 'dist/cjs/pwnedPasswordRange.js',
    limit: '1 kB',
  },
  {
    path: 'dist/cjs/search.js',
    limit: '1.6 kB',
  },
  // Bundled with Webpack (ESM)
  {
    path: 'dist/esm/breach.mjs',
    limit: '1.1 kB',
  },
  {
    path: 'dist/esm/breachedAccount.mjs',
    limit: '1.1 kB',
  },
  {
    path: 'dist/esm/breaches.mjs',
    limit: '1.1 kB',
  },
  {
    path: 'dist/esm/dataClasses.mjs',
    limit: '1.1 kB',
  },
  {
    path: 'dist/esm/pasteAccount.mjs',
    limit: '1.1 kB',
  },
  {
    path: 'dist/esm/pwnedPassword.mjs',
    limit: '4 kB',
  },
  {
    path: 'dist/esm/pwnedPasswordRange.mjs',
    limit: '1 kB',
  },
  {
    path: 'dist/esm/search.mjs',
    limit: '1.3 kB',
  },
];
