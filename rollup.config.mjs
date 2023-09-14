import { globSync } from 'glob';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

const supportedNodeVersion = '18.0.0';
const inputs = globSync('src/**/*.ts', {
  ignore: [
    '**/__mocks__/**',
    '**/__tests__/**',
    '**/mocks/**',
    '**/*.test.ts',
    '**/*.d.ts',
  ],
});
const external = (id) => !/^(\.|\/|[a-z]:\\)/i.test(id);
const umdName = 'hibp';
const replaceOpts = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  preventAssignment: true,
};
const typescriptOpts = {
  exclude: ['**/*.d.ts', 'playwright/**'],
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
      typescript(typescriptOpts),
      getBabelOutputPlugin({
        plugins: ['babel-plugin-annotate-pure-calls'],
        presets: [['@babel/env', { targets: { node: supportedNodeVersion } }]],
      }),
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
      typescript(typescriptOpts),
      getBabelOutputPlugin({
        plugins: ['babel-plugin-annotate-pure-calls'],
        presets: [['@babel/env', { targets: { node: supportedNodeVersion } }]],
      }),
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
      inlineDynamicImports: true,
    },
    plugins: [
      json({ preferConst: true }),
      nodeResolve(nodeResolveOpts),
      commonjs(),
      replace(replaceOpts),
      typescript(typescriptOpts),
      terser(terserOpts),
    ],
  },

  // UMD
  {
    input: 'src/hibp.ts',
    output: {
      file: 'dist/browser/hibp.umd.js',
      format: 'esm',
      sourcemap: true,
      indent: false,
      inlineDynamicImports: true,
    },
    plugins: [
      json({ preferConst: true }),
      nodeResolve(nodeResolveOpts),
      commonjs(),
      replace(replaceOpts),
      typescript(typescriptOpts),
      getBabelOutputPlugin({
        moduleId: umdName,
        presets: [
          [
            '@babel/env',
            {
              modules: 'umd',
              targets: {
                browsers: ['defaults', 'supports promises'],
              },
            },
          ],
        ],
      }),
      terser(terserOpts),
    ],
  },
];
