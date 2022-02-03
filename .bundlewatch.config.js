module.exports = {
  files: [
    // Pre-bundled for Browser (UMD)
    {
      path: 'dist/browser/hibp.umd.js',
      maxSize: '6.1 kB',
    },
    // Pre-bundled for Browser (ESM)
    {
      path: 'dist/browser/hibp.module.js',
      maxSize: '4.7 kB',
    },
    // Bundled with Webpack (CJS)
    {
      path: 'dist/cjs/breach.js',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/cjs/breachedAccount.js',
      maxSize: '1.6 kB',
    },
    {
      path: 'dist/cjs/breaches.js',
      maxSize: '1.6 kB',
    },
    {
      path: 'dist/cjs/dataClasses.js',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/cjs/pasteAccount.js',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/cjs/pwnedPassword.js',
      maxSize: '4.6 kB',
    },
    {
      path: 'dist/cjs/pwnedPasswordRange.js',
      maxSize: '1.3 kB',
    },
    {
      path: 'dist/cjs/search.js',
      maxSize: '1.8 kB',
    },
    // Bundled with Webpack (ESM)
    {
      path: 'dist/esm/breach.mjs',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/esm/breachedAccount.mjs',
      maxSize: '1.6 kB',
    },
    {
      path: 'dist/esm/breaches.mjs',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/esm/dataClasses.mjs',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/esm/pasteAccount.mjs',
      maxSize: '1.5 kB',
    },
    {
      path: 'dist/esm/pwnedPassword.mjs',
      maxSize: '4.3 kB',
    },
    {
      path: 'dist/esm/pwnedPasswordRange.mjs',
      maxSize: '1.2 kB',
    },
    {
      path: 'dist/esm/search.mjs',
      maxSize: '1.7 kB',
    },
  ],
};
