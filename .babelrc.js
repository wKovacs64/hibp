const test = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: test ? 'commonjs' : false,
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
          node: 6,
        },
      },
    ],
  ],
};
