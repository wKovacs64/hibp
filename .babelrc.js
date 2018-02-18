const test = process.env.NODE_ENV === 'test';
const cjs = process.env.BABEL_ENV === 'commonjs' || test;
const loose = true;

module.exports = {
  plugins: [cjs && '@babel/transform-modules-commonjs'].filter(Boolean),
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules: false,
        targets: test
          ? { node: 'current' }
          : {
              browsers: ['> 1%', 'last 2 versions'],
              node: 4,
            },
      },
    ],
  ],
};
