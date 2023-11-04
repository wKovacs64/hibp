module.exports = {
  files: [
    // Pre-bundled for Browser (UMD)
    {
      path: 'dist/browser/hibp.umd.js',
      maxSize: '8.9 kB',
    },
    // Pre-bundled for Browser (ESM)
    {
      path: 'dist/browser/hibp.module.js',
      maxSize: '4.9 kB',
    },
    // Bundled with Webpack (CJS)
    {
      path: 'dist/cjs/breach.js',
      maxSize: '1 kB',
    },
    {
      path: 'dist/cjs/breached-account.js',
      maxSize: '1.2 kB',
    },
    {
      path: 'dist/cjs/breaches.js',
      maxSize: '1 kB',
    },
    {
      path: 'dist/cjs/data-classes.js',
      maxSize: '1 kB',
    },
    {
      path: 'dist/cjs/paste-account.js',
      maxSize: '1.1 kB',
    },
    {
      path: 'dist/cjs/pwned-password.js',
      maxSize: '1.1 kB',
    },
    {
      path: 'dist/cjs/pwned-password-range.js',
      maxSize: '1.3 kB',
    },
    {
      path: 'dist/cjs/search.js',
      maxSize: '1.5 kB',
    },
    // Bundled with Webpack (ESM)
    {
      path: 'dist/esm/breach.mjs',
      maxSize: '1 kB',
    },
    {
      path: 'dist/esm/breached-account.mjs',
      maxSize: '1.1 kB',
    },
    {
      path: 'dist/esm/breaches.mjs',
      maxSize: '1 kB',
    },
    {
      path: 'dist/esm/data-classes.mjs',
      maxSize: '1 kB',
    },
    {
      path: 'dist/esm/paste-account.mjs',
      maxSize: '1 kB',
    },
    {
      path: 'dist/esm/pwned-password.mjs',
      maxSize: '1 kB',
    },
    {
      path: 'dist/esm/pwned-password-range.mjs',
      maxSize: '1.3 kB',
    },
    {
      path: 'dist/esm/search.mjs',
      maxSize: '1.4 kB',
    },
  ],
};
