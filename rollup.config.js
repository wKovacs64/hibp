import glob from 'glob';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const umdName = 'hibp';
const external = id => !/^(\.|\/|[a-z]:\\)/i.test(id);
const babelOpts = { exclude: 'node_modules/**', extensions: ['.js', '.ts'] };
const typescriptOpts = {
  check: false,
  exclude: ['**/*.d.ts'],
  rollupCommonJSResolveHack: true,
  tsconfigOverride: {
    compilerOptions: {
      noEmit: true,
      declaration: false,
    },
  },
};
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
    input: 'src/hibp.ts',
    output: {
      file: 'lib/hibp.js',
      format: 'cjs',
      sourcemap: true,
      indent: false,
    },
    external,
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      typescript(typescriptOpts),
    ],
  },

  // ESM
  {
    input: glob.sync('src/**/*.ts', {
      ignore: [
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/*.test.ts',
        '**/*.d.ts',
      ],
    }),
    output: {
      dir: 'es',
      format: 'esm',
      sourcemap: true,
      indent: false,
    },
    external,
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      typescript(typescriptOpts),
    ],
  },

  // ESM for Browsers (development)
  {
    input: 'src/hibp.ts',
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
      typescript(typescriptOpts),
    ],
  },

  // ESM for Browsers (production)
  {
    input: 'src/hibp.ts',
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
      typescript(typescriptOpts),
      terser(terserOpts),
    ],
  },

  // UMD (development)
  {
    input: 'src/hibp.ts',
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
      typescript(typescriptOpts),
    ],
  },

  // UMD (production)
  {
    input: 'src/hibp.ts',
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
      typescript(typescriptOpts),
      terser(terserOpts),
    ],
  },
];
