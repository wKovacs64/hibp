const test = process.env.NODE_ENV === 'test';

module.exports = {
  plugins: [test && '@babel/plugin-transform-modules-commonjs'].filter(Boolean),
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
          node: 6,
        },
      },
    ],
  ],
};
