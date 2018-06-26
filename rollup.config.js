import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

// Common
const config = {
  input: 'src/hibp.js',
  output: {
    file: 'dist/hibp.js',
    format: 'umd',
    name: 'hibp',
    sourcemap: true,
  },
  plugins: [
    json({
      preferConst: true,
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

// Production
// prettier-ignore
if (process.env.NODE_ENV === 'production') {
  config.output.file = 'dist/hibp.min.js';
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    })
  );
}

export default config;
