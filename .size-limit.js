module.exports = [
  {
    name: 'Pre-bundled for Browser (UMD)',
    path: 'dist/browser/hibp.umd.min.js',
    limit: '5.5 KB',
  },
  {
    name: 'Pre-bundled for Browser (ESM)',
    path: 'dist/browser/hibp.esm.min.js',
    limit: '5 KB',
  },
  {
    name: 'Bundled with Webpack (CJS)',
    path: 'dist/cjs/*.js',
    limit: '6 KB',
  },
  {
    name: 'Bundled with Webpack (ESM)',
    path: 'dist/esm/*.js',
    limit: '6 KB',
  },
];
