import glob from 'glob';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/hibp.js',
    output: {
      file: 'lib/hibp.js',
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
      sizeSnapshot({ printInfo: false }),
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
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot({ printInfo: false }),
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
      nodeResolve({ browser: true, jsnext: true }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot({ printInfo: false }),
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
      sizeSnapshot({ printInfo: false }),
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
      sizeSnapshot({ printInfo: false }),
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
