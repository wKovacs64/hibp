import glob from 'glob';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const inputs = glob.sync('src/**/*.ts', {
  ignore: [
    '**/__mocks__/**',
    '**/__tests__/**',
    '**/mocks/**',
    '**/*.test.ts',
    '**/*.d.ts',
  ],
});
const umdName = 'hibp';
const external = (id) => !/^(\.|\/|[a-z]:\\)/i.test(id);
const babelOpts = {
  exclude: 'node_modules/**',
  extensions: ['.js', '.ts'],
  babelHelpers: 'bundled',
};
const typescriptOpts = {
  exclude: ['**/*.d.ts'],
  declaration: false,
};
const nodeResolveOpts = {
  browser: true,
};
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
    input: inputs,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      indent: false,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    external,
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      typescript(typescriptOpts),
    ],
  },

  // ESM for Bundlers
  {
    input: inputs,
    output: {
      dir: 'dist/esm',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      indent: false,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    external,
    plugins: [
      json({ preferConst: true }),
      babel(babelOpts),
      typescript(typescriptOpts),
    ],
  },

  // ESM for Browsers
  {
    input: 'src/hibp.ts',
    output: {
      file: 'dist/browser/hibp.module.js',
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

  // UMD
  {
    input: 'src/hibp.ts',
    output: {
      file: 'dist/browser/hibp.umd.js',
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
