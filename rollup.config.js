import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

// Common
const config = {
  entry: 'src/hibp.js',
  dest: 'dist/hibp.js',
  moduleName: 'hibp',
  format: 'umd',
  sourceMap: true,
  plugins: [
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
if (process.env.NODE_ENV === 'production') {
  config.dest = 'dist/hibp.min.js';
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }, minify) // eslint-disable-line comma-dangle
  );
}

export default config;
