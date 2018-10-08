const test = process.env.NODE_ENV === 'test';

module.exports = {
  plugins: [test && '@babel/plugin-transform-modules-commonjs'].filter(Boolean),
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: test
          ? { node: 'current' }
          : {
              browsers: ['> 1%', 'last 2 versions'],
              node: 6,
            },
      },
    ],
  ],
};
