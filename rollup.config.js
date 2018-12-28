import glob from 'glob';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const umdName = 'hibp';
const external = id => !/^(\.|\/|[a-z]:\\)/i.test(id);
const babelOpts = { exclude: 'node_modules/**' };
const nodeResolveOpts = { browser: true, jsnext: true };
const terserOpts = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
  },
};

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
    external,
    plugins: [json({ preferConst: true }), babel(babelOpts)],
  },

  // ESM
  {
    input: glob.sync('src/**/*.js', {
      ignore: ['**/__mocks__/**', '**/__tests__/**', '**/*.test.js'],
    }),
    output: {
      dir: 'es',
      format: 'esm',
      sourcemap: true,
      indent: false,
    },
    external,
    plugins: [json({ preferConst: true }), babel(babelOpts)],
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
      nodeResolve(nodeResolveOpts),
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
      nodeResolve(nodeResolveOpts),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(terserOpts),
    ],
  },

  // UMD (development)
  {
    input: 'src/hibp.js',
    output: {
      file: 'dist/hibp.js',
      format: 'umd',
      name: umdName,
      sourcemap: true,
    },
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      nodeResolve(nodeResolveOpts),
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
      name: umdName,
      sourcemap: true,
      indent: false,
    },
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      nodeResolve(nodeResolveOpts),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(terserOpts),
    ],
  },
];
