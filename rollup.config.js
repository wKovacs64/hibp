import glob from 'glob';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // CommonJS
  {
    experimentalCodeSplitting: true,
    input: glob.sync('src/**/*.js', {
      ignore: ['**/__mocks__/**', '**/__tests__/**', '**/*.test.js'],
    }),
    output: {
      dir: 'lib',
      format: 'cjs',
      sourcemap: true,
      indent: false,
    },
    external: [
      'jssha/src/sha1',
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      json({ preferConst: true }),
      babel({ exclude: 'node_modules/**' }),
    ],
  },

  // ESM
  {
    experimentalCodeSplitting: true,
    input: glob.sync('src/**/*.js', {
      ignore: ['**/__mocks__/**', '**/__tests__/**', '**/*.test.js'],
    }),
    output: {
      dir: 'es',
      format: 'esm',
      sourcemap: true,
      indent: false,
    },
    external: [
      'jssha/src/sha1',
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      json({ preferConst: true }),
      babel({ exclude: 'node_modules/**' }),
    ],
  },

  // ESM for Browsers (development)
  {
    input: 'src/hibp.js',
    output: {
      file: 'dist/hibp.mjs',
      format: 'esm',
      sourcemap: true,
      indent: false,
    },
    plugins: [
      json({ preferConst: true }),
      // babel is only necessary due to automated (CI) Cypress testing of the
      // this build type as it uses Electron which doesn't support ESM script
      // tags yet. To work around this limitation, the test transpiles the ESM
      // code directly in the Electron browser, but it is unable to read hibp
      // without this babel plugin here. For more information on how the test is
      // setup, see:
      // https://glebbahmutov.com/blog/testing-es6-module-in-cypress-electron/
      babel({ exclude: 'node_modules/**' }),
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // ESM for Browsers (production)
  {
    input: 'src/hibp.js',
    output: {
      file: 'dist/hibp.min.mjs',
      format: 'esm',
      sourcemap: true,
      indent: false,
    },
    plugins: [
      json({ preferConst: true }),
      // babel is only necessary due to automated (CI) Cypress testing of the
      // this build type as it uses Electron which doesn't support ESM script
      // tags yet. To work around this limitation, the test transpiles the ESM
      // code directly in the Electron browser, but it is unable to read hibp
      // without this babel plugin here. For more information on how the test is
      // setup, see:
      // https://glebbahmutov.com/blog/testing-es6-module-in-cypress-electron/
      babel({ exclude: 'node_modules/**' }),
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },

  // UMD (development)
  {
    input: 'src/hibp.js',
    output: {
      file: 'dist/hibp.js',
      format: 'umd',
      name: 'hibp',
      sourcemap: true,
    },
    plugins: [
      json({ preferConst: true }),
      babel({ exclude: 'node_modules/**' }),
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // UMD (production)
  {
    input: 'src/hibp.js',
    output: {
      file: 'dist/hibp.min.js',
      format: 'umd',
      name: 'hibp',
      sourcemap: true,
      indent: false,
    },
    plugins: [
      json({ preferConst: true }),
      babel({ exclude: 'node_modules/**' }),
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },
];
